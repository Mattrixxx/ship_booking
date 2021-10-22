<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <p>ติดต่อบริษัท : 093-601-2604</p>
      <p>E-mail : promtongyai@gmail.com</p>
    </b-navbar>
    <div id="content">
      <b-img src="../../img/3.png" width="150px"></b-img>
      <div id="menu">
        <b-nav-item href="/webrafts">ข้อมูลแพ </b-nav-item>
        <b-nav-item href="/webpackages">แพ็คเกจ </b-nav-item>
        <b-nav-item href="/webbookings">จองแพ็คเกจ </b-nav-item>
        <b-nav-item href="#">รีวิว </b-nav-item>
        <b-nav-item href="/login">เข้าสู่ระบบ </b-nav-item>
      </div>
      <b-row>
        <b-col>
          <div id="dis">
            <h1>การท่องเที่ยว</h1>
            <h1>จะไม่ใช่เรื่องน่าเบื่ออีกต่อไป...</h1>
          </div>
        </b-col>
        <b-col align-self="end">
          <b-row>
            <div id="rp">
              <h3>ไป-กลับ</h3>
              <b-nav-item href="/webpackages"
                >รายละเอียดเพิ่มเติม
                <i class="far fa-arrow-alt-circle-right"></i>
              </b-nav-item></div
          ></b-row>

          <b-row>
            <div id="to">
              <h3>2 วัน 1 คืน</h3>
              <b-nav-item href="/webpackages"
                >รายละเอียดเพิ่มเติม
                <i class="far fa-arrow-alt-circle-right"></i>
              </b-nav-item>
            </div>
          </b-row>

          <b-row>
            <div id="tr">
              <h3>3 วัน 2 คืน</h3>
              <b-nav-item href="/webpackages"
                >รายละเอียดเพิ่มเติม
                <i class="far fa-arrow-alt-circle-right"></i>
              </b-nav-item>
            </div>
          </b-row>
        </b-col>
      </b-row>
      <div id="btn">
        <b-button href="/webbookings"> จองแพ็คเกจ</b-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.navbar {
  padding-left: 67%;
  height: 54px;
}
.bg-info {
  background-color: #38443c !important;
}
#content {
  background-image: url(../../img/BG.png);
}
#content img {
  margin-left: 70px;
}
#content #menu {
  float: right;
  list-style: none;
  margin-right: 40px;
}
#content #menu li {
  float: left;
  margin-right: 20px;
  margin-top: 20px;
}
#content #menu li a:hover {
  background: rgb(43, 77, 60);
  color: white;
  border-radius: 0.5rem;
}
#content #menu li a {
  color: #000;
  padding: 10px;
}
#content button {
  margin-top: 20px;
}
#content #menu #dis h1 {
  text-align: right;
}
p {
  color: #ffff;
  font-size: 14px;
  margin: 0;
  margin-right: 15px;
}
h1 {
  text-align: left;
  margin-left: 70px;
  font-weight: bold;
  color: #38443c;
}
#dis {
  margin-top: 100px;
  background: rgb(196, 196, 196, 0.32);
  width: 700px;
  height: 400px;
  padding-top: 150px;
}
#btn {
  margin-left: 70px;
  padding-bottom: 100px;
  margin-top: 20px;
}
.btn-secondary {
  background-color: #38443c;
  border: none;
  width: 180px;
  font-size: 20px;
}
.btn-secondary:hover {
  background-color: #5b7a65;
}
#content #rp,
#to,
#tr {
  padding-left: 25px;
  padding-right: 100px;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #ffff;
  margin-left: 450px;
  list-style: none;
}
.nav-link {
  padding: 0;
}
#rp li a.nav-link,
#to li a.nav-link,
#tr li a.nav-link {
  color: #ffff;
}
#rp li a.nav-link:hover,
#to li a.nav-link:hover,
#tr li a.nav-link:hover {
  text-decoration: underline;
}
#content #rp {
  background-color: #38433c;
  margin-top: 40px;
  margin-bottom: 40px;
}
#content #to {
  background-color: #596a5e;
  margin-bottom: 40px;
}
#content #tr {
  background-color: #77a486;
}
</style>
