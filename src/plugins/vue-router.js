import { createRouter, createWebHistory } from "vue-router";
import routes from "./../routes";
import { useUsuarioStore } from "../stores/usuarioStore";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const store = useUsuarioStore();
  if (to.meta.auth) {
    try {
      const loginValido = await store.verificarUsuarioLogado();
      if (!loginValido) router.push({ name: "Login" });
    } catch (error) {
      router.push({ name: "Login" });
    }
  }
});

export default router;
