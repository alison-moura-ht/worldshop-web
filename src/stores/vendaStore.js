import { defineStore } from "pinia";
import { buscarTodasVendas, cadastrarVenda } from "../api/venda";

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
    async cadastrarVenda(venda) {
      try {
        return await cadastrarVenda(venda);
      } catch (error) {
        throw error;
      }
    },
  },
});
