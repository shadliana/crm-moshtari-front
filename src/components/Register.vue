<template>
  <div class="signUp">
    <div class="card" style="max-width: 400px; margin: auto; padding: 20px;">
      <h2 class="card-title text-center">Sign Up</h2>
      <form @submit.prevent="submit">
        <div class="mb-3 form-group">
          <label for="name" class="form-label text-start">Name</label>
          <input type="text" v-model="name" class="form-control custom-input" required/>
        </div>
        <div class="mb-3 form-group">
          <label for="email" class="form-label text-start">Email</label>
          <input type="email" v-model="email" class="form-control custom-input" required/>
        </div>
        <div class="mb-3 form-group">
          <label for="password" class="form-label text-start">Password</label>
          <input type="password" v-model="password" class="form-control custom-input" required/>
        </div>
        <div class="mb-3 text-center">
          <button class="btn btn-primary btn-sm" type="submit">Sign Up</button>
        </div>
        <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegisterForm",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      errorMessage: null
    }
  },
  methods: {
    async submit() {
      try {
        await axios.post('http://localhost:8000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });

          this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errorMessage = 'این ایمیل قبلاً ثبت‌نام شده است.';
        } else {
          this.errorMessage = 'مشکلی در ثبت‌نام پیش آمد. لطفاً دوباره تلاش کنید.';
        }
        console.error('Registration error:', error);
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
