<template>
  <div id="booking">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>Booking</h1>

      <div id="Add">
        <!-- buttonAdd -->
        <b-button variant="success" size="sm" @click="showModal_add"
          ><b-icon icon="plus-square-fill"></b-icon
        ></b-button>
      </div>

      <div id="Table2">
        <b-table
          striped
          hover
          :items="bookings"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template v-slot:cell(actions)="data">
            <!-- buttonDelete -->
            <b-button
              variant="danger"
              size="sm"
              @click="showModal_del(data.item.id)"
              ><b-icon icon="trash-fill"></b-icon
            ></b-button>
            <b-modal ref="modal-del" hide-footer title="Do you want to delete">
              <!-- btnDel-Cancel -->
              <b-button
                class="mt-3"
                block
                variant="outline-success"
                @click="hideModal_del"
                >Cancel</b-button
              >
              <!-- btnDel-Del -->
              <b-button
                class="mt-2"
                block
                variant="outline-danger"
                @click="delConfirm"
                >Delete</b-button
              >
            </b-modal>
            <!-- textAdd -->
            <b-modal ref="modal-add" hide-footer title="ADD">
              <div class="d-block text-center"></div>
              <!-- txt name -->
              <b-form-group label="Name Driver:"
                ><b-form-input
                  v-model="add.name"
                  type="text"
                  placeholder="Enter name"
                ></b-form-input
              ></b-form-group>
              <!-- txt sname -->
              <b-form-group label="Surname Driver:">
                <b-form-input
                  v-model="add.sname"
                  type="text"
                  placeholder="Enter surname"
                ></b-form-input
              ></b-form-group>
              <!-- txt phone -->
              <b-form-group label="Phone Driver:">
                <b-form-input
                  type="text"
                  v-model="add.phone"
                  placeholder="Enter Phone"
                >
                </b-form-input>
              </b-form-group>
              <!-- btnAdd -->
              <b-button variant="success" size="sm" @click="postData"
                >ADD</b-button
              >
            </b-modal>
          </template>
        </b-table>
      </div>
      <b-row>
        <b-col>
          <!-- กำหนดจำนวนการแสดง -->
          <b-pagination
            v-model="currentPage"
            :total-rows="row"
            :per-page="perPage"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tabuser from '../components/TabUser.vue'
export default {
  components: { tabuser },
  name: 'Booking',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      bookings: [],
      add: {
        name: '',
        sname: '',
        phone: '',
      },
      apiURL: 'http://promtongyai.xyz:3000/booking/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'user.username', label: 'Username' },
        { key: 'user.phone', label: 'Phone' },
        { key: 'value', label: 'Value' },
        { key: 'price', label: 'Price' },
        { key: 'booking_date', label: 'Booing' },
        { key: 'travel_date', label: 'Travel' },
        { key: 'payment', label: 'Payment' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },
  computed: {
    row() {
      return this.bookings.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.bookings = result1.data
  },
  methods: {
    //  fun add
    async postData() {
      this.hideModal_add()
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.bookings = result1.data.data
    },
    //  fun delete
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    // show popup delete
    showModal_del(id) {
      this.$refs['modal-del'].show()
      this.deleteItem = id
    },
    // delete confirm
    delConfirm() {
      this.deleteData(this.deleteItem)
      // close popup
    },
    hideModal_del() {
      this.$refs['modal-del'].hide()
    },
    // show popup add
    showModal_add() {
      this.$refs['modal-add'].show()
    },
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
  },
}
</script>
<style>
#Table {
  margin-top: 30px;
  margin-right: 50px;
  margin-left: 50px;
}
#Table2 {
  margin-top: 30px;
  text-align: center;
}
/* #search-add{
  float: right;
} */
#Table h1 {
  text-align: center;
  color: rgb(84, 105, 124);
}
</style>
