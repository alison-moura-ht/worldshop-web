import { mande } from "mande";
import { useUsuarioStore } from "./../stores/usuarioStore";

const api = mande("http://localhost:3000/usuarios");

function setToken() {
  const store = useUsuarioStore();
  api.options.headers["x-access-token"] = store.usuarioLogado.token;
}

export async function buscarTodosUsuarios() {
  try {
    setToken();
    return await api.get();
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function cadastrarUsuario(usuario) {
  try {
    setToken();
    return await api.post(usuario);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function atualizarUsuario(usuario) {
  try {
    setToken();
    return await api.put(usuario);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function removerUsuario(id) {
  try {
    return await api.delete(id)
  } catch (error) {
    throw { message: error.body.message }
  }
}