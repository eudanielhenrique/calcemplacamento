import { useEffect } from 'react';
import useCalculadoraStore from '../store/calculadoraStore';

const Calculadora = () => {
  const {
    valorNota,
    tipoVenda,
    taxaAlienacao,
    valorTaxaAlienacao,
    valorTotal,
    detalhamento,
    setValorNota,
    setTipoVenda,
    setTaxaAlienacao,
    setValorTaxaAlienacao,
    calcularTotal,
    salvarCalculoAtual
  } = useCalculadoraStore();

  useEffect(() => {
    if (valorNota > 0) {
      calcularTotal();
    }
  }, [valorNota, tipoVenda, taxaAlienacao, valorTaxaAlienacao]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valorNota > 0) {
      salvarCalculoAtual();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculadora de Taxas</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="valorNota" className="block text-sm font-medium text-gray-700 mb-1">
              Valor da Nota Fiscal:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
              <input
                type="text"
                id="valorNota"
                value={valorNota ? valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  const numberValue = value ? parseFloat(value) / 100 : 0;
                  setValorNota(numberValue);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Venda</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value="direta"
                  checked={tipoVenda === 'direta'}
                  onChange={(e) => setTipoVenda(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Venda Direta (2%)</span>
              </label>
              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value="estoque"
                  checked={tipoVenda === 'estoque'}
                  onChange={(e) => setTipoVenda(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Venda Estoque (1%)</span>
              </label>
            </div>
          </div>

          <div className="p-3 border rounded-md hover:bg-gray-50">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={taxaAlienacao}
                onChange={(e) => {
                  setTaxaAlienacao(e.target.checked);
                  if (e.target.checked) {
                    setValorTaxaAlienacao();
                  }
                }}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="ml-2">Incluir Taxa de Alienação (R$ 140,00)</span>
            </label>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Valores Fixos Incluídos:</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Taxa de primeiro emplacamento: R$ 435,00</li>
            <li>• Placa: R$ 290,00</li>
            <li>• Honorários: R$ 200,00</li>
          </ul>
        </div>

        <div className="border rounded-md p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Detalhamento do Cálculo:</h3>
            {detalhamento && (
              <div className="space-y-2 mt-2">
                <p className="text-sm text-gray-600">
                  Taxa {tipoVenda === 'direta' ? 'Venda Direta (2%)' : 'Venda Estoque (1%)'}
                </p>
                <p className="text-sm text-gray-600">
                  • Valor mensal: R$ {detalhamento.taxaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600">
                  • Meses restantes: {detalhamento.mesesRestantes}
                </p>
                <p className="text-sm text-gray-600">
                  • Total da taxa: R$ {detalhamento.totalTaxaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="border-t border-gray-200 my-2"></div>
                <p className="text-sm text-gray-600">
                  • Taxa de emplacamento: R$ {detalhamento.taxaEmplacamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600">
                  • Valor da placa: R$ {detalhamento.valorPlaca.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600">
                  • Honorários: R$ {detalhamento.valorHonorarios.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                {taxaAlienacao && (
                  <p className="text-sm text-gray-600">
                    • Taxa de alienação: R$ {detalhamento.valorTaxaAlienacao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-medium text-gray-700">Valor Total:</h2>
              <p className="text-lg font-semibold text-gray-900">
                R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Salvar Cálculo
        </button>
      </form>
    </div>
  );
};

export default Calculadora;