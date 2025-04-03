import { useEffect } from 'react';
import useCalculadoraStore from '../store/calculadoraStore';

const Historico = () => {
  const { historico, carregarHistorico, limparHistorico } = useCalculadoraStore();

  useEffect(() => {
    carregarHistorico();
  }, []);

  const formatarData = (data) => {
    return new Date(data).toLocaleString('pt-BR');
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Histórico de Cálculos</h2>
        {historico.length > 0 && (
          <button
            onClick={limparHistorico}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Limpar Histórico
          </button>
        )}
      </div>
      
      {historico.length === 0 ? (
        <p className="text-gray-600 text-center">Nenhum cálculo realizado ainda.</p>
      ) : (
        <div className="space-y-4">
          {historico.map((calculo) => (
            <div key={calculo.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Data do Cálculo:</p>
                  <p className="font-medium">{formatarData(calculo.data_calculo)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo de Venda:</p>
                  <p className="font-medium capitalize">{calculo.tipo_venda}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor da Nota:</p>
                  <p className="font-medium">{formatarValor(calculo.valor_nota)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor Total:</p>
                  <p className="font-medium text-blue-600">{formatarValor(calculo.valor_total)}</p>
                </div>
              </div>
              
              {calculo.taxa_alienacao && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Taxa de Alienação: {formatarValor(calculo.valor_taxa_alienacao)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historico;