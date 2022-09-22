<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Vendas</h1>
      <button v-show="!form" @click="abrirForm">Novo</button>
    </div>
    <section v-show="form">
      <form-venda-app @salvo="salvo" @cancelar="fecharForm"></form-venda-app>
    </section>
    <section class="form">
      <!-- tabela de vendas -->
      <tabela-venda-app @cancelar="cancelar"></tabela-venda-app>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useVendaStore } from "../stores/vendaStore";
import { useConfirmStore } from "../stores/confirmStore";
import TabelaVendaApp from "../components/venda/TabelaVendaApp.vue";
import FormVendaApp from "../components/venda/FormVendaApp.vue";
import { useAlertaStore } from "../stores/alertaStore";

export default {
  data: () => ({
    form: false,
  }),
  components: { TabelaVendaApp, FormVendaApp },
  methods: {
    ...mapActions(useAlertaStore, ["exibirAlertaErro"]),
    ...mapActions(useConfirmStore, ["exibirConfirm"]),
    ...mapActions(useVendaStore, ["buscarTodasVendas", "cancelarVenda"]),
    abrirForm() {
      this.form = true;
    },
    fecharForm() {
      this.form = false;
    },
    salvo() {
      this.fecharForm();
      this.buscarTodasVendas();
    },
    cancelar(venda) {
      this.exibirConfirm("Tem certeza?", async () => {
        try {
          await this.cancelarVenda(venda._id);
          this.buscarTodasVendas();
        } catch (error) {
          this.exibirAlertaErro(error.message);
        }
      });
    },
  },
  async mounted() {
    this.buscarTodasVendas();
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
