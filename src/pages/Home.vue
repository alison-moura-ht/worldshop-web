<template>
  <div class="main">
    <h1>Home</h1>
    <h2>Bem-vind@ {{ primeiroNome }}</h2>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { useUsuarioStore } from "../stores/usuarioStore";

export default {
  computed: {
    ...mapState(useUsuarioStore, ["usuarioLogado"]),
    primeiroNome() {
      return this.usuarioLogado.nome.split(" ")[0]
    }
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
