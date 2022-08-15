import { defineStore } from "pinia";
import { login } from "../api/login";
import {
  atualizarUsuario,
  buscarTodosUsuarios,
  cadastrarUsuario,
  removerUsuario,
} from "../api/usuario";
import { validarToken } from "../api/login";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    usuarioLogado: {},
    usuarios: [],
  }),
  actions: {
    async login(usuario) {
      try {
        this.usuarioLogado = await login(usuario);
        sessionStorage.setItem(
          "usuarioLogado",
          JSON.stringify(this.usuarioLogado)
        );
      } catch (error) {
        throw error;
      }
    },
    recuperarUsuarioLogado() {
      const usuarioLogado = sessionStorage.getItem("usuarioLogado");
      if (usuarioLogado) this.usuarioLogado = JSON.parse(usuarioLogado);
    },
    removerUsuarioLogado() {
      sessionStorage.removeItem("usuarioLogado");
    },
    async verificarUsuarioLogado() {
      if (this.usuarioLogado.token) {
        try {
          await validarToken();
          return true;
        } catch (error) {
          this.removerUsuarioLogado()
          throw error;
        }
      } else return false;
    },
    async buscarTodosUsuarios() {
      try {
        this.usuarios = await buscarTodosUsuarios();
      } catch (error) {
        throw error;
      }
    },

    async cadastrarUsuario(usuario) {
      try {
        return await cadastrarUsuario(usuario);
      } catch (error) {
        throw error;
      }
    },

    async atualizarUsuario(usuario) {
      try {
        return await atualizarUsuario(usuario);
      } catch (error) {
        throw error;
      }
    },

    async removerUsuario(id) {
      try {
        return await removerUsuario(id);
      } catch (error) {
        throw error;
      }
    },
  },
});
