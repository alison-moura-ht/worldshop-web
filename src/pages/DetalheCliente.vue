<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Detalhe do cliente</h1>
    </div>
    <section>
      <div>
        <strong>ID:</strong> <span>#{{ cliente._id }}</span>
      </div>
      <div>
        <strong>Nome:</strong> <span>{{ cliente.nome }}</span>
      </div>
      <div>
        <strong>Email:</strong> <span>{{ cliente.email }}</span>
      </div>
      <div>
        <strong>CPF:</strong> <span>{{ cliente.cpf }}</span>
      </div>
      <div>
        <strong>CEP:</strong> <span>{{ cliente.cep }}</span>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useClienteStore } from "../stores/clienteStore";
import { useAlertaStore } from "../stores/alertaStore";

export default {
  data: () => ({
    cliente: {},
  }),
  methods: {
    ...mapActions(useClienteStore, ["buscarClientePorId"]),
    ...mapActions(useAlertaStore, ["exibirAlertaErro"]),
  },
  async mounted() {
    try {
      this.cliente = await this.buscarClientePorId(this.$route.params.id);
      console.log(this.cliente);
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
