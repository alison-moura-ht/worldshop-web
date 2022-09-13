<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Detalhe do produto</h1>
    </div>
    <section>
      <div>
        <strong>ID:</strong> <span>#{{ produto._id }}</span>
      </div>
      <div>
        <strong>Descrição:</strong> <span>{{ produto.descricao }}</span>
      </div>
      <div>
        <strong>Detalhes:</strong> <span>{{ produto.detalhes }}</span>
      </div>
      <div>
        <strong>Valor Unitário:</strong>
        <span>{{ produto.valorUnitario }}</span>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useProdutoStore } from "../stores/produtoStore";
import { useAlertaStore } from "../stores/alertaStore";

export default {
  data: () => ({
    produto: {},
  }),
  methods: {
    ...mapActions(useProdutoStore, ["buscarProdutoPorId"]),
    ...mapActions(useAlertaStore, ["exibirAlertaErro"]),
  },
  async mounted() {
    try {
      this.produto = await this.buscarProdutoPorId(this.$route.params.id);
    } catch (error) {
      this.exibirAlertaErro(error.message);
    }
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
