<template>
  <div id="boat">
    <div>
      <tabuser />
    </div>
    <div id="Table">
      <h1>ข้อมูลเรือ</h1>
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
              <template #cell(img)="row">
                <img :src="row.value" width="200" />
              </template>
              <template v-slot:cell(actions)="data">
                <b-button
                  variant="warning"
                  size="sm"
                  @click="showModal_edit(data.item)"
                  ><b-icon icon="pencil-square"></b-icon
                ></b-button>
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
                  <p>ชื่อเรือ : {{ delItem.name }}</p>
                  <p>ประเภทเรือ : {{ delItem.type }}</p>
                  <p>จำนวนที่นั่ง : {{ delItem.value }}</p>
                  <div id="btn_delete">
                    <b-button
                      id="btd_delete"
                      variant="danger"
                      size="sm"
                      @click="delConfirm()"
                      >ลบข้อมูล</b-button
                    >
                    <b-button
                      variant="success"
                      size="sm"
                      @click="hideModal_del()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>
                <b-modal ref="modal-add" hide-footer title="เพิ่มข้อมูลเรือ">
                  <div class="d-block text-center"></div>
                  <b-form-group label="ชื่อเรือ :"
                    ><b-form-input
                      v-model="add.name"
                      type="text"
                      placeholder="ชื่อเรือ"
                    ></b-form-input
                  ></b-form-group>
                  <b-form-group label="รูปภาพเรือ :">
                    <b-form-file
                      ref="file"
                      v-model="add.img"
                      placeholder="อัพโหลดรูปภาพเรือ...."
                      @change="handleFileUpload"
                    ></b-form-file
                  ></b-form-group>
                  <b-form-group label="ประเภทเรือ :">
                    <b-form-input
                      type="text"
                      v-model="add.type"
                      placeholder="ประเภทเรือ"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="จำนวนที่นั่ง :">
                    <b-form-input
                      type="text"
                      v-model="add.value"
                      placeholder="จำนวนที่นั่ง"
                    >
                    </b-form-input>
                  </b-form-group>
                  <div id="btn_add">
                    <b-button
                      id="bta_add"
                      variant="success"
                      size="sm"
                      @click="hideModal_add(), showModal_cfadd()"
                      >เพิ่มข้อมูล</b-button
                    ><b-button
                      variant="danger"
                      size="sm"
                      @click="hideModal_add()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>

                <b-modal
                  ref="modal-cfadd"
                  hide-footer
                  title="คุณต้องการเพิ่มข้อมูลต่อไปนี้ใช่หรือไม่"
                  class="modalCfAdd"
                >
                  <p>ชื่อเรือ : {{ add.name }}</p>
                  <p>ประเภทเรือ : {{ add.type }}</p>
                  <p>จำนวนที่นั่ง : {{ add.value }}</p>
                  <div id="btn_add">
                    <b-button
                      id="bta_add"
                      variant="success"
                      size="sm"
                      @click="postData(), hideModal_cfadd()"
                      >เพิ่มข้อมูล</b-button
                    ><b-button
                      variant="danger"
                      size="sm"
                      @click="hideModal_cfadd(), showModal_add()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>

                <b-modal ref="modal-edit" hide-footer title="แก้ไขข้อมูลเรือ">
                  <b-form-group label="ชื่อเรือ :"
                    ><b-form-input
                      v-model="editItem.name"
                      type="text"
                      placeholder="ชื่อเรือ"
                    ></b-form-input
                  ></b-form-group>
                  <b-form-group label="รูปภาพเรือ :">
                    <b-form-file
                      disabled
                      v-model="editItem.img"
                      placeholder="อัพโหลดรูปภาพเรือ..."
                    ></b-form-file
                  ></b-form-group>
                  <b-form-group label="ประเภทเรือ :">
                    <b-form-input
                      type="text"
                      v-model="editItem.type"
                      placeholder="ประเภทเรือ"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="จำนวนที่นั่ง :">
                    <b-form-input
                      type="text"
                      v-model="editItem.value"
                      placeholder="จำนวนที่นั่ง"
                    >
                    </b-form-input>
                  </b-form-group>
                  <div id="btn_add">
                    <b-button
                      id="bta_add"
                      variant="success"
                      size="sm"
                      @click="editData()"
                      >แก้ไข</b-button
                    ><b-button
                      variant="danger"
                      size="sm"
                      @click="hideModal_edit()"
                      >ยกเลิก</b-button
                    >
                  </div>
                </b-modal>
              </template>
            </b-table>
          </div>
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
      delItem: {
        id: '',
        name: '',
        type: '',
        value: '',
      },
      apiURL: 'http://promtongyai.xyz:3000/boat/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'ลำดับ', sortable: true },
        { key: 'name', label: 'ชื่อเรือ' },
        { key: 'img', label: 'รูปภาพ' },
        { key: 'type', label: 'ประเภทเรือ' },
        { key: 'value', label: 'จำนวนที่นั่ง' },
        { key: 'actions', label: 'การดำเนินการ' },
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
      const result1 = await axios.get(this.apiURL)
      this.boats = result1.data.data
    },
    async deleteData(id) {
      const del = await axios.delete(this.apiURL + id)
      console.log(del)
      this.$router.go()
    },
    async editData() {
      console.log(this.editItem)
      const edit = await axios.put(this.apiURL, this.editItem)
      console.log(edit)
      this.$router.go()
    },
    showModal_del(item) {
      this.$refs['modal-del'].show()
      const { name, type, id, value } = item
      this.delItem.name = name
      this.delItem.type = type
      this.delItem.value = value
      this.delItem.id = id
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
    hideModal_add() {
      this.$refs['modal-add'].hide()
    },
    showModal_cfadd() {
      this.$refs['modal-cfadd'].show()
    },
    hideModal_cfadd() {
      this.$refs['modal-cfadd'].hide()
    },
    showModal_edit(item) {
      const { name, type, value, id } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      // this.editItem.img = img
      this.editItem.type = type
      this.editItem.value = value
      this.editItem.id = id
    },
    hideModal_edit() {
      this.$refs['modal-edit'].hide()
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
#Table h1 {
  text-align: center;
}
#Table #Add {
  text-align: right;
}
</style>
