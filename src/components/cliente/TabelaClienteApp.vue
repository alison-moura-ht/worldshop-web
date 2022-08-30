<template>
  <table>
    <thead>
      <th>Nome</th>
      <th>Email</th>
      <th>CEP</th>
      <th>Ações</th>
    </thead>
    <tbody>
      <tr v-for="item in clientesFiltrados" :key="item._id">
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
  data: () => ({
    textoBusca: "",
  }),
  computed: {
    ...mapState(useClienteStore, ["clientes"]),
    clientesFiltrados() {
      if (this.textoBusca) {
        return this.clientes.filter((el) => {
          return (
            el.nome.toUpperCase().includes(this.textoBusca.toUpperCase()) ||
            el.email.toUpperCase().includes(this.textoBusca.toUpperCase()) ||
            el.cpf == this.textoBusca
          );
        });
      } else return this.clientes;
    },
  },
  methods: {
    editar(cliente) {
      const clienteCopia = Object.assign({}, cliente);
      this.$emit("editar", clienteCopia);
    },
    remover(cliente) {
      this.$emit("remover", cliente);
    },
    filtrarClientes(busca) {
      this.textoBusca = busca;
    },
    limparFiltro() {
      this.textoBusca = "";
    },
  },
};
</script>
