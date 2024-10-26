<template>
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Opportunity</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateOpportunity">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" v-model="editedItem.title" class="form-control" id="title">
            </div>
            <div class="mb-3">
              <label for="related_customer" class="form-label">Related Customer</label>
              <input type="text" v-model="editedItem.related_customer" class="form-control" id="related_customer">
            </div>
            <div class="mb-3">
              <label for="cost" class="form-label">Cost</label>
              <input type="number" v-model="editedItem.cost" class="form-control" id="cost">
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    selectedItem: Object,
  },
  data() {
    return {
      editedItem: {},
    };
  },
  watch: {
    selectedItem: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.editedItem = { ...newVal };
        }
      }
    }
  },
  methods: {
    async updateOpportunity() {
      try {
        await axios.put(`http://localhost:8000/api/opportunity/${this.editedItem.id}/update`, this.editedItem, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.$emit('refresh');
        this.close();
      } catch (error) {
        console.error("Error updating opportunity:", error);
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
