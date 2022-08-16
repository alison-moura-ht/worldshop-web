<template>
  <form>
    <input v-model="cliente.nome" type="text" placeholder="Nome do cliente" />
    <input
      v-model="cliente.email"
      type="email"
      placeholder="Email do cliente"
    />
    <input v-model="cliente.cpf" type="text" placeholder="CPF do cliente" />
    <input v-model="cliente.cep" type="text" placeholder="CEP do cliente" />
  </form>
  <div class="btns">
    <button @click="cancelar()" type="button" class="text">Cancelar</button>
    <button @click="salvar()" type="button">Salvar</button>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useClienteStore } from "../../stores/clienteStore";

export default {
  data: () => ({
    cliente: {},
  }),
  methods: {
    ...mapActions(useClienteStore, ["cadastrarCliente", "atualizarCliente"]),
    async salvar() {
      try {
        if (this.cliente._id) await this.atualizarCliente(this.cliente);
        else await this.cadastrarCliente(this.cliente);

        this.cliente = {};
        this.$emit("salvo");
      } catch (error) {
        this.$emit("salvo", error);
      }
    },
    cancelar() {
      this.cliente = {};
      this.$emit("cancelar");
    },
    editar(cliente) {
      this.cliente = cliente;
    },
  },
};
</script>
