<template>
  <div class="login">
    <div class="card" style="max-width: 400px; margin: auto; padding: 20px;">
      <h2 class="card-title text-center">Login</h2>
      <form @submit.prevent="submit">
        <div class="mb-3 form-group">
          <label for="email" class="form-label text-start">Email</label>
          <input type="email" v-model="email" class="form-control custom-input" required/>
        </div>
        <div class="mb-3 form-group">
          <label for="password" class="form-label text-start">Password</label>
          <input type="password" v-model="password" class="form-control custom-input" required/>
        </div>
        <div class="mb-3 text-center">
          <button class="btn btn-primary btn-sm" type="submit">Login</button>
        </div>
      </form>
      <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginForm",
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null
    }
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        localStorage.setItem('token', response.data.token);
        this.$router.push('/list');
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'ایمیل یا گذرواژه نادرست است.';
      }
    },
  }
};
</script>

<style scoped>
.custom-input {
  border: 1px solid #007bff;
  background-color: #e7f1ff;
  transition: border-color 0.3s;
}

.custom-input:focus {
  border-color: #0056b3;
  outline: none;
}
</style>
