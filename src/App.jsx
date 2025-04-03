import Calculadora from './components/Calculadora';
import Historico from './components/Historico';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Calculadora de Taxas Veiculares</h1>
          <p className="mt-2 text-lg text-gray-600">
            Calcule taxas para Venda Direta e Venda Estoque
          </p>
        </header>

        <div className="space-y-8 md:space-y-12">
          <Calculadora />
          <Historico />
        </div>
      </div>
    </div>
  )
}

export default App
