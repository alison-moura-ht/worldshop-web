import { defineStore } from "pinia";
import {
  atualizarProduto,
  buscarProdutoPorId,
  buscarTodosProdutos,
  cadastrarProduto,
  removerProduto,
} from "../api/produto";

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
    async buscarProdutoPorId(id) {
      try {
        return await buscarProdutoPorId(id);
      } catch (error) {
        throw error;
      }
    },
    async cadastrarProduto(produto) {
      try {
        await cadastrarProduto(produto);
      } catch (error) {
        throw error;
      }
    },
    async atualizarProduto(produto) {
      try {
        return await atualizarProduto(produto);
      } catch (error) {
        throw error;
      }
    },
    async removerProduto(id) {
      try {
        return await removerProduto(id);
      } catch (error) {
        throw error;
      }
    },
  },
});
