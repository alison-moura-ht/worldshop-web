import moment from "moment-timezone";

export function formataBRL(valor) {
  if (valor == NaN || typeof valor != "number") return "R$ 0,00";
  return valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function formataData(data) {
  const dataMoment = moment(data);
  return dataMoment.tz("America/Campo_Grande").format("DD/MM/YYYY");
}
