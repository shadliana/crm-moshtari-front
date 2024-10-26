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
          <button
              class="btn btn-warning btn-sm me-2"
              @click="editItem(item)"
          >Edit
          </button>
          <button class="btn btn-danger btn-sm me-2"
                  @click="dialogs.setRole = true;selectedItem = item">SetRole
          </button>
        </td>
      </tr>
      </tbody>
    </table>
      <div class="modal fade" id="setRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <set-role @submit="dialogs.setRole = false" :selected-item="selectedItem"/>
      </div>
  </div>
</template>

<script>
import axios from "axios";

import * as bootstrap from 'bootstrap';
import SetRole from "@/pages/User/SetRole/SetRole.vue";

export default {
    components: {SetRole},

  data() {
    return {
      dialogs: {
        setRole: false,
      },
      items: [],
      selectedItem: null,
      currentUser: null,
      status: "NEW",
    };
  },
  methods: {
    async editItem(itemId) {
      await axios.put(`http://localhost:8000/api/user/${itemId}/update`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      })
    },
    showModal() {
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show();
    },
  },
  async mounted() {
    try {
      const res = await axios.get('http://localhost:8000/api/user/list',{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      this.items = res.data.data;
    } catch (error) {
      console.error('Error fetching User list:', error);
    }
  }

}
;
</script>

<style scoped>

</style>
