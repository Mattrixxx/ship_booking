<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <h1>Register</h1>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto"> </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <div id="register">
        <h2>Register From</h2>
      </div>
      <b-card>
        <b-form>
          <b-form-group label="Name:"
            ><b-form-input
              v-model="add.name"
              type="text"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Surname:"
            ><b-form-input
              v-model="add.sname"
              type="text"
              placeholder="Enter surname"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Phone number:"
            ><b-form-input
              v-model="add.phone"
              type="text"
              placeholder="Enter phone number"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Username:"
            ><b-form-input
              v-model="add.username"
              type="text"
              placeholder="Enter username"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Password:"
            ><b-form-input
              v-model="add.password"
              type="password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Confirm password:"
            ><b-form-input
              v-model="cf_password"
              type="password"
              placeholder="Enter confirm password"
              required
            ></b-form-input>
          </b-form-group>
          <b-button variant="primary" @click="confirmPassword">Submit</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data() {
    return {
      cf_password: '',
      apiURL: 'http://promtongyai.xyz:3000/user/',
      add: {
        name: '',
        sname: '',
        phone: '',
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async postData() {
      const result = await axios.post(this.apiURL, this.add)
      console.log(result)
      alert('Success')
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

<style scoped>
.navbar {
  padding: 0px;
}
.navbar-collapse {
  padding-right: 2.5%;
}
.bg-info {
  background-color: #da8189 !important;
}
h1 {
  margin-left: 40px;
}
#register {
  text-align: center;
}
.card {
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
}
button {
  float: right;
}
h2 {
  margin-top: 40px;
}
</style>
