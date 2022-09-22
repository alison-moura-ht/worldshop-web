import { defineStore } from "pinia";
import {
  buscarTodasVendas,
  cadastrarVenda,
  cancelarVenda,
  buscarVendaPorId,
} from "../api/venda";

export const useVendaStore = defineStore("venda", {
  state: () => ({
    vendas: [],
  }),
  actions: {
    async buscarTodasVendas() {
      try {
        this.vendas = await buscarTodasVendas();
      } catch (error) {
        throw error;
      }
    },
    async buscarVendaPorId(id) {
      try {
        return await buscarVendaPorId(id);
      } catch (error) {
        throw error;
      }
    },
    async cadastrarVenda(venda) {
      try {
        return await cadastrarVenda(venda);
      } catch (error) {
        throw error;
      }
    },
    async cancelarVenda(venda) {
      try {
        return await cancelarVenda(venda);
      } catch (error) {
        throw error;
      }
    },
  },
});
