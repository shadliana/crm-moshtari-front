<template>
  <div class="container mt-5">
    <h2 class="mb-2">Opportunity List</h2>
    <div class="mb-3">
      <form @submit.prevent="searchOpportunities" class="d-flex">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search opportunities"
            class="form-control me-2"
        />
        <select v-model="selectedStatus" class="form-select me-2">
          <option value="">All Statuses</option>
          <option value="NEW">New</option>
          <option value="WIN">Win</option>
          <option value="LOSE">Lose</option>
          <!-- Add other statuses as needed -->
        </select>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>
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
              @click="openEditModal(item)"
          >
            Edit
          </button>
          <button
              v-if="item.status !== 'WIN' && item.status !== 'LOSE'"
              class="btn btn-danger btn-sm me-2"
              @click="deleteItem(item.id)"
          >
            Delete
          </button>
          <button
              v-if="item.createdBy && item.createdBy.roles && item.createdBy.roles.some(role => role.role === 'MANAGER')"
              class="btn btn-info btn-sm"
              @click="openSetStatusModal(item)"
          >
            Change Status
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <setStatus
        v-if="selectedItem && dialogs.setStatus"
        :selected-item="selectedItem"
        @submit="closeSetStatusModal"
        @refresh="fetchOpportunities"
    />
    <edit-opportunity
        v-if="selectedItem && dialogs.edit"
        :selected-item="selectedItem"
        @close="closeEditModal"
        @refresh="fetchOpportunities"
    />
  </div>
</template>

<script>
import axios from "axios";
import setStatus from "@/pages/Opportunity/ChangeStatus/SetStatus";
import editOpportunity from "@/pages/Opportunity/Edit/OpportunityEdit";

export default {
  components: { setStatus, editOpportunity },
  data() {
    return {
      selectedItem: null,
      dialogs: {
        setStatus: false,
        edit: false,
      },
      items: [],
      currentUser: null,
      searchQuery: '',
      selectedStatus: '',
    };
  },
  methods: {
    async fetchOpportunities() {
      try {
        const res = await axios.get('http://localhost:8000/api/opportunity/list', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.items = res.data.data;
      } catch (error) {
        console.error('Error fetching opportunity list:', error);
      }
    },
    async searchOpportunities() {
      try {
        const params = {};
        if (this.searchQuery) params.search = this.searchQuery;
        if (this.selectedStatus) params.status = this.selectedStatus;

        const res = await axios.get('http://localhost:8000/api/opportunity/list', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params,
        });
        this.items = res.data.data;
      } catch (error) {
        console.error('Error searching opportunities:', error);
      }
    },
    openSetStatusModal(item) {
      this.selectedItem = item;
      this.dialogs.setStatus = true;
    },
    closeSetStatusModal() {
      this.dialogs.setStatus = false;
      this.selectedItem = null;
      this.fetchOpportunities();
    },
    openEditModal(item) {
      this.selectedItem = item;
      this.dialogs.edit = true;
    },
    closeEditModal() {
      this.dialogs.edit = false;
      this.selectedItem = null;
      this.fetchOpportunities();
    },
    create() {
      this.$router.push('/opportunity/create');
    },
    userList() {
      this.$router.push('/user/list');
    },
    async deleteItem(itemId) {
      await axios.delete(`http://localhost:8000/api/opportunity/${itemId}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      this.fetchOpportunities();
    },
  },
  async mounted() {
    await this.fetchOpportunities();
    const userResponse = await axios.get('http://localhost:8000/api/auth/current-user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.currentUser = userResponse.data;
  },
};
</script>

<style scoped>
</style>
