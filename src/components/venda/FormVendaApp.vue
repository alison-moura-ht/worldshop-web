<template>
  <form @submit.prevent="">
    <input
      v-model="venda.data"
      type="date"
      placeholder="Data da venda"
      disabled
    />
    <select v-model="venda.cliente">
      <option v-for="item in clientes" :key="item._id" :value="item._id">
        {{ item.nome }}
      </option>
    </select>
    <div class="flex flex-end" v-show="!itemForm">
      <button @click="abrirItemForm" type="button">Novo item</button>
    </div>
    <fieldset v-show="itemForm">
      <legend>Novo item</legend>
      <select
        @change="calcularSubTotal"
        placeholder="Produto"
        v-model="item.produto"
      >
        <option value="" selected>-- Selecione o produto</option>
        <option v-for="item in produtos" :key="item._id" :value="item">
          {{ item.descricao }}
        </option>
      </select>
      <input
        v-model="item.quantidade"
        @change="calcularSubTotal"
        type="number"
        placeholder="Quantidade"
      />
      <div class="flex space-between items-center">
        <span>
          <strong>Subtotal: </strong>{{ formataDecimal(item.subtotal) }}
        </span>
        <div>
          <button @click="fecharItemForm" type="button" class="text">
            Cancelar
          </button>
          <button @click="adicionarItem" type="button">Adicionar</button>
        </div>
      </div>
    </fieldset>
  </form>
  <section class="mb-20 mt-20">
    <table v-show="venda.itens.length > 0">
      <thead>
        <th>#</th>
        <th>Produto</th>
        <th>Quantidae</th>
        <th>Valor un.</th>
        <th>Ações</th>
      </thead>
      <tbody>
        <tr v-for="(item, i) in venda.itens" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.quantidade }}</td>
          <td>{{ formataDecimal(item.valorUnitario) }}</td>
          <td>
            <button @click="removerItem(i)" type="button" class="text">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <div>
    <span><strong>Total: </strong> {{ formataDecimal(venda.valorTotal) }}</span>
  </div>
  <div class="flex justify-center gap-10">
    <button @click="cancelar" type="button" class="text">Cancelar</button>
    <button @click="salvar" type="button">Salvar</button>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useClienteStore } from "./../../stores/clienteStore";
import { useUsuarioStore } from "../../stores/usuarioStore";
import { useProdutoStore } from "../../stores/produtoStore";
import { useVendaStore } from "../../stores/vendaStore";
import { formataBRL } from "../../utils/formatadorUtil";
import moment from "moment-timezone";

export default {
  data: () => ({
    venda: { valorTotal: 0, itens: [] },
    item: { quantidade: 1, subtotal: 0 },
    itemForm: false,
  }),
  computed: {
    ...mapState(useClienteStore, ["clientes"]),
    ...mapState(useUsuarioStore, ["usuarioLogado"]),
    ...mapState(useProdutoStore, ["produtos"]),
  },
  methods: {
    ...mapActions(useClienteStore, ["buscarTodosClientes"]),
    ...mapActions(useProdutoStore, ["buscarTodosProdutos"]),
    ...mapActions(useVendaStore, ["cadastrarVenda"]),
    cancelar() {
      this.$emit("cancelar");
    },
    abrirItemForm() {
      this.itemForm = true;
    },
    fecharItemForm() {
      this.itemForm = false;
    },
    calcularSubTotal() {
      this.item.subtotal =
        this.item.produto.valorUnitario * this.item.quantidade;
    },
    adicionarItem() {
      this.venda.valorTotal += this.item.subtotal;
      this.venda.itens.push({
        produto: this.item.produto._id,
        valorUnitario: this.item.produto.valorUnitario,
        descricao: this.item.produto.descricao,
        quantidade: this.item.quantidade,
      });
      this.item = { quantidade: 1, subtotal: 0 };
      this.itemForm = false;
    },
    removerItem(pos) {
      const itemRemovido = this.venda.itens.splice(pos, 1)[0];
      this.venda.valorTotal -=
        itemRemovido.valorUnitario * itemRemovido.quantidade;
    },
    async salvar() {
      try {
        await this.cadastrarVenda(this.venda);
        this.venda = { valorTotal: 0, itens: [] };
        this.$emit("salvo");
        this.iniciarVenda();
      } catch (error) {
        this.$emit("salvo", error);
      }
    },
    async iniciarVenda() {
      this.buscarTodosClientes();
      this.buscarTodosProdutos();
      this.venda.usuario = this.usuarioLogado._id;
      this.venda.data = moment(new Date())
        .tz("America/Campo_Grande")
        .format("YYYY-MM-DD");
    },

    formataDecimal(valor) {
      return formataBRL(valor);
    },
  },
  mounted() {
    this.iniciarVenda();
  },
};
</script>
