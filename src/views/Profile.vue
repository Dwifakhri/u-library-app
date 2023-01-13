<template>
  <div class="w-full h-screen overflow-auto">
    <Navbar />
    <div class="md:p-5 p-3 flex flex-col space-y-5">
      <h1 class="mt-6 text-2xl font-bold text-blue_hex">My Profile</h1>
      <div class="md:w-1/2">
        <CustomInput type="text" v-model="profile.username"
          >Username</CustomInput
        >
      </div>
      <div class="md:w-1/2">
        <CustomInput type="email" v-model="profile.email">Email</CustomInput>
      </div>
      <div class="md:w-1/2">
        <CustomInput type="text" v-model="profile.role">Role</CustomInput>
      </div>
      <div class="md:w-1/2">
        <CustomInput type="text" v-model="profile.active">Status</CustomInput>
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
  name: "profile",
  components: {
    Navbar,
    CustomInput,
  },
  data() {
    return {
      profile: {},
    };
  },
  mounted() {
    axios
      .get(
        "https://frntest.atmatech.id/users/me",
        setHeader(localStorage.getItem("token"))
      )
      .then((res) => {
        this.profile = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
