<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <sidebar />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import sidebar from '../components/Sidebar.vue'

export default {
  components: { sidebar },
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
</style>
