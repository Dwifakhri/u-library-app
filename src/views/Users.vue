<template>
  <div class="w-full h-screen overflow-auto">
    <Navbar />
    <div class="md:py-4 px-8 p-3">
      <div class="flex justify-between items-center">
        <h1 class="my-2 text-2xl font-bold">List of Users</h1>
        <label
          htmlFor="create-user"
          class="px-4 py-2 bg-blue_hex text-white cursor-pointer"
          @click="handleFetchRole()"
        >
          Create New User
        </label>
      </div>
      <div class="my-3">
        <div
          class="text-primary_dark flex flex-row text-[10px] items-center md:text-[12px] lg:text-[18px] px-3 md:px-7 py-0.5 space-x-2 mb-1 font-semibold break-words"
        >
          <p class="w-[5%] text-center">No</p>
          <p class="w-[25%] text-center">Username</p>
          <p class="w-[30%] text-center">Email</p>
          <p class="w-[15%] text-center">Role</p>
          <p class="w-[10%] text-center">Status</p>
          <p class="w-[15%] text-center">Created</p>
        </div>
        <div v-for="(user, index) in users" :key="user._id" class="w-full my-1">
          <hr class="mx-3 border border-primary opacity-25" />
          <router-link :to="/user/ + user._id">
            <div
              class="w-full flex flex-row text-[7px] items-center md:text-[12px] lg:text-[18px] px-3 md:px-7 py-1 space-x-2 text-black"
            >
              <p class="w-[5%] text-center">{{ index + 1 }}</p>
              <p class="w-[25%] text-center">{{ user.username }}</p>
              <p class="w-[30%] text-center">{{ user.email }}</p>
              <p class="w-[15%] text-center">{{ user.role }}</p>
              <p v-if="user.active" class="w-[10%] text-center">{{ status }}</p>
              <p class="w-[15%] text-center">{{ getDate(user.created) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- {/* modal Create book*/} -->
    <input type="checkbox" id="create-user" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box bg-white shadow-lg">
        <h1 class="text-center font-semibold text-xl">Create New User</h1>
        <form
          @submit.prevent="handleCreateUser()"
          class="flex flex-col p-5 gap-5 break-words"
        >
          <CustomInput
            type="text"
            placeholder="Username"
            v-model="event.username"
            >Username</CustomInput
          >
          <CustomInput type="email" placeholder="Email" v-model="event.email"
            >Email</CustomInput
          >
          <CustomInput
            type="password"
            placeholder="********"
            v-model="event.password"
            >Password</CustomInput
          >
          <CustomInput
            type="password"
            placeholder="********"
            v-model="event.confirm"
            >Confirm Password</CustomInput
          >
          <div class="flex flex-col space-y-1">
            <h1>Role</h1>
            <select
              v-model="event.role"
              name="roles"
              id="roles"
              class="px-3 py-1 border border-primary"
            >
              <option value="">Select Role</option>
              <option v-for="role in roles" :value="role">{{ role }}</option>
            </select>
          </div>
          <div class="flex flex-row justify-center space-x-10">
            <label
              htmlFor="create-user"
              class="px-4 py-2 bg-white text-primary border border-primary cursor-pointer rounded-none"
            >
              Close
            </label>
            <CustomButton buttonText="Create" />
          </div>
        </form>
      </div>
    </div>
    <!-- {/* end modal create book/} -->
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import setHeader from "../utils/setHeader";
import CustomInput from "../components/CustomInput.vue";
import CustomButton from "../components/CustomButton.vue";
import axios from "axios";

export default {
  name: "users",
  components: {
    Navbar,
    CustomInput,
    CustomButton,
  },
  data() {
    return {
      users: [],
      status: "active",
      event: {
        username: "",
        email: "",
        password: "",
        confirm: "",
        role: "",
      },
      roles: [],
    };
  },
  methods: {
    getDate(date) {
      const newDate = new Date(date);
      const newFormat =
        newDate.getDate() +
        "/" +
        (newDate.getMonth() < 12 ? newDate.getMonth() + 1 : 1) +
        "/" +
        newDate.getFullYear();
      return newFormat;
    },
    async handleCreateUser() {
      axios
        .post(
          "https://frntest.atmatech.id/users",
          {
            username: this.event.username,
            email: this.event.email,
            password: this.event.password,
            confirm: this.event.confirm,
            role: this.event.role,
          },
          setHeader(localStorage.getItem("token"))
        )
        .then((res) => {
          alert("succes");
        })
        .catch((err) => console.log(err));
    },
    async handleFetchRole() {
      axios
        .get(
          "https://frntest.atmatech.id/users/roles",
          setHeader(localStorage.getItem("token"))
        )
        .then((res) => {
          this.roles = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    axios
      .get(
        "https://frntest.atmatech.id/users",
        setHeader(localStorage.getItem("token"))
      )
      .then((res) => {
        this.users = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
