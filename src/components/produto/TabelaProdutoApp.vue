<template>
  <table>
    <thead>
      <th>Descrição</th>
      <th>Detalhes</th>
      <th>Valor Unitário</th>
      <th>Ações</th>
    </thead>
    <tbody>
      <tr v-for="item in produtos" :key="item._id">
        <td>{{ item.descricao }}</td>
        <td>{{ item.detalhes }}</td>
        <td>R${{ item.valorUnitario }}</td>
        <td>
          <button @click="detalhe(item)" class="text">Detalhes</button>
          <button @click="editar(item)" class="text">Editar</button>
          <button @click="remover(item)" class="text">Remover</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "pinia";
import { useProdutoStore } from "../../stores/produtoStore";
export default {
  computed: {
    ...mapState(useProdutoStore, ["produtos"]),
  },
  methods: {
    editar(produto) {
      const produtoCopia = Object.assign({}, produto);
      this.$emit("editar", produtoCopia);
    },
    remover(produto) {
      this.$emit("remover", produto);
    },
    detalhe(produto) {
      this.$router.push({
        name: "DetalheProduto",
        params: { id: produto._id },
      });
    },
  },
};
</script>
