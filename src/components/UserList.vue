<template>
  <div class="container mt-5">
    <h2 class="mb-2">Opportunity List</h2>
    <dialog v-model="dialogs.setRole">
      <set-role @submit="dialogs.setRole = false" :selected-item="selectedItem"/>
    </dialog>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.roles.role }}</td>
        <td>
          <button
              class="btn btn-warning btn-sm me-2"
              @click="editItem(item)"
          >Edit
          </button>
          <button class="btn btn-danger btn-sm me-2"
                  @click="deleteItem(item.id)">Delete
          </button>
          <button v-if="item.roles.role==='MANAGER'" class="btn btn-danger btn-sm me-2"
                  @click="dialogs.setRole = true;selectedItem = item">SetRole
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import SetRole from "@/components/SetRole";

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
    userList() {
      this.$router.push('http://localhost:8000/api/user/list');
    },
    async editItem(itemId) {
      await axios.put('http://localhost:8000/api/user/update', {
        id: itemId,
      })
    },
    async deleteItem(itemId) {
      await axios.delete('http://localhost:8000/api/user/delete', {
        id: itemId,
      })
    },
  },
  async mounted() {
    try {
      const res = await axios.get('http://localhost:8000/api/auth/users');
      this.items = res.data;
    } catch (error) {
      console.error('Error fetching User list:', error);
    }
  }

}
;
</script>

<style scoped>

</style>
