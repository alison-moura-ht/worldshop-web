<template>
  <table>
    <thead>
      <th>Valor total</th>
      <th>Data venda</th>
      <th>Cliente</th>
      <th>Vendedor</th>
      <th>Cancelado</th>
      <th>Ações</th>
    </thead>
    <tbody>
      <tr v-for="item in vendasFiltrado" :key="item._id">
        <td>{{ formataDecimal(item.valorTotal) }}</td>
        <td>{{ formataData(item.data) }}</td>
        <td>{{ item.cliente.nome }}</td>
        <td>{{ item.usuario.nome }}</td>
        <td>{{ item.cancelado ? "Sim" : "Não" }}</td>
        <td>
          <button @click="detalhe(item._id)" class="text">Detalhes</button>
          <button @click="cancelar(item)" class="text">Cancelar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useVendaStore } from "../../stores/vendaStore";
import { formataBRL, formataData } from "../../utils/formatadorUtil";

export default {
  data: () => ({
    vendasFiltrado: [],
  }),
  computed: {
    ...mapState(useVendaStore, ["vendas"]),
  },
  methods: {
    ...mapActions(useVendaStore, [
      "buscarVendasPorIntervalo",
      "buscarTodasVendas",
    ]),
    formataDecimal(valor) {
      return formataBRL(valor);
    },
    formataData(data) {
      return formataData(data);
    },
    cancelar(item) {
      this.$emit("cancelar", item);
    },
    detalhe(id) {
      this.$router.push({ name: "DetalheVenda", params: { id: id } });
    },
    async filtrarVendas(dataInicial, dataFinal) {
      this.vendasFiltrado = await this.buscarVendasPorIntervalo(
        dataInicial,
        dataFinal
      );
    },
    async limparFiltro() {
      this.vendasFiltrado = await this.buscarTodasVendas();
    },
  },
  watch: {
    vendas() {
      this.vendasFiltrado = this.vendas;
    },
  },
};
</script>
