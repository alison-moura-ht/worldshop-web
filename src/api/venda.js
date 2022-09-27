import { mande } from "mande";
import { useUsuarioStore } from "../stores/usuarioStore";

const api = mande("http://localhost:3000/vendas");

function setToken() {
  const store = useUsuarioStore();
  api.options.headers["x-access-token"] = store.usuarioLogado.token;
}

export async function buscarTodasVendas() {
  try {
    setToken();
    return await api.get();
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function buscarVendaPorId(id) {
  try {
    setToken();
    return await api.get(id);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function buscarVendasPorIntervalo(dataInicial, dataFinal) {
  try {
    setToken();
    return await api.post(`/${dataInicial}/${dataFinal}`, {}, {});
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function cadastrarVenda(venda) {
  try {
    setToken();
    return await api.post(venda);
  } catch (error) {
    throw { message: error.body.message };
  }
}

export async function cancelarVenda(id) {
  try {
    setToken();
    return await api.delete(id);
  } catch (error) {
    throw { message: error.body.message };
  }
}
