<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link v-if="isLoggedIn" to="/list" class="nav-link">
         List
          </router-link>
          <router-link to="/register" class="nav-link"> Sing Up
          </router-link>
          <router-link to="/login" class="nav-link">
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "NavbarForm",
    computed: {
        ...mapState(['isLoggedIn'])
    }
}
</script>