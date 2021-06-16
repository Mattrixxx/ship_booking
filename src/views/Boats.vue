<template>
  <div class="Boat">
    <input type="text" v-model="search" />
    <Table2 :items="boats" :search="search" />
  </div>
</template>

<script>
import axios from 'axios'
import Table2 from '../components/Table2.vue'
export default {
  name: 'Boat',
  components: {
    Table2,
  },
  data() {
    return {
      search: '',
      boats: [],
      apiURL: 'http://localhost:3000',
    }
  },
  async mounted() {
    const result1 = await axios.get(`${this.apiURL}/boat`)
    this.boats = result1.data
  },
}
</script>

<style></style>
