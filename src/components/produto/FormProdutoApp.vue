<template>
  <form>
    <input
      v-model="produto.descricao"
      type="text"
      placeholder="Descrição do produto"
    />
    <input
      v-model="produto.detalhes"
      type="text"
      placeholder="Detalhes do produto"
    />
    <input
      v-model="produto.valorUnitario"
      type="number"
      placeholder="Valor unitário"
    />
    <div class="btns">
      <button @click="salvar" type="button">Salvar</button>
      <button @click="cancelar" type="button">Cancelar</button>
    </div>
  </form>
</template>
<script>
import { mapActions } from "pinia";
import { useProdutoStore } from "../../stores/produtoStore";

export default {
  data: () => ({
    produto: {},
  }),
  methods: {
    ...mapActions(useProdutoStore, ["cadastrarProduto", "atualizarProduto"]),
    cancelar() {
      this.$emit("cancelar");
    },
    async salvar() {
      try {
        if (this.produto._id) await this.atualizarProduto(this.produto);
        else await this.cadastrarProduto(this.produto);
        this.produto = {};
        this.$emit("salvo");
      } catch (error) {
        this.$emit("salvo", error);
      }
    },
    editar(produto) {
      this.produto = produto;
    },
  },
};
</script>
