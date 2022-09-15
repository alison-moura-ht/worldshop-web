<template>
  <table>
    <thead>
      <th>Valor total</th>
      <th>Data venda</th>
      <th>Cliente</th>
      <th>Vendedor</th>
      <th>Ações</th>
    </thead>
    <tbody>
      <tr v-for="item in vendas" :key="item._id">
        <td>{{ formataDecimal(item.valorTotal) }}</td>
        <td>{{ item.data }}</td>
        <td>{{ item.cliente.nome }}</td>
        <td>{{ item.usuario.nome }}</td>
        <td>
          <button class="text">Editar</button>
          <button class="text">Remover</button>
          <button class="text">Detalhes</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "pinia";
import { useVendaStore } from "../../stores/vendaStore";

export default {
  computed: {
    ...mapState(useVendaStore, ["vendas"]),
  },
  methods: {
    formataDecimal(valor) {
      return valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    },
  },
};
</script>
