<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/list" class="nav-link">
            <a class="nav-link active" aria-current="page" href="#">List</a>
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
export default {
  name: "NavbarForm"
}
</script>