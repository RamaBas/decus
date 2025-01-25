import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, Search, Filter, Calendar } from 'lucide-react';
import { useActivities } from '../../hooks/useActivities';
import { Activity } from '../../types';

const AdminActivities: React.FC = () => {
  const {
    activities,
    createActivity,
    updateActivity,
    deleteActivity,
    loading,
    error,
  } = useActivities();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState<Activity>({
    id: '',
    title: '',
    description: '',
    type: 'course',
    date: new Date().toISOString(),
  });

  const activityTypes = [
    { value: 'course', label: 'Curso' },
    { value: 'conference', label: 'Conferencia' },
    { value: 'seminar', label: 'Seminario' },
    { value: 'concert', label: 'Concierto' },
    { value: 'video', label: 'Video' },
    { value: 'theater', label: 'Teatro' },
    { value: 'workshop', label: 'Taller' },
  ];

  const filteredActivities = activities?.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSave = async () => {
    if (selectedActivity) {
      await updateActivity(formValues);
    } else {
      await createActivity(formValues);
    }
    setShowModal(false);
  };

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setFormValues(activity);
    setShowModal(true);
  };

  const handleDelete = async (activityId: string) => {
    await deleteActivity(activityId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Actividades</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {
            setSelectedActivity(null);
            setFormValues({
              id: '',
              title: '',
              description: '',
              type: 'course',
              date: new Date().toISOString(),
            });
            setShowModal(true);
          }}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nueva Actividad
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar actividades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Filter className="text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Todos los tipos</option>
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredActivities?.map((activity) => (
            <li key={activity.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Calendar className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600">
                        {activityTypes.find((type) => type.value === activity.type)?.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {activity.title}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">{activity.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleEdit(activity)}
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(activity.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {new Date(activity.date).toLocaleDateString('es-AR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Create/Edit Activity */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{selectedActivity ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                id="title"
                type="text"
                value={formValues.title}
                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                id="description"
                value={formValues.description}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                id="type"
                value={formValues.type}
                onChange={(e) => setFormValues({ ...formValues, type: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {activityTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="datetime-local"
                id="date"
                value={formValues.date}
                onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {selectedActivity ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivities;
