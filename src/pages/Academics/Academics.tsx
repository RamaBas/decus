import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Academic } from '../../types';
import { useAcademics } from '../../hooks/useAcademics';

const Academics: React.FC = () => {
  const { getAcademics, loading, error } = useAcademics();
  const [selectedType, setSelectedType] = useState<'all' | 'honorary' | 'ordinary'>('all');
  const [academics, setAcademics] = useState<Academic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAcademics = await getAcademics();
      setAcademics(fetchedAcademics);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAcademics = useMemo(() => {
    if (selectedType === 'all') return academics;
    return academics.filter((academic) => academic.type === selectedType);
  }, [academics, selectedType]);

  if (loading) return <p className="text-center text-gray-600">Cargando académicos...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Académicos</h1>
        <p className="mt-4 text-xl text-gray-500">Conoce a nuestros distinguidos académicos</p>
      </div>

      <div className="flex justify-center space-x-4">
        <button onClick={() => setSelectedType('all')} className={`px-4 py-2 rounded-md ${selectedType === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>Todos</button>
        <button onClick={() => setSelectedType('honorary')} className={`px-4 py-2 rounded-md ${selectedType === 'honorary' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>Honorarios</button>
        <button onClick={() => setSelectedType('ordinary')} className={`px-4 py-2 rounded-md ${selectedType === 'ordinary' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>Ordinarios</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Tipo</th>
              <th className="py-3 px-6 text-left">Actividades</th>
              <th className="py-3 px-6 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAcademics.map((academic) => (
              <tr key={academic.id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/academics/${academic.id}`, { state: { academic } })}>
                <td className="py-4 px-6 text-gray-900 font-semibold">{academic.name}</td>
                <td className="py-4 px-6 text-indigo-600 font-medium">{academic.type === 'honorary' ? 'Académico Honorario' : 'Académico Ordinario'}</td>
                <td className="py-4 px-6 text-gray-700">{academic.decusActivities?.substring(0, 18)}...</td>
                <td className="py-4 px-6">
                <button
                  onClick={() => navigate(`/academics/${academic.id}`, { state: { academic } })}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
                >
                  <Eye className="h-5 w-5" /> Ver
                </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Academics;