<template>
  <div class="container mt-5">
    <h2 class="mb-2">Opportunity List</h2>
      <div class="mb-3 d-flex justify-content-end">
          <button class="btn btn-secondary me-2" @click="userList">User List</button>
          <button class="btn btn-secondary" @click="create">Create Opportunity</button>
      </div>
      <table class="table table-striped">
      <thead>
      <tr>
        <th>Title</th>
        <th>Related Customer</th>
        <th>Cost</th>
        <th>Status</th>
          <th>CreatedBy</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.related_customer }}</td>
        <td>{{ item.cost }}</td>
        <td>{{ item.status }}</td>
          <td>{{ item.createdBy.name }}</td>
        <td>
            <button
                    v-if="(item.createdBy && item.createdBy.roles && item.createdBy.roles.some(role => role.role === 'MANAGER')) || item.created_by_id === currentUser.id"
                    class="btn btn-warning btn-sm me-2"
                    @click="editItem(item)"
            >
                Edit
            </button>
          <button v-if="item.status !=='WIN'||item.status !=='LOSE'" class="btn btn-danger btn-sm me-2"
                  @click="deleteItem(item.id)">Delete
          </button>
            <button
                    v-if="item.createdBy && item.createdBy.roles && item.createdBy.roles.some(role => role.role === 'MANAGER')"
                    class="btn btn-info btn-sm"
                    @click="changeStatus(item, status)"
            >
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
        this.$router.push('/opportunity/create');
    },
    userList() {
      this.$router.push('/user/list');
    },
    async editItem(itemId) {
      await axios.put(`http://localhost:8000/api/opportunity/${itemId}/update`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      })
    },
    async deleteItem(itemId) {
        await axios.delete(`http://localhost:8000/api/opportunity/${itemId}/delete`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        location.reload();
    },

    async changeStatus(item, status) {
      await axios.put('http://localhost:8000/api/opportunity/change-status', {
        status: status,
        id: item.id,
      })
    },
  },
  async mounted() {
      const userResponse = await axios.get('http://localhost:8000/api/auth/current-user', {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
  });
      this.currentUser = userResponse.data;
    try {
      const res = await axios.get('http://localhost:8000/api/opportunity/list',{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      this.items = res.data.data;
    } catch (error) {
      console.error('Error fetching opportunity list:', error);
    }
  }

}
;
</script>

<style scoped>

</style>
