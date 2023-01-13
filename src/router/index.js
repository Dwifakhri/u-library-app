import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";
import BookDetail from "../views/BookDetail.vue";
import UserDetail from "../views/UserDetail.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/book/:_id",
    name: "bookdetail",
    component: BookDetail,
  },
  {
    path: "/user/:_id",
    name: "userdetail",
    component: UserDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem("token");
  if (to.name !== "login" && !auth) next({ name: "login" });
  else next();
});

export default router;
