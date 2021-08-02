<template>
  <div id="package">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>Package</h1>
      <!-- buttonAdd -->
      <div id="Add">
        <b-button variant="success" size="sm" @click="showModal_add"
          ><b-icon icon="plus-square-fill"></b-icon
        ></b-button>
      </div>

      <b-row>
        <b-col>
          <div id="Table2">
            <b-table
              striped
              hover
              :items="packages"
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
                <b-modal
                  ref="modal-del"
                  hide-footer
                  title="Do you want to delete"
                >
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

                  <b-form-group label="Raftname:">
                    <b-form-select
                      v-model="add.raftId"
                      :options="options"
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group label="Img Package:">
                    <b-form-file
                      ref="file"
                      v-model="add.img"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                      @change="handleFileUpload"
                    ></b-form-file
                  ></b-form-group>

                  <b-form-group label="Value Package:">
                    <b-form-input
                      type="text"
                      v-model="add.value"
                      placeholder="Enter value (INT)"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="Price Package:">
                    <b-form-input
                      type="text"
                      v-model="add.price"
                      placeholder="Enter price (INT)"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="Description Package:">
                    <b-form-input
                      type="text"
                      v-model="add.des"
                      placeholder="Enter description"
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
                  <!-- txt edit name -->
                  <b-form-group label="Name Boat:"
                    ><b-form-input
                      v-model="editItem.name"
                      type="text"
                      placeholder="Enter name"
                    ></b-form-input
                  ></b-form-group>
                  <!-- txt edit img -->
                  <b-form-group label="Img Boat:">
                    <b-form-file
                      v-model="editItem.img"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                    ></b-form-file
                  ></b-form-group>
                  <!-- txt edit type-->
                  <b-form-group label="type Boat:">
                    <b-form-input
                      type="text"
                      v-model="editItem.type"
                      placeholder="Enter type"
                    >
                    </b-form-input>
                  </b-form-group>
                  <!-- txt edit value-->
                  <b-form-group label="Value Boat:">
                    <b-form-input
                      type="text"
                      v-model="editItem.value"
                      placeholder="Enter value (INT)"
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
          <!-- กำหนดจำนวนการแสดง -->
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
  name: 'Package',
  props: ['items'],
  data() {
    return {
      rafts: [],
      deleteItem: null,
      packages: [],
      add: {
        raftId: null,
        img: null,
        value: '',
        price: '',
        des: '',
      },
      editItem: {
        id: '',
        name: '',
        //img: [],
        type: '',
        value: '',
      },
      apiURL: 'http://promtongyai.xyz:3000/package/',
      apiURL2: 'http://promtongyai.xyz:3000/raft/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'raft.name', label: 'Raft_name' },
        { key: 'img', label: 'Imgage' },
        { key: 'value', label: 'Value' },
        { key: 'price', label: 'Price' },
        { key: 'des', label: 'Description' },
        { key: 'actions', label: 'Action' },
      ],
      options: [],
    }
  },
  computed: {
    row() {
      return this.packages.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.packages = result1.data
    const result2 = await axios.get(this.apiURL2)
    this.rafts = result2.data
    this.option()
  },
  methods: {
    //  fun add

    async postData() {
      this.hideModal_add()
      let formData = new FormData()
      formData.append('file', this.add.img)
      formData.append('raft_id', this.add.raftId)
      formData.append('des', this.add.des)
      formData.append('value', this.add.value)
      formData.append('price', this.add.price)
      const result = await axios.post(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(result)
      const result1 = await axios.get(this.apiURL)
      this.packages = result1.data
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
    async showModal_add() {
      this.$refs['modal-add'].show()
    },
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
    // show popup edit
    showModal_edit(item) {
      const { name, type, value, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      // this.editItem.img.push(img)
      this.editItem.type = type
      this.editItem.value = value
      this.editItem.id = id
    },
    handleFileUpload() {
      this.add.img = this.$refs.file.files[0]
    },
    async option() {
      for (const value of this.rafts) {
        this.options.push({ value: value.id, text: value.name })
      }
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
}
#Table #Add {
  text-align: right;
}
</style>
