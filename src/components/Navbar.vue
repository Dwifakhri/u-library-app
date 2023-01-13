<template>
  <div
    class="flex justify-between items-center p-3 md:px-8 md:py-3 bg-white shadow-lg z-10 sticky top-0 text-primary_dark font-bold"
  >
    <h1 class="text-2xl font-bold text-blue_hex">U-Library</h1>
    <div class="flex justify-center items-center space-x-8">
      <RouterLink to="/dashboard"
        ><p class="cursor-pointer hover:text-blue_hex">Home</p></RouterLink
      >
      <RouterLink to="/users" v-if="admin"
        ><p class="cursor-pointer hover:text-blue_hex">Users</p></RouterLink
      >
      <RouterLink to="/profile"
        ><p class="cursor-pointer hover:text-blue_hex">Profile</p></RouterLink
      >
      <p @click="handleLogout()" class="hover:text-red-500 cursor-pointer">
        Logout
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      role: localStorage.getItem("role"),
      admin: false,
    };
  },
  mounted() {
    if (this.role === "admin") {
      this.admin = true;
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
