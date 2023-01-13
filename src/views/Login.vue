<template>
  <div
    class="flex flex-col w-full h-screen justify-center items-center p-5 space-y-5"
  >
    <h1 class="text-4xl font-bold text-blue_hex">U-Library</h1>
    <form
      @submit.prevent="handleLogin()"
      class="md:h-96 md:w-80 flex flex-col space-y-4 p-4 border-primary border rounded-lg"
    >
      <h1 class="font-semibold text-xl">Login Here</h1>
      <CustomInput
        type="email"
        placeholder="example@gmail.com"
        v-model="event.email"
        >Email</CustomInput
      >
      <CustomInput
        type="password"
        placeholder="********"
        v-model="event.password"
        >Password</CustomInput
      >
      <button class="px-2 py-1 bg-blue_hex text-white">Login</button>
    </form>
  </div>
</template>

<script>
import CustomInput from "../components/CustomInput.vue";
import axios from "axios";

export default {
  name: "login",
  components: { CustomInput },
  data() {
    return {
      event: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      axios
        .post("https://frntest.atmatech.id/auth/login", {
          email: this.event.email,
          password: this.event.password,
        })
        .then((res) => {
          this.$router.push({ name: "dashboard" });
          localStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
