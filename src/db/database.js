const STORAGE_KEY = 'calculos';

// Inicializar o storage se não existir
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

export const salvarCalculo = ({
  valorNota,
  tipoVenda,
  taxaAlienacao,
  valorTaxaAlienacao,
  valorTotal
}) => {
  const calculos = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const novoCalculo = {
    id: Date.now(),
    valor_nota: valorNota,
    tipo_venda: tipoVenda,
    taxa_alienacao: taxaAlienacao,
    valor_taxa_alienacao: valorTaxaAlienacao,
    valor_total: valorTotal,
    data_calculo: new Date().toISOString()
  };

  calculos.unshift(novoCalculo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calculos));
  return true;
};

export const obterHistorico = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

export const limparHistorico = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return true;
};