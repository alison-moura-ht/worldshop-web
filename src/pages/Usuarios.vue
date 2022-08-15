<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Usuários</h1>
      <button v-show="!form" @click="abrirForm()">Novo</button>
    </div>
    <section class="form" v-show="form">
      <form-usuario-app
        @cancelar="fecharForm()"
        @salvo="salvo()"
        ref="form"
      ></form-usuario-app>
    </section>
    <section>
      <tabela-usuarios-app
        @editar="editar"
        @remover="remover"
      ></tabela-usuarios-app>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useUsuarioStore } from "../stores/usuarioStore";
import { useConfirmStore } from "../stores/confirmStore";
import { useAlertaStore } from "../stores/alertaStore";
import TabelaUsuariosApp from "./../components/usuario/TabelaUsuariosApp.vue";
import FormUsuarioApp from "../components/usuario/FormUsuarioApp.vue";

export default {
  components: {
    TabelaUsuariosApp,
    FormUsuarioApp,
  },
  data: () => ({
    form: false,
  }),
  methods: {
    ...mapActions(useUsuarioStore, ["buscarTodosUsuarios", "removerUsuario"]),
    ...mapActions(useConfirmStore, ["exibirConfirm"]),
    ...mapActions(useAlertaStore, ["exibirAlertaErro", "exibirAlertaSucesso"]),
    async buscarUsuarios() {
      try {
        await this.buscarTodosUsuarios();
      } catch (error) {
        this.exibirAlertaErro(error.message);
      }
    },
    editar(usuario) {
      this.abrirForm();
      this.$refs.form.editar(usuario);
    },
    remover(usuario) {
      this.exibirConfirm("Tem certeza?", async () => {
        try {
          await this.removerUsuario(usuario._id);
          this.buscarUsuarios();
        } catch (error) {
          alert(error.message);
        }
      });
    },
    salvo(error) {
      if (error) return this.exibirAlertaErro(error.message);
      this.fecharForm();
      this.buscarUsuarios();
      this.exibirAlertaSucesso("Usuário salvo com sucesso!");
    },
    abrirForm() {
      this.form = true;
    },
    fecharForm() {
      this.form = false;
    },
  },
  mounted() {
    this.buscarUsuarios();
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
