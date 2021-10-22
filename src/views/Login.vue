<template>
  <div>
    <div class="bg"></div>
    <b-container>
      <b-card>
        <h4>เข้าสู่ระบบ</h4>
        <b-form>
          <b-form-group label="ชื่อผู้ใช้ :"
            ><b-form-input
              v-model="add.username"
              type="text"
              placeholder="ชื่อผู้ใช้"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="รหัสผ่าน :"
            ><b-form-input
              v-model="add.password"
              type="password"
              placeholder="รหัสผ่าน"
              required
            ></b-form-input>
          </b-form-group>
          <b-row>
            <b-col>
              <div class="reg">
                <b-nav-item href="/register">สมัครสมาชิก</b-nav-item>
              </div>
            </b-col>
            <b-col>
              <b-button variant="primary">เข้าสู่ระบบ</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Register from './Register.vue'
export default {
  components: { Register },
  name: 'login',
  data() {
    return {
      add: {
        username: '',
        password: '',
      },
    }
  },
}
</script>

<style scoped>
.bg {
  background-image: url(.././img/BG.png);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  filter: blur(4px);
}
h4 {
  text-align: center;
}
.card {
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 3%;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
button {
  float: right;
}
li a.nav-link {
  color: rgb(255, 255, 255);
}
li a.nav-link:hover {
  text-decoration: underline;
}
.reg {
  list-style: none;
  margin-top: 5px;
}
.nav-link {
  padding: 0;
}
.btn-primary {
  color: rgb(0, 0, 0);
  background: #b7dbc3;
  border-color: #b7dbc3;
}

.btn-primary:not(:disabled):not(.disabled):active {
  color: #fff;
  border-color: #38443c;
  background-color: #38443c;
}

.btn-primary:hover {
  color: #fff;
  border-color: #38443c;
  background-color: #38443c;
}
</style>
