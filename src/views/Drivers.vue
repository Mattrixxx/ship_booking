<template>
  <div id="Table">
    <h1>Driver</h1>

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
        :items="drivers"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
      >
        <template v-slot:cell(actions)="data">
          <!-- buttonEdit -->
          <b-button
            variant="warning"
            size="sm"
            @click="showModal_edit(data.item)"
            ><b-icon icon="pencil-square"></b-icon
          ></b-button>
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
          <!-- textEdit -->
          <b-modal ref="modal-edit" hide-footer title="EDIT">
            <!-- txt name -->
            <b-form-group label="Name Driver:"
              ><b-form-input
                v-model="editItem.name"
                type="text"
                placeholder="Enter name"
              ></b-form-input
            ></b-form-group>
            <!-- txt sname -->
            <b-form-group label="Surname Driver:">
              <b-form-input
                v-model="editItem.sname"
                type="text"
                placeholder="Enter Surname"
              ></b-form-input
            ></b-form-group>
            <!-- txt phone -->
            <b-form-group label="Phone Driver:">
              <b-form-input
                type="text"
                v-model="editItem.phone"
                placeholder="Enter phone"
              ></b-form-input>
            </b-form-group>
            <!-- btnEdit -->
            <b-button variant="success" size="sm" @click="editData"
              >Edit</b-button
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'Driver',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      drivers: [],
      add: {
        name: '',
        sname: '',
        phone: '',
      },
      editItem: {
        id: '',
        name: '',
        sname: '',
        phone: '',
      },
      apiURL: 'http://promtongyai.xyz:3000/driver/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Name' },
        { key: 'sname', label: 'Sname' },
        { key: 'phone', label: 'Phone' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },
  computed: {
    row() {
      return this.drivers.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.drivers = result1.data.data
  },
  methods: {
    //  fun add
    async postData() {
      this.hideModal_add()
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.drivers = result1.data.data
    },
    //  fun delete
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    //  fun edit
    async editData() {
      const edit = await axios.put(this.apiURL, this.editItem)
      console.log(edit)
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
    // show popup edit
    showModal_edit(item) {
      const { name, sname, phone, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      this.editItem.sname = sname
      this.editItem.phone = phone
      this.editItem.id = id
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
