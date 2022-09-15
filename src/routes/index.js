import Login from "./../pages/Login.vue";
import Home from "./../pages/Home.vue";
import Usuarios from "../pages/Usuarios.vue";
import Cliente from "../pages/Cliente.vue";
import DetalheCliente from "../pages/DetalheCliente.vue";
import Produtos from "../pages/Produtos.vue";
import DetalheProduto from "../pages/DetalheProduto.vue";
import Vendas from "../pages/Vendas.vue";

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
  {
    name: "DetalheCliente",
    path: "/cliente/:id",
    component: DetalheCliente,
    meta: {
      nav: true,
      auth: true,
    },
  },
  {
    name: "Produtos",
    path: "/produtos",
    component: Produtos,
    meta: {
      nav: true,
      auth: true,
    },
  },
  {
    name: "DetalheProduto",
    path: "/produto/:id",
    component: DetalheProduto,
    meta: {
      nav: true,
      auth: true,
    },
  },
  {
    name: "Vendas",
    path: "/vendas",
    component: Vendas,
    meta: {
      nav: true,
      auth: true,
    },
  },
];
