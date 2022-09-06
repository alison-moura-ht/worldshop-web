<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Produtos</h1>
    </div>
    <section>
      <div v-for="item in produtos" :key="item._id">
        {{ item.descricao }} - R${{ item.valorUnitario }}
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useProdutoStore } from "../stores/produtoStore";
import { useAlertaStore } from "../stores/alertaStore";

export default {
  computed: {
    ...mapState(useProdutoStore, ["produtos"]),
  },
  methods: {
    ...mapActions(useProdutoStore, ["buscarTodosProdutos"]),
    ...mapActions(useAlertaStore, ["exibirAlertaErro"]),
    async carregarProdutos() {
      try {
        await this.buscarTodosProdutos();
      } catch (error) {
        this.exibirAlertaErro(error.message);
      }
    },
  },
  mounted() {
    this.carregarProdutos();
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
