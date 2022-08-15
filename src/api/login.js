import { mande } from "mande";
import { useUsuarioStore } from "../stores/usuarioStore";
const api = mande("http://localhost:3000/auth");

function setToken() {
  const store = useUsuarioStore();
  api.options.headers["x-access-token"] = store.usuarioLogado.token;
}

export async function login(usuario) {
  try {
    return await api.post(usuario);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function validarToken() {
  try {
    setToken();
    return await api.get();
  } catch (error) {
    throw { message: error.body.message };
  }
}
