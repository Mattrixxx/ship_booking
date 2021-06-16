<template>
  <div class="Driver">
    <Table2 :items="drivers" />
  </div>
</template>

<script>
import axios from 'axios'
import Table2 from '../components/Table2.vue'
export default {
  name: 'Driver',
  components: {
    Table2,
  },
  data() {
    return {
      drivers: [],
      apiURL: 'http://localhost:3000',
    }
  },
  async mounted() {
    const result1 = await axios.get(`${this.apiURL}/driver`)
    this.drivers = result1.data
  },
}
</script>

<style></style>
