import React, { useEffect, useState } from 'react';
import {  } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';
import { Calendar, BookOpen, Users, Mic, Landmark, Music, Video, Theater, Hammer, Globe } from 'lucide-react';
import { Activity } from '../types';
const Activities: React.FC = () => {
  const { getActivities, loading, error } = useActivities();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activities, setActivities] = useState<Activity[]>([]);

  const activityTypes = [
    { label: 'Todas', value: 'all', icon: Globe },
    { label: 'Cursos', value: 'course', icon: BookOpen },
    { label: 'Conferencias', value: 'conference', icon: Mic },
    { label: 'Seminarios', value: 'seminar', icon: Landmark },
    { label: 'Conciertos', value: 'concert', icon: Music },
    { label: 'Proyecciones', value: 'video', icon: Video },
    { label: 'Teatro Leído', value: 'theater', icon: Theater },
    { label: 'Talleres', value: 'workshop', icon: Hammer },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetchedNews = await getActivities();
      setActivities(fetchedNews);
    };
    fetchData();
  }, [])
  const filteredActivities = React.useMemo(() => {
    if (selectedType === 'all') return activities;
    return activities.filter(activity => activity.type === selectedType);
  }, [activities, selectedType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Actividades</h1>
        <p className="mt-4 text-xl text-gray-500">
          Descubra nuestros eventos culturales y académicos
        </p>
      </div>

      {/* Filtro por tipo de actividad */}
      <nav className="bg-white shadow rounded-lg">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {activityTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={
                  `flex items-center px-3 py-4 text-sm font-medium ${
                    selectedType === type.value
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-900'
                    }`
                  }
              >
                <type.icon className="h-5 w-5 mr-2" />
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Lista de actividades */}
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
                  <p className="mt-4 text-gray-500">{activity.description}</p>
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
