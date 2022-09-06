<template>
  <nav>
    <span class="titulo">World Shop</span>
    <div>
      <router-link to="/home">Home</router-link>
      <router-link to="/usuarios">Usuários</router-link>
      <router-link to="/clientes">Clientes</router-link>
      <router-link to="/produtos">Produtos</router-link>
      <a @click="sair()">Sair</a>
    </div>
  </nav>
</template>
<script>
import { mapActions } from 'pinia'
import { useUsuarioStore } from '../../stores/usuarioStore'

export default {
  methods: {
    ...mapActions(useUsuarioStore, ["removerUsuarioLogado"]),
    sair() {
      this.removerUsuarioLogado()
      this.$router.push("/")
    }
  }
}
</script>
<style scoped>
nav {
  background-color: var(--primaria);
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 60px;
}
nav .titulo {
  font-weight: bold;
  font-size: 25px;
}

nav a {
    text-decoration: none;
    color: white;
    margin-left: 20px;
}
</style>
