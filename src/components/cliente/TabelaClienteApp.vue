<template>
  <table>
    <thead>
      <th>Nome</th>
      <th>Email</th>
      <th>CEP</th>
      <th>Ações</th>
    </thead>
    <tbody>
      <tr v-for="item in clientes" :key="item._id">
        <td>{{ item.nome }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.cep }}</td>
        <td>
          <button @click="editar(item)" class="text">Editar</button>
          <button @click="remover(item)" class="text">Remover</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "pinia";
import { useClienteStore } from "../../stores/clienteStore";

export default {
  computed: {
    ...mapState(useClienteStore, ["clientes"]),
  },
  methods: {
    editar(cliente) {
      const clienteCopia = Object.assign({}, cliente);
      this.$emit("editar", clienteCopia);
    },
    remover(cliente) {
      this.$emit("remover", cliente);
    },
  },
};
</script>
