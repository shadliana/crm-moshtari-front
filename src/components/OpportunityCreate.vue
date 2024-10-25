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
      if (!this.validator.valid()) return
      try {
        await axios.post('http://localhost:8000/api/opportunity/create', this.item);
        alert('Opportunity created successfully!');
      } catch (error) {
        console.error('Error creating opportunity:', error);
        alert('There was an error creating the opportunity.');
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
