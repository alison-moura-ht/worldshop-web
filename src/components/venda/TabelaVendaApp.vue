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
      <tr v-for="item in vendas" :key="item._id">
        <td>{{ formataDecimal(item.valorTotal) }}</td>
        <td>{{ formataData(item.data) }}</td>
        <td>{{ item.cliente.nome }}</td>
        <td>{{ item.usuario.nome }}</td>
        <td>{{ item.cancelado ? "Sim" : "Não" }}</td>
        <td>
          <button class="text">Detalhes</button>
          <button @click="cancelar(item)" class="text">Cancelar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "pinia";
import { useVendaStore } from "../../stores/vendaStore";
import { formataBRL } from "../../utils/formatadorUtil";
import moment from "moment-timezone";

export default {
  computed: {
    ...mapState(useVendaStore, ["vendas"]),
  },
  methods: {
    formataDecimal(valor) {
      return formataBRL(valor);
    },
    formataData(data) {
      const dataMoment = moment(data);
      return dataMoment.tz("America/Campo_Grande").format("DD/MM/YYYY");
    },
    cancelar(item) {
      this.$emit("cancelar", item);
    },
  },
};
</script>
