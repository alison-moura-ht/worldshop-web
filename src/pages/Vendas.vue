<template>
  <div class="main">
    <div class="flex items-center space-between">
      <h1>Vendas</h1>
      <button v-show="!form" @click="abrirForm">Novo</button>
    </div>
    <div class="mb-20">
      <label for="dataInicial" class="mr-10">Data inicial</label>
      <input
        id="dataInicial"
        v-model="dataInicial"
        class="mr-10"
        type="date"
        placeholder="Digite o nome, email ou CPF para buscar"
      />
      <label for="dataFinal" class="mr-10">Data final</label>
      <input
        id="dataFinal"
        v-model="dataFinal"
        class="mr-10"
        type="date"
        placeholder="Digite o nome, email ou CPF para buscar"
      />
      <button class="mr-10" @click="filtrarVendasSemana">Nesta semana</button>
      <button class="mr-10" @click="filtrarVendasMes">Neste mês</button>
      <button class="mr-10" @click="filtrarVendas">Buscar</button>
      <button class="text mr-10" @click="limparFiltro">Limpar</button>
      <button @click="gerarPDFVendas">Gerar PDF</button>
    </div>
    <section v-show="form">
      <form-venda-app @salvo="salvo" @cancelar="fecharForm"></form-venda-app>
    </section>
    <section class="form">
      <!-- tabela de vendas -->
      <tabela-venda-app ref="tabela" @cancelar="cancelar"></tabela-venda-app>
    </section>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useVendaStore } from "../stores/vendaStore";
import { useConfirmStore } from "../stores/confirmStore";
import TabelaVendaApp from "../components/venda/TabelaVendaApp.vue";
import FormVendaApp from "../components/venda/FormVendaApp.vue";
import { useAlertaStore } from "../stores/alertaStore";
import {
  getPrimeiroEUltimoDiaMes,
  getPrimeiroEUltimoDiaSemana,
} from "../utils/dataUtil";

export default {
  data: () => ({
    form: false,
    dataInicial: "",
    dataFinal: "",
  }),
  components: { TabelaVendaApp, FormVendaApp },
  methods: {
    ...mapActions(useAlertaStore, ["exibirAlertaErro"]),
    ...mapActions(useConfirmStore, ["exibirConfirm"]),
    ...mapActions(useVendaStore, [
      "buscarTodasVendas",
      "cancelarVenda",
      "pdfVendasPorIntervalo",
    ]),

    abrirForm() {
      this.form = true;
    },
    fecharForm() {
      this.form = false;
    },
    salvo() {
      this.fecharForm();
      this.buscarTodasVendas();
    },
    cancelar(venda) {
      this.exibirConfirm("Tem certeza?", async () => {
        try {
          await this.cancelarVenda(venda._id);
          this.buscarTodasVendas();
        } catch (error) {
          this.exibirAlertaErro(error.message);
        }
      });
    },
    filtrarVendas() {
      if (this.dataInicial && this.dataFinal) {
        this.$refs.tabela.filtrarVendas(this.dataInicial, this.dataFinal);
      } else {
        this.exibirAlertaErro("Informe o intervalo de datas para a busca");
      }
    },
    filtrarVendasSemana() {
      try {
        const { dataInicial, dataFinal } = getPrimeiroEUltimoDiaSemana();
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.$refs.tabela.filtrarVendas(this.dataInicial, this.dataFinal);
      } catch (error) {
        this.exibirAlertaErro(error.message);
      }
    },
    filtrarVendasMes() {
      try {
        const { dataInicial, dataFinal } = getPrimeiroEUltimoDiaMes();
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.$refs.tabela.filtrarVendas(this.dataInicial, this.dataFinal);
      } catch (error) {
        this.exibirAlertaErro(error.message);
      }
    },
    limparFiltro() {
      this.$refs.tabela.limparFiltro();
      this.dataInicial = "";
      this.dataFinal = "";
    },
    async gerarPDFVendas() {
      if (this.dataInicial && this.dataFinal) {
        const blob = await this.pdfVendasPorIntervalo(
          this.dataInicial,
          this.dataFinal
        );
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Relatório Vendas.pdf");
        document.body.appendChild(link);
        link.click();
      } else {
        this.exibirAlertaErro("Informe o intervalo de datas para gerar o PDF");
      }
    },
  },
  async mounted() {
    this.buscarTodasVendas();
  },
};
</script>
<style scoped>
.main {
  padding: 20px 60px;
}
</style>
