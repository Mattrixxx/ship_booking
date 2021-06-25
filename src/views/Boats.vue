<template>
  <div id="Table">
    <h1>Boat</h1>
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
            :items="boats"
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
                <!-- txt name -->
                <b-form-group label="Name Boat:"
                  ><b-form-input
                    v-model="add.name"
                    type="text"
                    placeholder="Enter name"
                  ></b-form-input
                ></b-form-group>
                <!-- txt img -->
                <b-form-group label="Img Boat:">
                  <b-form-file
                    ref="file"
                    v-model="add.img"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    @change="handleFileUpload"
                  ></b-form-file
                ></b-form-group>
                <!-- txt  type-->
                <b-form-group label="type Boat:">
                  <b-form-input
                    type="text"
                    v-model="add.type"
                    placeholder="Enter type"
                  >
                  </b-form-input>
                </b-form-group>
                <!-- txt value-->
                <b-form-group label="Value Boat:">
                  <b-form-input
                    type="text"
                    v-model="add.value"
                    placeholder="Enter value (INT)"
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
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Boat',
  props: ['items'],
  data() {
    return {
      deleteItem: null,
      boats: [],
      add: {
        name: '',
        img: null,
        type: '',
        value: '',
      },
      editItem: {
        id: '',
        name: '',
        //img: [],
        type: '',
        value: '',
      },
      apiURL: 'https://infinite-gorge-44548.herokuapp.com/boat/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Name' },
        { key: 'img', label: 'Photo' },
        { key: 'type', label: 'Type' },
        { key: 'value', label: 'Value' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },
  computed: {
    row() {
      return this.boats.length
    },
  },
  //  fun show
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.boats = result1.data.data
  },
  methods: {
    //  fun add

    async postData() {
      this.hideModal_add()
      let formData = new FormData()
      formData.append('file', this.add.img)
      formData.append('name', this.add.name)
      formData.append('type', this.add.type)
      formData.append('value', this.add.value)
      const result = await axios.post(this.apiURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(result)
      this.makeToast('success')
      const result1 = await axios.get(this.apiURL)
      this.boats = result1.data.data
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
    makeToast(variant = null) {
      this.$bvToast.toast('Add Success', {
        title: `Succsee `,
        variant: variant,
        solid: true,
      })
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
