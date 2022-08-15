<template>
  <form>
    <input v-model="usuario.nome" type="text" placeholder="Nome do usuário" />
    <input
      v-model="usuario.email"
      type="email"
      placeholder="Email do usuário"
    />
    <input
      v-model="usuario.senha"
      type="password"
      placeholder="Senha do usuário"
    />
  </form>
  <div class="btns">
    <button @click="cancelar()" type="button" class="text">Cancelar</button>
    <button @click="salvar()" type="button">Salvar</button>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useUsuarioStore } from "../../stores/usuarioStore";

export default {
  data: () => ({
    usuario: {},
  }),
  methods: {
    ...mapActions(useUsuarioStore, ["cadastrarUsuario", "atualizarUsuario"]),
    async salvar() {
      try {
        if (this.usuario._id) await this.atualizarUsuario(this.usuario);
        else await this.cadastrarUsuario(this.usuario);

        this.usuario = {};
        this.$emit("salvo");
      } catch (error) {
        this.$emit("salvo", error)
      }
    },
    cancelar() {
      this.usuario = {};
      this.$emit("cancelar");
    },
    editar(usuario) {
      this.usuario = usuario;
    },
  },
};
</script>
