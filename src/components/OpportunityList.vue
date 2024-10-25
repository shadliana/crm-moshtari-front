<template>
  <div class="container mt-5">
    <h2 class="mb-2">Opportunity List</h2>
    <div class="mb-3">
      <button class="btn btn-secondary" @click="userList">User List</button>
      <button class="btn btn-secondary" @click="dialogs.create =true">Create Opportunity</button>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Title</th>
        <th>Related Customer</th>
        <th>Cost</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.related_customer }}</td>
        <td>{{ item.cost }}</td>
        <td>{{ item.status }}</td>
        <td>
          <button
              v-if="item.createdBy.roles.role ==='MANAGER' || item.created_by_id === currentUser.id"
              class="btn btn-warning btn-sm me-2"
              @click="editItem(item)"
          >Edit
          </button>
          <button v-if="item.status !=='WIN'||item.status !=='LOSE'" class="btn btn-danger btn-sm me-2"
                  @click="deleteItem(item.id)">Delete
          </button>
          <button v-if="item.createdBy.roles.role ==='MANAGER'" class="btn btn-info btn-sm"
                  @click="changeStatus(item,status)">
            Change Status
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {SetRole},
  data() {
    return {
      dialogs: {
        create: false,
      },
      items: [],
      currentUser: null,
      status: "NEW",
    };
  },
  methods: {
    create() {

    },
    userList() {
      this.$router.push('http://localhost:8000/api/auth/users'); // مسیر صفحه لیست کاربران
    },
    async editItem(itemId) {
      await axios.put('http://localhost:8000/api/opportunity/update', {
        id: itemId,
      })
    },
    async deleteItem(itemId) {
      await axios.delete('http://localhost:8000/api/opportunity/delete', {
        id: itemId,
      })
    },

    async changeStatus(item, status) {
      await axios.put('http://localhost:8000/api/change-status', {
        status: status,
        id: item.id,
      })
    },
  },
  async mounted() {
    try {
      const userResponse = await axios.get('http://localhost:8000/api/current-user');
      this.currentUser = userResponse.data;

      const res = await axios.get('http://localhost:8000/api/opportunity/list');
      this.items = res.data;
    } catch (error) {
      console.error('Error fetching opportunity list:', error);
    }
  }

}
;
</script>

<style scoped>

</style>
