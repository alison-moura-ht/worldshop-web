<template>
  <navbar-app v-show="$route.meta.nav"></navbar-app>
  <confirm-app></confirm-app>
  <alerta-app></alerta-app>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import { mapActions } from "pinia";
import { useUsuarioStore } from "./stores/usuarioStore";
import NavbarApp from "./components/sistema/NavbarApp.vue";
import ConfirmApp from "./components/sistema/ConfirmApp.vue";
import AlertaApp from "./components/sistema/AlertaApp.vue";

export default {
  components: {
    NavbarApp,
    ConfirmApp,
    AlertaApp,
  },
  data: () => ({}),
  methods: {
    ...mapActions(useUsuarioStore, ["recuperarUsuarioLogado"])
  },
  mounted() {
    this.recuperarUsuarioLogado()
  }
};
</script>
