import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { useActivities } from '../../hooks/useActivities';
import { Activity } from '../../types';
import { ActivityModal } from '../../components/Modals/ActivityModal';

const AdminActivities: React.FC = () => {
  const {
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity,
  } = useActivities();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        const fetchedNews = await getActivities();
        setActivities(fetchedNews);
      };
      fetchData();
    }, [isUpload])


  const activityTypes = [
    { value: 'course', label: 'Curso' },
    { value: 'conference', label: 'Conferencia' },
    { value: 'seminar', label: 'Seminario' },
    { value: 'concert', label: 'Concierto' },
    { value: 'video', label: 'Video' },
    { value: 'theater', label: 'Teatro' },
    { value: 'workshop', label: 'Taller' },
  ];  

  // Efecto para filtrar actividades cuando cambian los datos, búsqueda o tipo seleccionado
  useEffect(() => {
    if (activities) {
      const filtered = activities.filter((activity) => {
        const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || activity.type === selectedType;
        return matchesSearch && matchesType;
      });
      setFilteredActivities(filtered);
    }
    
  }, [activities, searchTerm, selectedType]);

  // Manejar la creación/edición de actividad
  const handleSave = async (newActivity: Activity) => {
    if (selectedActivity) {
      console.log("act upd")
      await updateActivity(newActivity.id, newActivity);
    } else {
      await createActivity(newActivity);
    }
    setShowModal(false);
    setIsUpload((prev) => !prev)
  };

  // Manejar la eliminación de actividad
  const handleDelete = async (activityId: string) => {
    await deleteActivity(activityId);
    setIsUpload((prev) => !prev)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Actividades</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          onClick={() => {
            setSelectedActivity(null);
            setShowModal(true);
          }}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nueva Actividad
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar actividades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Filter className="text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10"
          >
            <option value="all">Todos los tipos</option>
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => (
            <li key={activity.id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-600">
                  {activityTypes.find((type) => type.value === activity.type)?.label}
                </p>
                <p className="text-lg font-semibold text-gray-900">{activity.title}</p>
                <p className="mt-2 text-sm text-gray-500">{activity.description}</p>
              </div>
              <div className="flex space-x-4">
                <button className="text-green-600 hover:text-green-900" onClick={() => setSelectedActivity(activity) || setShowModal(true)}>
                  <Pencil className="h-5 w-5" />
                </button>
                <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(activity.id)}>
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
        
      {showModal && (
        <ActivityModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          activity={selectedActivity}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminActivities;
