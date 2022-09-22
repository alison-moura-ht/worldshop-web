<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Detalhe da venda</h1>
    </div>
    <section>
      <div>
        <strong>ID:</strong> <span>#{{ venda._id }}</span>
      </div>
      <div>
        <strong>Cliente:</strong> <span>{{ venda.cliente.nome }}</span>
      </div>
      <div>
        <strong>Vendedor:</strong> <span>{{ venda.usuario.nome }}</span>
      </div>
      <div>
        <strong>Cancelado: </strong>
        <span>{{ venda.cancelado ? "Sim" : "Não" }}</span>
      </div>
      <div>
        <strong>Data da venda: </strong>
        <span>{{ formataData(venda.data) }}</span>
      </div>
      <div>
        <strong>Valor total: </strong>
        <span>{{ formataBRL(venda.valorTotal) }}</span>
      </div>
      <div class="mt-20">
        <strong>Itens da venda:</strong>
        <table v-show="venda.itens.length > 0">
          <thead>
            <th>#</th>
            <th>Produto</th>
            <th>Quantidae</th>
            <th>Valor un.</th>
          </thead>
          <tbody>
            <tr v-for="(item, i) in venda.itens" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ item.produto.descricao }}</td>
              <td>{{ item.quantidade }}</td>
              <td>{{ formataBRL(item.produto.valorUnitario) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useAlertaStore } from "../stores/alertaStore";
import { useVendaStore } from "../stores/vendaStore";
import { formataData, formataBRL } from "../utils/formatadorUtil";

export default {
  data: () => ({
    venda: { cliente: {}, usuario: {}, itens: [] },
  }),
  methods: {
    ...mapActions(useVendaStore, ["buscarVendaPorId"]),
    ...mapActions(useAlertaStore, ["exibirAlertaErro"]),
    formataData(data) {
      return formataData(data);
    },
    formataBRL(valor) {
      return formataBRL(valor);
    },
  },
  async mounted() {
    try {
      this.venda = await this.buscarVendaPorId(this.$route.params.id);
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
