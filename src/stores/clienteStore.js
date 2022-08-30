import { defineStore } from "pinia";
import {
  atualizarCliente,
  buscarClientePorId,
  buscarTodosClientes,
  cadastrarCliente,
  removerCliente,
} from "../api/cliente";

export const useClienteStore = defineStore("cliente", {
  state: () => ({
    clientes: [],
  }),
  actions: {
    async buscarTodosClientes() {
      try {
        this.clientes = await buscarTodosClientes();
      } catch (error) {
        throw error;
      }
    },
    async buscarClientePorId(id) {
      try {
        return await buscarClientePorId(id);
      } catch (error) {
        throw error;
      }
    },
    async cadastrarCliente(cliente) {
      try {
        return await cadastrarCliente(cliente);
      } catch (error) {
        throw error;
      }
    },

    async atualizarCliente(cliente) {
      try {
        return await atualizarCliente(cliente);
      } catch (error) {
        throw error;
      }
    },

    async removerCliente(id) {
      try {
        return await removerCliente(id);
      } catch (error) {
        throw error;
      }
    },
  },
});
