<template>
  <div class="w-full h-screen overflow-auto">
    <Navbar />
    <div class="md:py-4 px-8 p-3">
      <div class="flex justify-between items-center">
        <h1 class="my-2 text-2xl font-bold">List of Books</h1>
        <label
          htmlFor="create-book"
          class="px-4 py-2 bg-blue_hex text-white cursor-pointer"
        >
          Create New Book
        </label>
      </div>
      <div class="my-3">
        <div
          class="text-primary_dark flex flex-row text-[10px] items-center md:text-[12px] lg:text-[18px] px-3 md:px-7 py-0.5 space-x-2 mb-1 font-semibold break-words"
        >
          <p class="w-[5%] text-center">No</p>
          <p class="w-[35%] text-center">Title</p>
          <p class="w-[40%] text-center">Description</p>
          <p class="w-[20%] text-center">Created</p>
        </div>
        <div v-for="(book, index) in books" :key="book._id" class="w-full my-1">
          <hr class="mx-3 border border-primary opacity-25" />
          <router-link :to="/book/ + book._id">
            <div
              class="w-full flex flex-row text-[7px] items-center md:text-[12px] lg:text-[18px] px-3 md:px-7 py-1 space-x-2 text-black"
            >
              <p class="w-[5%] text-center">{{ index + 1 }}</p>
              <p class="w-[35%] text-center">{{ book.name }}</p>
              <p class="w-[40%] text-center">{{ book.description }}</p>
              <p class="w-[20%] text-center">{{ getDate(book.created) }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <!-- <div class="flex justify-center space-x-4 text-white">
        <div class="bg-blue_hex py-1 px-2 cursor-pointer">Prev</div>
        <div @click="nextBooks()" class="bg-blue_hex py-1 px-2 cursor-pointer">
          Next
        </div>
      </div> -->
    </div>

    <!-- {/* modal Create book*/} -->
    <input type="checkbox" id="create-book" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box bg-white shadow-lg">
        <h1 class="text-center font-semibold text-xl">Create Your Book</h1>
        <form
          @submit.prevent="handleCreateBook()"
          class="flex flex-col p-5 gap-5 break-words"
        >
          <CustomInput
            label="sdsd"
            type="text"
            placeholder="Book Name"
            v-model="event.name"
            >Name</CustomInput
          >
          <CustomInput
            type="text"
            placeholder="Book Description"
            v-model="event.description"
            >Description</CustomInput
          >
          <div class="flex flex-row justify-center space-x-10">
            <label
              htmlFor="create-book"
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
import axios from "axios";
import setHeader from "../utils/setHeader";
import Navbar from "../components/Navbar.vue";
import CustomButton from "../components/CustomButton.vue";
import CustomInput from "../components/CustomInput.vue";

export default {
  name: "dashboard",
  components: { Navbar, CustomButton, CustomInput },
  data() {
    return {
      books: [],
      event: {
        name: "",
        description: "",
      },
      page: 3,
    };
  },
  methods: {
    setBooks(data) {
      this.books = data;
    },
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
    async handleCreateBook() {
      axios
        .post(
          "https://frntest.atmatech.id/books",
          { name: this.event.name, description: this.event.description },
          setHeader(localStorage.getItem("token"))
        )
        .then((res) => {
          alert("succes");
        })
        .catch((err) => console.log(err));
    },
    nextBooks(data) {
      data + 1;
    },
  },
  mounted() {
    axios
      .get(
        "https://frntest.atmatech.id/users/me",
        setHeader(localStorage.getItem("token"))
      )
      .then((res) => {
        localStorage.setItem("role", res.data.role);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        "https://frntest.atmatech.id/books?page=" + this.page,
        setHeader(localStorage.getItem("token"))
      )
      .then((res) => {
        this.setBooks(res.data.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped></style>
