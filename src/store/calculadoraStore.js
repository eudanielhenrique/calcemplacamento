
import { create } from 'zustand';
import { salvarCalculo, obterHistorico, limparHistorico } from '../db/database';

const calcularMesesRestantes = () => {
  const hoje = new Date();
  return 12 - hoje.getMonth();
};

const useCalculadoraStore = create((set, get) => ({
  valorNota: 0,
  tipoVenda: 'direta',
  taxaAlienacao: false,
  valorTaxaAlienacao: 0,
  historico: [],
  valorTotal: 0,

  setValorNota: (valor) => set({ valorNota: parseFloat(valor) }),
  setTipoVenda: (tipo) => set({ tipoVenda: tipo }),
  setTaxaAlienacao: (valor) => set({ taxaAlienacao: valor }),
  setValorTaxaAlienacao: () => set({ valorTaxaAlienacao: 140.00 }),

  calcularTotal: () => {
    const { valorNota, tipoVenda, taxaAlienacao, valorTaxaAlienacao } = get();
    const mesesRestantes = calcularMesesRestantes();
    const taxaPercentual = tipoVenda === 'direta' ? 0.02 : 0.01;
    
    // Calcula a taxa mensal (2% ou 1% do valor da nota dividido por 12)
    const taxaMensal = (valorNota * taxaPercentual) / 12;
    // Calcula o total da taxa multiplicando pelo número de meses restantes
    const totalTaxaMensal = taxaMensal * mesesRestantes;
    
    // Valores fixos
    const taxaEmplacamento = 435.00;
    const valorPlaca = 290.00;
    const valorHonorarios = 200.00;
    
    // Calcula o total
    let total = totalTaxaMensal + taxaEmplacamento + valorPlaca + valorHonorarios;
    
    // Adicionar taxa de alienação fixa se marcada
    if (taxaAlienacao) {
      total += 140.00;
    }
    
    set({
      valorTotal: total,
      detalhamento: {
        taxaPercentual,
        mesesRestantes,
        taxaMensal,
        totalTaxaMensal,
        taxaEmplacamento,
        valorPlaca,
        valorHonorarios,
        valorTaxaAlienacao: taxaAlienacao ? valorTaxaAlienacao : 0
      }
    });
    
    return total;
  },

  salvarCalculoAtual: async () => {
    const state = get();
    const resultado = salvarCalculo({
      valorNota: state.valorNota,
      tipoVenda: state.tipoVenda,
      taxaAlienacao: state.taxaAlienacao,
      valorTaxaAlienacao: state.valorTaxaAlienacao,
      valorTotal: state.valorTotal
    });
    
    if (resultado) {
      const historico = obterHistorico();
      set({ historico });
    }
  },

  carregarHistorico: () => {
    const historico = obterHistorico();
    set({ historico });
  },

  limparHistorico: () => {
    limparHistorico();
    set({ historico: [] });
  }
}));

export default useCalculadoraStore;