<template>
  <div class="w-full h-screen overflow-auto">
    <Navbar />
    <div class="md:p-5 p-3 flex flex-col space-y-5">
      <h1 class="mt-6 text-2xl font-bold">
        Book : <span class="font-italic text-blue_hex">{{ book.name }} </span>
      </h1>
      <div class="flex flex-col space-y-1">
        <h1 class="text-2xl font-bold">Description</h1>
        <p>{{ book.description }}</p>
      </div>
      <div class="flex flex-col space-y-1">
        <h1 class="text-2xl font-bold">Created</h1>
        <p>{{ new Date(book.created) }}</p>
      </div>
      <div class="flex flex-col space-y-1">
        <h1 class="text-2xl font-bold">Author ID</h1>
        <p>{{ book.created_by_id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import setHeader from "../utils/setHeader";

export default {
  name: "bookdetail",
  components: { Navbar },
  data() {
    return {
      book: {},
    };
  },
  methods: {
    setBook(data) {
      this.book = data;
    },
  },
  mounted() {
    axios
      .get(
        "https://frntest.atmatech.id/books/" + this.$route.params._id,
        setHeader(localStorage.getItem("token"))
      )
      .then((res) => {
        this.setBook(res.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>
