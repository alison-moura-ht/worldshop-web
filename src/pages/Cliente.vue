<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Clientes</h1>
      <button v-show="!form" @click="abrirForm()">Novo</button>
    </div>
    <section class="form" v-show="form">
      <form-cliente-app
        @cancelar="fecharForm()"
        @salvo="salvo"
        ref="form"
      ></form-cliente-app>
    </section>
    <section>
      <tabela-cliente-app
        @editar="editar"
        @remover="remover"
      ></tabela-cliente-app>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useClienteStore } from "../stores/clienteStore";
import { useConfirmStore } from "../stores/confirmStore";
import { useAlertaStore } from "../stores/alertaStore";
import TabelaClienteApp from "../components/cliente/TabelaClienteApp.vue";
import FormClienteApp from "../components/cliente/FormClienteApp.vue";

export default {
  components: {
    TabelaClienteApp,
    FormClienteApp,
  },
  data: () => ({
    form: false,
  }),
  methods: {
    ...mapActions(useClienteStore, ["buscarTodosClientes", "removerCliente"]),
    ...mapActions(useConfirmStore, ["exibirConfirm"]),
    ...mapActions(useAlertaStore, ["exibirAlertaErro", "exibirAlertaSucesso"]),
    abrirForm() {
      this.form = true;
    },
    fecharForm() {
      this.form = false;
    },
    editar(cliente) {
      this.abrirForm();
      this.$refs.form.editar(cliente);
    },
    remover(cliente) {
      this.exibirConfirm("Tem certeza?", async () => {
        try {
          await this.removerCliente(cliente._id);
          this.buscarClientes();
        } catch (error) {
          this.exibirAlertaErro(error.message);
        }
      });
    },
    salvo(error) {
      if (error) return this.exibirAlertaErro(error.message);
      this.fecharForm();
      this.buscarClientes();
      this.exibirAlertaSucesso("Cliente salvo com sucesso!");
    },
    async buscarClientes() {
      try {
        await this.buscarTodosClientes();
      } catch (error) {
        this.exibirAlertaErro(error.message);
      }
    },
  },
  mounted() {
    this.buscarClientes();
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
