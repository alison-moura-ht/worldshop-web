import { defineStore } from "pinia";
import { buscarTodosProdutos } from "../api/produto";

export const useProdutoStore = defineStore("produto", {
  state: () => ({
    produtos: [],
  }),
  actions: {
    async buscarTodosProdutos() {
      try {
        this.produtos = await buscarTodosProdutos();
      } catch (error) {
        throw error;
      }
    },
  },
});
