import { defineStore } from "pinia";

export const useConfirmStore = defineStore("confirm", {
  state: () => ({
    exibir: false,
    texto: "",
    okFunc: undefined,
    cancelarFunc: undefined,
  }),
  actions: {
    exibirConfirm(texto, okFunc, cancelarFunc) {
      this.exibir = true;
      this.texto = texto;
      this.okFunc = okFunc;
      this.cancelarFunc = cancelarFunc;
    },
    cancelar() {
      if (this.cancelarFunc) this.cancelarFunc();
      this.exibir = false;
    },
    ok() {
      if (this.okFunc) this.okFunc();
      this.exibir = false;
    },
  },
});
