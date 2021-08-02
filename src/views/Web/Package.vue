<template>
  <div>
    <web />
    <b-container>
      <div id="nav">
        <router-link to="">ไป - กลับ </router-link> |
        <router-link to="">2 วัน 1 คืน </router-link> |
        <router-link to="">3 วัน 2 คืน </router-link>
      </div>
    </b-container>
  </div>
</template>

<script>
import web from '../../components/web.vue'
import axios from 'axios'
export default {
  components: { web },
  name: 'WebPackages',
  data() {
    return {
      packages: [],
      apiURL: 'http://promtongyai.xyz:3000/package/',
    }
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.packages = result1.data
    console.log(this.packages)
  },
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
}
#nav {
  padding: 30px;
  text-align: center;
}
#nav a {
  font-weight: bolder;
  color: #da8189;
}
</style>
