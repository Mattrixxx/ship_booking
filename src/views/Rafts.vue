<template>
  <div class="Raft">
    <input type="text" v-model="search" placeholder="Search" />
    <input type="text" name="name" placeholder="Name" v-model="add.name" />
    <br /><br />
    <input type="text" name="des" placeholder="Des" v-model="add.des" />
    <br /><br />
    <button type="submit" @click="postData">ADD</button>
    <Table2 :items="rafts" :search="search" :fields="fields"></Table2>
  </div>
</template>

<script>
import axios from 'axios'
import Table2 from '../components/Table2.vue'

export default {
  name: 'Raft',
  components: {
    Table2,
  },
  data() {
    return {
      search: '',
      rafts: [],
      add: {
        name: [],
        des: [],
      },
      delete: {
        id: [],
      },
      apiURL: 'http://192.168.1.104:3000/raft',
      fields: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Name' },
        { key: 'img', label: 'Photo' },
        { key: 'des', label: 'Description' },
        { key: 'actions', label: 'Action' },
      ],
    }
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.rafts = result1.data.data
  },
  methods: {
    async postData() {
      // const result = await axios.post(this.apiURL, this.add)
      // console.log(result)
      // this.$router.go()
      console.log(this.add)
    },
  },
}
</script>

<style></style>
