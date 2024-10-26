<template>
  <div class="container mt-5">
    <h2 class="mb-2">Create Opportunity</h2>
    <form @submit.prevent="submitOpportunity">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" v-model="item.title" class="form-control" id="title" required/>
      </div>
      <div class="mb-3">
        <label for="related_customer" class="form-label">Related Customer</label>
        <input type="text" v-model="item.related_customer" class="form-control" id="related_customer" required/>
      </div>
      <div class="mb-3">
        <label for="cost" class="form-label">Cost</label>
        <input type="number" v-model="item.cost" class="form-control" id="cost" required/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      item: {
        title: null,
        related_customer: null,
        cost: null,
      },
    };
  },
  methods: {
    async submitOpportunity() {
          await axios.post(
              `http://localhost:8000/api/opportunity/create`,
              this.item,
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
              }
          );
          alert('Opportunity created successfully!');
      }
    },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
