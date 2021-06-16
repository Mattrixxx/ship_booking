<template>
  <div>
    <b-row>
      <b-col md="3">
        <b-form-input
          v-model="filter"
          type="search"
          placeholder="Search..."
        ></b-form-input>
      </b-col>
      <b-button variant="success" size="sm" @click="showModal_add"
        ><b-icon icon="plus-square-fill"></b-icon
      ></b-button>
    </b-row>

    <b-row>
      <b-col>
        <b-table
          striped
          hover
          :items="rafts"
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
        >
          <template v-slot:cell(actions)="data"
            ><b-button
              variant="warning"
              size="sm"
              @click="showModal_edit(data.item)"
              ><b-icon icon="pencil-square"></b-icon
            ></b-button>
            <b-button
              variant="danger"
              size="sm"
              @click="showModal_del(data.item.id)"
              ><b-icon icon="trash-fill"></b-icon
            ></b-button>
            <b-modal ref="modal-del" hide-footer title="Do you want to delete">
              <b-button
                class="mt-3"
                block
                variant="outline-success"
                @click="hideModal_del"
                >Cancel</b-button
              >
              <b-button
                class="mt-2"
                block
                variant="outline-danger"
                @click="delConfirm"
                >Delete</b-button
              >
            </b-modal>
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
                  v-model="add.img"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
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
              <b-button variant="success" size="sm" @click="postData"
                >ADD</b-button
              >
            </b-modal>
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
              <b-button variant="success" size="sm" @click="editData"
                >Edit</b-button
              >
            </b-modal>
          </template>
        </b-table>
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
  name: 'Home',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      rafts: [],
      add: {
        name: '',
        des: '',
        img: [],
      },
      editItem: {
        id: '',
        name: '',
        des: '',
        // img: '',
      },
      apiURL: 'http://192.168.1.104:3000/raft/',
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
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.rafts = result1.data.data
  },
  methods: {
    async postData() {
      this.add.img = this.add.img.name
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      this.$router.go()
    },
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    async editData() {
      const edit = await axios.put(this.apiURL, this.editItem)
      console.log(edit)
      this.$router.go()
    },
    showModal_del(id) {
      this.$refs['modal-del'].show()
      this.deleteItem = id
    },
    delConfirm() {
      this.deleteData(this.deleteItem)
    },
    hideModal_del() {
      this.$refs['modal-del'].hide()
    },
    showModal_add() {
      this.$refs['modal-add'].show()
    },
    showModal_edit(item) {
      const { name, des, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      // this.editItem.img.push(img)
      this.editItem.des = des
      this.editItem.id = id
    },
  },
}
</script>
