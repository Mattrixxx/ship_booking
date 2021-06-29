<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header variant="success"
      ><i class="fas fa-bars"></i
    ></b-button>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
      backdrop
      backdrop-variant="dark"
    >
      <template #footer="{ hide }">
        <div class="d-flex text-light align-items-center px-3 py-2">
          <strong class="mr-auto"></strong>
          <b-button size="lg" @click="hide" variant="link"
            ><i class="fas fa-angle-double-left"></i
          ></b-button>
        </div>
      </template>
      <div class="p-3">
        <div class="d-flex align-items-center flex-column">
          <h4 id="sidebar-no-header-title" class="mt-3 mb-3">Promtongyai</h4>
        </div>
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item href="/users"
              ><i class="fas fa-user"></i> User</b-nav-item
            >
            <b-nav-item href="/drivers"
              ><i class="fas fa-user-tie"></i> Driver</b-nav-item
            >
            <b-nav-item href="/boats"
              ><i class="fas fa-ship"></i> Boat</b-nav-item
            >
            <b-nav-item href="/rafts"
              ><i class="fas fa-bed"></i> Raft</b-nav-item
            >
            <b-nav-item href="/reviews"
              ><i class="fas fa-star"></i>Review</b-nav-item
            >
            <b-nav-item href="/packages"
              ><i class="fas fa-suitcase-rolling"></i>Package</b-nav-item
            >
          </b-nav>
        </nav>
      </div>
    </b-sidebar>

    <router-view />
  </div>
</template>

<script></script>

<style scoped>
.nav-item > .nav-link {
  /* background-color: pink; */
  color: rgb(211, 169, 169);
  font-size: 20px;
  /* border: 1px solid rgb(226, 149, 162); */
}
.nav-item > .nav-link:hover {
  background-color: rgb(196, 196, 196);
  color: white;
}
.btn-link {
  color: rgb(211, 169, 169);
}
.btn-link:hover {
  color: rgb(199, 199, 199);
}
</style>
