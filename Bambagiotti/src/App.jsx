import { useState, useEffect } from 'react';
import { Menu, Home, Package, BarChart3, Settings, X } from 'lucide-react';
import { RiWaterPercentFill } from "react-icons/ri";
import { FaTemperatureFull } from "react-icons/fa6";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaWeightHanging } from "react-icons/fa";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifiche, setNotifiche] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configurazione RestDB.io
  const RESTDB_URL = 'https://clonedb1-7b36.restdb.io/rest/notifiche';
  const API_KEY = '2e1c9e05dd157fa74d69bfeab6b520b7c1e58'; // SOSTITUISCI con la tua API Key completa da RestDB.io

  // Carica le notifiche all'avvio
  useEffect(() => {
    fetchNotifiche();
  }, []);

  // Funzione per recuperare le notifiche
  const fetchNotifiche = async () => {
    try {
      setLoading(true);
      console.log('Chiamata API a:', RESTDB_URL);
      console.log('Con API Key:', API_KEY);
      
      const response = await fetch(RESTDB_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
          'cache-control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('Status:', response.status);
      const data = await response.json();
      console.log('Dati ricevuti:', data);
      
      setNotifiche(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Errore dettagliato:', error);
      console.error('Verifica: 1) CORS su RestDB.io 2) API Key corretta 3) Collezione esistente');
      // Usa dati di esempio in caso di errore
      setNotifiche([
        { _id: '1', not_titolo: 'Errore di connessione', not_dex: 'Verifica CORS e API Key su RestDB.io' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: Home, label: 'Logout', href: '#' },
    { icon: Package, label: 'Apiari', href: '#' },
    { icon: BarChart3, label: 'Statistiche', href: '#' },
    { icon: Settings, label: 'Impostazioni', href: '#' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-amber-600 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold whitespace-nowrap">Gestionale Arnia</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-amber-700 rounded p-1"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center px-6 py-3 hover:bg-amber-700 transition"
            >
              <item.icon size={20} className="mr-3" />
              <span className="whitespace-nowrap">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-amber-600 mr-4"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-amber-600">Dashboard</h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-xl font-semibold mb-4">La tua Arnia</h1>
              <p className="text-gray-600">
                Seleziona una voce dal menu laterale per iniziare a gestire le tue arnie, oppure clicca uno dei valori qui sotto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <a href="www.google.com" title="Umidità"><p className="text-3xl font-bold text-amber-600"><RiWaterPercentFill size={75}/>
</p></a>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <a href="www.google.com" title="Temperatura"><p className="text-3xl font-bold text-amber-600"><FaTemperatureFull  size={75}/>
</p></a>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <a href="www.google.com" title="Peso"><p className="text-3xl font-bold text-amber-600"><FaWeightHanging  size={75}/>
</p></a>
              </div>
            </div>

            {/* Box Storico Notifiche */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-lg">Storico Notifiche</h3>
              </div>
              <div className="h-96 overflow-y-auto p-4">
                {loading ? (
                  <p className="text-center text-gray-500">Caricamento...</p>
                ) : notifiche.length === 0 ? (
                  <p className="text-center text-gray-500">Nessuna notifica</p>
                ) : (
                  notifiche.map((notifica) => (
                    <div
                      key={notifica._id}
                      className="mb-3 p-4 border-l-4 rounded bg-gray-50 hover:bg-gray-100 transition"
                      style={{
                        borderLeftColor: '#3b82f6'
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{notifica.not_titolo}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notifica.not_dex}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow">
  <div className="p-4 border-b border-gray-200">
    <h3 className="font-semibold text-lg">Produzione Miele (kg)</h3>
  </div>
  <div className="p-6">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={[
          { mese: 'Gen', produzione: 20 },
          { mese: 'Feb', produzione: 25 },
          { mese: 'Mar', produzione: 35 },
          { mese: 'Apr', produzione: 50 },
          { mese: 'Mag', produzione: 75 },
          { mese: 'Giu', produzione: 90 },
          { mese: 'Lug', produzione: 85 },
          { mese: 'Ago', produzione: 70 },
          { mese: 'Set', produzione: 55 },
          { mese: 'Ott', produzione: 40 },
          { mese: 'Nov', produzione: 30 },
          { mese: 'Dic', produzione: 25 },
        ]}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mese" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="produzione" 
          stroke="#d97706" 
          strokeWidth={2}
          name="Produzione (kg)"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;