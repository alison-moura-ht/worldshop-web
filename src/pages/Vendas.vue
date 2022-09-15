<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Vendas</h1>
    </div>
    <section>
      <!-- tabela de vendas -->
      <tabela-venda-app></tabela-venda-app>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useVendaStore } from "../stores/vendaStore";
import TabelaVendaApp from "../components/venda/TabelaVendaApp.vue";

export default {
  components: { TabelaVendaApp },
  methods: {
    ...mapActions(useVendaStore, ["buscarTodasVendas"]),
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
