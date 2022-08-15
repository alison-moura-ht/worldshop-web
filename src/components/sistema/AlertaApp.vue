<template>
  <div
    class="janela"
    :class="[{ erro: erro }, { sucesso: sucesso }]"
    v-show="exibir"
  >
    <p>{{ texto }}</p>
    <div class="flex flex-end">
      <button @click="fecharAlerta()" class="text">Fechar</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useAlertaStore } from "../../stores/alertaStore";

export default {
  computed: {
    ...mapState(useAlertaStore, ["exibir", "texto", "erro", "sucesso"]),
  },
  methods: {
    ...mapActions(useAlertaStore, ["fecharAlerta"]),
  },
};
</script>
<style scoped>
.janela {
  position: fixed;
  left: calc(50% - 150px);
  top: 30px;
  width: 300px;
  padding: 10px 20px;
  background-color: rgb(206, 206, 206);
  border-radius: var(--border-radius);
}
.sucesso {
  background-color: var(--primaria-clara);
}
.erro {
  background-color: var(--erro-claro);
  color: white;
}
.erro button.text {
  color: white;
} 
.erro button.text:hover {
  background-color: var(--erro);
  color: white;
}
</style>
