<template>
  <table>
    <thead>
      <th>Nome</th>
      <th>Email</th>
      <th>Ações</th>
    </thead>
    <tbody>
      <tr v-for="item in usuarios" :key="item._id">
        <td>{{ item.nome }}</td>
        <td>{{ item.email }}</td>
        <td>
          <button @click="editar(item)" class="text">Editar</button>
          <button @click="remover(item)" class="text">Remover</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState } from "pinia";
import { useUsuarioStore } from "../../stores/usuarioStore";

export default {
  computed: {
    ...mapState(useUsuarioStore, ["usuarios"]),
  },
  methods: {
    editar(usuario) {
      const usuarioCopia = Object.assign({}, usuario);
      this.$emit("editar", usuarioCopia);
    },
    remover(usuario) {
      this.$emit("remover", usuario);
    },
  },
};
</script>
