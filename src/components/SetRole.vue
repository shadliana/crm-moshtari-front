<template>
  <div class="set-role">
    <h2>Set Role</h2>
    <div class="form-group">
      <label for="roleSelect">Select Role</label>
      <select v-model="selectedRole" id="roleSelect" class="form-control">
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.name }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary" @click="setRole">Set Role</button>
  </div>
</template>

<script>
export default {
  name: "SetRole",
  props: {
    selectedItem: {}
  },
  data() {
    return {
      roles: [
        {
          id: 1,
          enum: "MANAGER",
          name: "Manager"
        },
        {
          id: 1,
          enum: "USER",
          name: "User"
        }
      ],
      selectedRole: null
    };
  },
  methods: {
    async setRole() {
      await axios.post('http://localhost:8000/api/set-role', {
        user_id: this.selectedItem?.id,
        role: this.selectedRole
      });
      console.log('Role set successfully');
      this.$emit('submit')
    }
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
</style>
