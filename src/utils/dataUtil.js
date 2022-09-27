import moment from "moment-timezone";

export function getPrimeiroEUltimoDiaSemana() {
  const dataInicial = moment().startOf("week").format("yyyy-MM-DD");
  const dataFinal = moment().endOf("week").format("yyyy-MM-DD");
  return {
    dataInicial,
    dataFinal,
  };
}

export function getPrimeiroEUltimoDiaMes() {
  const dataInicial = moment().startOf("month").format("yyyy-MM-DD");
  const dataFinal = moment().endOf("month").format("yyyy-MM-DD");
  return {
    dataInicial,
    dataFinal,
  };
}
