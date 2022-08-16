import { mande } from "mande";
import { useUsuarioStore } from "../stores/usuarioStore";
const api = mande("http://localhost:3000/clientes");

function setToken() {
  const store = useUsuarioStore();
  api.options.headers["x-access-token"] = store.usuarioLogado.token;
}

export async function buscarTodosClientes() {
  try {
    setToken();
    return await api.get();
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function cadastrarCliente(cliente) {
  try {
    setToken();
    return await api.post(cliente);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function atualizarCliente(cliente) {
  try {
    setToken();
    return await api.put(cliente);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function removerCliente(id) {
  try {
    return await api.delete(id);
  } catch (error) {
    throw { message: error.body.message };
  }
}
