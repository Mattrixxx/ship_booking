<template>
  <div id="Table">
    <h1>User</h1>
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
        <div id="Table2">
          <b-table
            striped
            hover
            :items="users"
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
              <b-modal
                ref="modal-del"
                hide-footer
                title="Do you want to delete"
              >
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
                <b-form-group label="Name:"
                  ><b-form-input
                    v-model="add.name"
                    type="text"
                    placeholder="Enter name"
                  ></b-form-input
                ></b-form-group>
                <b-form-group label="Surname:">
                  <b-form-input
                    v-model="add.sname"
                    type="text"
                    placeholder="Enter surname"
                  ></b-form-input
                ></b-form-group>
                <b-form-group label="Phone number:">
                  <b-form-input
                    type="text"
                    v-model="add.phone"
                    placeholder="Enter phone number"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group label="Username:">
                  <b-form-input
                    type="text"
                    v-model="add.username"
                    placeholder="Enter username"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group label="Password:">
                  <b-form-input
                    type="password"
                    v-model="add.password"
                    placeholder="Enter password"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group label="Confirm password:">
                  <b-form-input
                    type="password"
                    v-model="cf_password"
                    placeholder="Enter confirm-password"
                  >
                  </b-form-input>
                </b-form-group>
                <b-button variant="success" size="sm" @click="confirmPassword"
                  >ADD</b-button
                >
              </b-modal>
              <b-modal ref="modal-edit" hide-footer title="EDIT">
                <b-form-group label="Name:"
                  ><b-form-input
                    v-model="editItem.name"
                    type="text"
                    placeholder="Enter name"
                  ></b-form-input
                ></b-form-group>
                <b-form-group label="Surname:">
                  <b-form-input
                    v-model="editItem.sname"
                    type="text"
                    placeholder="Enter surname"
                  ></b-form-input
                ></b-form-group>
                <b-form-group label="Phone number:">
                  <b-form-input
                    type="text"
                    v-model="editItem.phone"
                    placeholder="Enter phone number"
                  >
                  </b-form-input>
                </b-form-group>
                <b-button variant="success" size="sm" @click="editData"
                  >Edit</b-button
                >
              </b-modal>
            </template>
          </b-table>
        </div>

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
  name: 'User',
  props: ['items'],
  data() {
    return {
      cf_password: '',
      deleteItem: null,
      users: [],
      add: {
        name: '',
        sname: '',
        phone: '',
        username: '',
        password: '',
      },
      editItem: {
        id: '',
        name: '',
        sname: '',
        phone: '',
      },
      apiURL: 'https://infinite-gorge-44548.herokuapp.com/user/',
      filter: '',
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Name' },
        { key: 'sname', label: 'Surname' },
        { key: 'phone', label: 'Phone' },
        { key: 'username', label: 'Username' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },
  computed: {
    row() {
      return this.users.length
    },
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.users = result1.data.data
  },
  methods: {
    async postData() {
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
      const { name, sname, id, phone } = item
      this.$refs['modal-edit'].show()
      this.editItem.name = name
      this.editItem.sname = sname
      this.editItem.phone = phone
      this.editItem.id = id
    },
    confirmPassword() {
      if (this.cf_password == this.add.password) {
        this.postData()
      } else {
        alert('Error')
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
</style>
