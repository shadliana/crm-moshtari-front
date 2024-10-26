<template>
  <div class="container mt-5">
    <h2 class="mb-2">User List</h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.roles[0]?.role }}</td>
        <td>
          <button class="btn btn-danger btn-sm me-2" @click="openSetRoleModal(item)">Set Role</button>
        </td>
      </tr>
      </tbody>
    </table>
    <set-role
        v-if="selectedItem && dialogs.setRole"
        :selected-item="selectedItem"
        @submit="closeSetRoleModal"
        @refresh="fetchUserList"
    />
  </div>
</template>

<script>
import axios from "axios";
import SetRole from "@/pages/User/SetRole/SetRole.vue";

export default {
  components: { SetRole },

  data() {
    return {
      dialogs: {
        setRole: false,
      },
      items: [],
      selectedItem: null,
    };
  },
  methods: {
    openSetRoleModal(item) {
      this.selectedItem = item;
      this.dialogs.setRole = true; // Open Set Role modal
    },
    closeSetRoleModal() {
      this.dialogs.setRole = false;
      this.selectedItem = null; // Reset selected item
    },
    async fetchUserList() {
      try {
        const res = await axios.get('http://localhost:8000/api/user/list', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.items = res.data.data;
      } catch (error) {
        console.error('Error fetching User list:', error);
      }
    },
  },
  async mounted() {
    this.fetchUserList();
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
