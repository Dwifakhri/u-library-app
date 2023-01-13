<template>
  <div class="w-full h-screen overflow-auto">
    <Navbar />
    <div class="md:p-5 p-3 flex flex-col space-y-5">
      <h1 class="mt-6 text-2xl font-bold">
        User :
        <span class="font-italic text-blue_hex">{{ user.username }}</span>
      </h1>

      <div class="md:w-1/2">
        <CustomInput type="text" v-model="user.username">Username</CustomInput>
      </div>
      <div class="md:w-1/2">
        <CustomInput type="email" v-model="user.email">Email</CustomInput>
      </div>
      <div class="md:w-1/2">
        <CustomInput type="text" v-model="user.role">Role</CustomInput>
      </div>
      <div class="md:w-1/2">
        <CustomInput type="text" v-model="user.active">Status</CustomInput>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import setHeader from "../utils/setHeader";
import CustomInput from "../components/CustomInput.vue";

export default {
  name: "userdetail",
  components: { Navbar, CustomInput },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    setUser(data) {
      this.user = data;
    },
  },
  mounted() {
    axios
      .get(
        "https://frntest.atmatech.id/users/" + this.$route.params._id,
        setHeader(localStorage.getItem("token"))
      )
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
