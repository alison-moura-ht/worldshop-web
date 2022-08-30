import Login from "./../pages/Login.vue";
import Home from "./../pages/Home.vue";
import Usuarios from "../pages/Usuarios.vue";
import Cliente from "../pages/Cliente.vue";

export default [
  {
    name: "Login",
    path: "/",
    component: Login,
    meta: {
      nav: false,
      auth: false,
    },
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
    meta: {
      nav: true,
      auth: true,
    },
  },
  {
    name: "Usuarios",
    path: "/usuarios",
    component: Usuarios,
    meta: {
      nav: true,
      auth: true,
    },
  },
  {
    name: "Clientes",
    path: "/clientes",
    component: Cliente,
    meta: {
      nav: true,
      auth: true,
    },
  },
];