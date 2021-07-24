<template>
  <div id="raft">
    <div>
      <tabuser/>
    </div>
    <div id="Table">
    <h1>Raft</h1>
    <!-- buttonAdd -->
    <div id="Add">
      <b-button variant="success" size="sm" @click="showModal_add"
        ><b-icon icon="plus-square-fill"></b-icon
      ></b-button>
    </div>

    <div id="Table2">
      <b-table
        striped
        hover
        :items="rafts"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
      >
        <!-- Set IMG -->
        <template #cell(img)="row">
          <img :src="row.value" width="200" />
        </template>
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
            <b-form-group label="Name Raft:"
              ><b-form-input
                v-model="add.name"
                type="text"
                placeholder="Enter name"
              ></b-form-input
            ></b-form-group>
            <b-form-group label="Photo Raft:">
              <b-form-file
                ref="file"
                v-model="add.img"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="handleFileUpload"
              ></b-form-file
            ></b-form-group>
            <b-form-group label="Description Raft:">
              <b-form-input
                type="text"
                v-model="add.des"
                placeholder="Enter Description"
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
            <b-form-group label="Name Raft:"
              ><b-form-input
                v-model="editItem.name"
                type="text"
                placeholder="Enter name"
              ></b-form-input
            ></b-form-group>
            <b-form-group label="Photo Raft:">
              <b-form-file
                disabled
                v-model="editItem.img"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file
            ></b-form-group>
            <b-form-group label="Description Raft:">
              <b-form-input
                type="text"
                v-model="editItem.des"
                placeholder="Enter Description"
              >
              </b-form-input>
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
  </div>
</template>

<script>
import axios from 'axios'
import tabuser from '../components/TabUser.vue'
export default {
  components:{tabuser},
  name: 'Raft',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      rafts: [],
      add: {
        name: '',
        des: '',
        img: null,
      },
      editItem: {
        id: '',
        name: '',
        des: '',
        // img: '',
      },
      apiURL: 'http://promtongyai.xyz:3000/raft/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Name' },
        { key: 'img', label: 'Photo' },
        { key: 'des', label: 'Description' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },
  computed: {
    row() {
      return this.rafts.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.rafts = result1.data.data
  },
  methods: {
    //  fun add
    async postData() {
      this.hideModal_add()
      let formData = new FormData()
      formData.append('file', this.add.img)
      formData.append('name', this.add.name)
      formData.append('des', this.add.des)
      const result = await axios.post(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.rafts = result1.data.data
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
      const { name, des, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      // this.editItem.img.push(img)
      this.editItem.des = des
      this.editItem.id = id
    },
    handleFileUpload() {
      this.add.img = this.$refs.file.files[0]
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
