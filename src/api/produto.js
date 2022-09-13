import { mande } from "mande";
import { useUsuarioStore } from "../stores/usuarioStore";

const api = mande("http://localhost:3000/produtos");

function setToken() {
  const store = useUsuarioStore();
  api.options.headers["x-access-token"] = store.usuarioLogado.token;
}

export async function buscarTodosProdutos() {
  try {
    setToken();
    return await api.get();
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function buscarProdutoPorId(id) {
  try {
    setToken();
    return await api.get(id);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function cadastrarProduto(produto) {
  try {
    setToken();
    return await api.post(produto);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function atualizarProduto(produto) {
  try {
    setToken();
    return await api.put(produto);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function removerProduto(id) {
  try {
    return await api.delete(id);
  } catch (error) {
    throw { message: error.body.message };
  }
}
