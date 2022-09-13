<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Produtos</h1>
      <button @click="abrirForm" v-show="!form">Novo</button>
    </div>
    <section class="form" v-show="form">
      <form-produto-app
        ref="form"
        @salvo="salvo"
        @cancelar="fecharForm"
      ></form-produto-app>
    </section>
    <section>
      <tabela-produto-app
        @editar="editar"
        @remover="remover"
      ></tabela-produto-app>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useProdutoStore } from "../stores/produtoStore";
import { useAlertaStore } from "../stores/alertaStore";
import { useConfirmStore } from "../stores/confirmStore";
import TabelaProdutoApp from "../components/produto/TabelaProdutoApp.vue";
import FormProdutoApp from "../components/produto/FormProdutoApp.vue";

export default {
  data: () => ({
    form: false,
  }),
  components: {
    TabelaProdutoApp,
    FormProdutoApp,
  },
  methods: {
    ...mapActions(useProdutoStore, ["buscarTodosProdutos", "removerProduto"]),
    ...mapActions(useAlertaStore, ["exibirAlertaErro", "exibirAlertaSucesso"]),
    ...mapActions(useConfirmStore, ["exibirConfirm"]),
    async carregarProdutos() {
      try {
        await this.buscarTodosProdutos();
      } catch (error) {
        this.exibirAlertaErro(error.message);
      }
    },
    abrirForm() {
      this.form = true;
    },
    fecharForm() {
      this.form = false;
    },
    salvo(error) {
      if (error) return this.exibirAlertaErro(error.message);
      this.form = false;
      this.carregarProdutos();
      this.exibirAlertaSucesso("Produto salvo com sucesso");
    },
    editar(produto) {
      this.form = true;
      this.$refs.form.editar(produto);
    },
    async remover(produto) {
      this.exibirConfirm("Tem certeza?", async () => {
        try {
          await this.removerProduto(produto._id);
          this.carregarProdutos();
        } catch (error) {
          this.exibirAlertaErro(error.message);
        }
      });
    },
  },
  mounted() {
    this.carregarProdutos();
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
