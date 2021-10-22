<template>
  <div>
    <web />
    <h2>การจอง</h2>
    <div class="container">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="ชื่อผู้ใช้ระบบ"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
          style="margin-left: 50px"
        >
          <b-form-group
            label="แพ็จเกจที่จอง :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select></b-form-select>
          </b-form-group>

          <b-form-group
            label="ราคาต่อท่าน :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input disabled></b-form-input>
          </b-form-group>

          <b-form-group
            label="จำนวนที่นั่งที่จอง :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-spinbutton
              id="sb-inline"
              min="1"
              max="25"
              inline
              placeholder="-"
            ></b-form-spinbutton>
          </b-form-group>

          <b-form-group
            label="วันที่ออกเรือ :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-datepicker
              id="example-datepicker"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>

          <b-form-group
            label="วันที่กลับ :"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-datepicker
              id="example-datepicker"
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>
        </b-form-group>
      </b-card>
      <h6>ยอดราคารวม........บาท</h6>
      <b-button id="btn-slip" @click="showmodal"
        >อัพโหลดหลักฐานการชำระเงิน</b-button
      >
    </div>
    <b-modal ref="modalupload" hide-footer title="อัพโหลดหลักฐานการชำระเงิน"
      ><b-form-file v-model="slip" placeholder="อัพโหลดไฟล์"></b-form-file
      ><b-button id="btn-upload">อัพโหลดหลักฐาน</b-button></b-modal
    >
  </div>
</template>

<script>
import web from '../../components/web.vue'
import axios from 'axios'
export default {
  components: { web },
  name: 'WebBooking',
  data() {
    return {
      packages: [],
      apiURL: 'http://promtongyai.xyz:3000/booking/',
    }
  },
  async mounted() {
    const result1 = await axios.get(this.apiURL)
    this.bookings = result1.data
    console.log(this.bookings)
  },
  methods: {
    showmodal() {
      this.$refs['modalupload'].show()
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
}
.card {
  margin: 0 auto;
  float: none;
  margin-top: 50px;
}
h2 {
  text-align: center;
  margin-top: 40px;
}

#btn-slip {
  float: right;
  margin-top: 20px;
}
h6 {
  text-align: right;
  margin-top: 60px;
}
#btn-upload {
  margin-top: 20px;
  float: right;
}
</style>
