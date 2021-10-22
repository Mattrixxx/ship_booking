<template>
  <div>
    <web />
    <b-container>
      <h2>ข้อมูลแพ</h2>
      <div v-for="raft in rafts" :key="raft.id" class="rafts">
        <b-row>
          <b-col cols="6"><img class="raftImg" :src="raft.img" /> </b-col>
          <b-col cols="6" class="nameDes"
            ><h3>{{ raft.name }}</h3>
            <p>{{ raft.des }}</p></b-col
          >
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import web from '../../components/web.vue'
import axios from 'axios'
export default {
  components: { web },
  name: 'WebRaft',
  data() {
    return {
      rafts: [],
      apiURL: 'http://promtongyai.xyz:3000/raft/',
    }
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.rafts = result1.data.data
  },
}
</script>

<style scoped>
.raftImg {
  width: 350px;
}
.rafts {
  margin-bottom: 40px;
  margin-top: 40px;
}
.nameDes {
  padding: 70px 0;
}
h2 {
  text-align: center;
  margin-top: 40px;
}
</style>
