<template>
  <div id="review">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ข้อมูลการรีวิว</h1>

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
              @click="showModal_del(data.item)"
              ><b-icon icon="trash-fill"></b-icon
            ></b-button>
            <b-modal
              ref="modal-del"
              hide-footer
              title="คุณต้องการลบข้อมูลต่อไปนี้หรือไม่"
            >
              <p>ลำดับ : {{ delItem.id }}</p>
              <p>รีวิว : {{ delItem.detail }}</p>
              <p>คะแนน : {{ delItem.rank }}</p>
              <div id="btn_delete">
                <b-button
                  id="btd_delete"
                  variant="danger"
                  size="sm"
                  @click="delConfirm"
                  >ลบข้อมูล</b-button
                >
                <b-button variant="success" size="sm" @click="hideModal_del()"
                  >ยกเลิก</b-button
                >
              </div>
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
            align="right"
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
        { key: 'id', label: 'ลำดับ', sortable: true },
        { key: 'detail', label: 'รีวิว' },
        { key: 'rank', label: 'คะแนน' },
        { key: 'user.username', label: 'ชื่อผู้ใช้งาน' },
        { key: 'actions', label: 'การดำเนินการ' },
      ],
      delItem: {
        id: '',
        detail: '',
        rank: '',
      },
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
    showModal_del(item) {
      this.$refs['modal-del'].show()
      const { id, detail, rank } = item
      this.delItem.name = name
      this.delItem.detail = detail
      this.delItem.rank = rank
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
