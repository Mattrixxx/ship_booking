<template>
  <div id="Table">
    <h1>Review</h1>

    <div id="Table2">
      <b-table
        striped
        hover
        :items="reviews"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
      >
        <template v-slot:cell(actions)="data">
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
        </template>
      </b-table>
    </div>
    <b-row>
      <b-col>
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
  name: 'Review',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      reviews: [],
      apiURL: 'http://promtongyai.xyz:3000/review/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'detail', label: 'Detail' },
        { key: 'rank', label: 'Rank' },
        { key: 'user.username', label: 'Username' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },
  computed: {
    row() {
      return this.reviews.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.reviews = result1.data
  },
  methods: {
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
