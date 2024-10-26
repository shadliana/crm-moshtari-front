<template>
  <div class="set-role">
    <h2>Change Status</h2>
    <div class="form-group">
      <label for="roleSelect">Select Role</label>
      <select v-model="selectedStatus" id="roleSelect" class="form-control">
        <option v-for="status in statuses" :key="status.id" :value="status.enum">
          {{ status.name }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary" @click="setStatus">Change</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SetStatus",
  props: {
    selectedItem: Object
  },
  data() {
    return {
      statuses: [
        {
          id: 2,
          enum: "PROCESSING",
          name: "Processing"
        },
        {
          id: 3,
          enum: "WIN",
          name: "Win"
        },
        {
          id: 4,
          enum: "LOSE",
          name: "Lose"
        }
      ],
      selectedStatus: null
    };
  },
  methods: {
    async setStatus() {
      try {
        await axios.put(`http://localhost:8000/api/opportunity/${this.selectedItem.id}/change-status`, {
          status: this.selectedStatus,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.$emit('submit');
        this.$emit('refresh');
      } catch (error) {
        console.error('Error setting change status:', error);
      }
    }
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
</style>
