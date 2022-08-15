<template>
  <h1>Login</h1>
  <form>
    <input
      v-model="usuario.email"
      type="email"
      placeholder="Digite seu e-mail"
    />
    <input
      v-model="usuario.senha"
      type="password"
      placeholder="Digite sua senha"
    />
    <button @click="entrar" type="button">Entrar</button>
  </form>
</template>

<script>
import { mapActions } from "pinia";
import { useUsuarioStore } from "../stores/usuarioStore";

export default {
  data: () => ({
    usuario: {},
  }),
  methods: {
    ...mapActions(useUsuarioStore, ["login"]),
    async entrar() {
      try {
        await this.login(this.usuario)
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 90px;
}

form {
  width: 400px;
  padding: 40px;
  background-color: white;
  margin: auto;
  border: 2px solid var(--primaria);
  border-radius: var(--border-radius);
}

form input {
  width: 100%;
  margin-bottom: 20px;
}
form button {
  width: 100%;
  margin-top: 40px;
}
</style>
