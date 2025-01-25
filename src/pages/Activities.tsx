import React, { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { useActivities } from '../hooks/useActivities'; // Asegúrate de importar el hook

const Activities: React.FC = () => {
  const { activities, loading, error } = useActivities(); // Llamar a useActivities para obtener las actividades
  const [selectedType, setSelectedType] = useState<string>('all');

  const activityTypes = [
    { value: 'course', label: 'Cursos' },
    { value: 'conference', label: 'Conferencias' },
    { value: 'seminar', label: 'Seminarios' },
    { value: 'concert', label: 'Conciertos' },
    { value: 'video', label: 'Proyecciones' },
    { value: 'theater', label: 'Teatro Leído' },
    { value: 'workshop', label: 'Talleres' },
  ];

  // Lógica para filtrar actividades por tipo
  const filteredActivities = React.useMemo(() => {
    if (selectedType === 'all') return activities;
    return activities.filter(activity => activity.type === selectedType);
  }, [activities, selectedType]);

  if (loading) {
    return <div>Loading...</div>; // Puedes mejorar este estado con un spinner o algo similar
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Actividades</h1>
        <p className="mt-4 text-xl text-gray-500">
          Descubra nuestros eventos culturales y académicos
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <Filter className="text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Todas las actividades</option>
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid gap-8">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {activity.multimediaUrl && (
                  <div className="md:flex-shrink-0">
                    <div className="h-48 w-full md:w-48 bg-gray-300">
                      <img
                        src={activity.multimediaUrl}
                        alt={activity.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                    {activityTypes.find(type => type.value === activity.type)?.label}
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-gray-900">
                    {activity.title}
                  </h2>
                  <div className="mt-2 flex items-center text-gray-500">
                    <Calendar className="h-5 w-5 mr-2" />
                    {new Date(activity.date).toLocaleDateString('es-AR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <p className="mt-4 text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron actividades</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
