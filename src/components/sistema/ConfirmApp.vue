<template>
  <div class="bg" v-show="exibir">
    <div class="janela">
      <p>{{ texto }}</p>
      <div class="flex flex-end">
        <button @click="ok()">Ok</button>
        <button @click="cancelar()">Cancelar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useConfirmStore } from "../../stores/confirmStore";

export default {
  computed: {
    ...mapState(useConfirmStore, ["exibir", "texto"]),
  },
  methods: {
    ...mapActions(useConfirmStore, ["cancelar", "ok"]),
  },
};
</script>
<style scoped>
.bg {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.janela {
  width: 300px;
  padding: 10px 20px;
  background-color: var(--primaria);
  border-radius: var(--border-radius);
}
</style>
