import { defineStore } from "pinia";

export const useAlertaStore = defineStore("alerta", {
  state: () => ({
    exibir: false,
    sucesso: false,
    erro: false,
    texto: "",
  }),
  actions: {
    exibirAlerta(texto) {
      this.exibir = true;
      this.texto = texto;
    },
    exibirAlertaSucesso(texto) {
      this.sucesso = true;
      this.exibirAlerta(texto);
    },
    exibirAlertaErro(texto) {
      this.erro = true;
      this.exibirAlerta(texto);
    },
    fecharAlerta() {
      this.exibir = false;
      this.sucesso = false;
      this.erro = false;
    },
  },
});
