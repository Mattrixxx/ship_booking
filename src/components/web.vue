<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-collapse id="nav-collapse" is-nav>
        <b-img src="../img/3.png" height="80px"></b-img>
        <b-nav id="navbar-nav">
          <b-nav-item href="/webrafts">ข้อมูลแพ </b-nav-item>
          <b-nav-item href="/webpackages">แพ็คเกจ </b-nav-item>
          <b-nav-item href="#">จองแพ็คเกจ </b-nav-item>
          <b-nav-item href="#">รีวิว </b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">ข้อมูลส่วนตัว</b-dropdown-item>
            <!-- ทำแบบเปลี่ยนเข้าออกระบบได้ -->
            <b-dropdown-item href="#">ออกจากระบบ</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style>
.navbar {
  padding: 0px;
}
.navbar-collapse {
  padding-left: 2.5%;
  padding-right: 2%;
  height: 90px;
}
.bg-info {
  background-color: #da8189 !important;
}
a {
  color: #f3e8ee;
}
.nav {
  margin-left: 45%;
}
.nav-link {
  display: block;
  padding-top: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-left: 2rem;
}
.nav-item :hover {
  color: #8b000c;
}
</style>
