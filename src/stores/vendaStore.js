import { defineStore } from "pinia";
import { buscarTodasVendas } from "../api/venda";

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
  },
});
