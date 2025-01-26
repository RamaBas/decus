import { useEffect, useState } from "react";
import { useAcademics } from "../../hooks/useAcademics";

interface Academic {
  id?: string;
  name: string;
  type: string;
  cv_url: string;
  decus_activities: string;
  photo_url: string;
}

const academicTypes = [
  { value: 'honorary', label: 'Honorario' },
  { value: 'ordinary', label: 'Ordinario' },
];

interface AcademicModalProps {
  isOpen: boolean;
  onClose: () => void;
  academic?: Academic | null;
  onSave: (academic: Academic) => void;
}

export const AcademicModal: React.FC<AcademicModalProps> = ({ isOpen, onClose, academic, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [decusActivities, setDecusActivities] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (academic) {
      setName(academic.name || '');
      setType(academic.type || '');
      setCvUrl(academic.cv_url || '');
      setDecusActivities(academic.decus_activities || '');
      setPhotoUrl(academic.photo_url || '');
    }
  }, [academic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const academicData: Academic = {
      id: academic?.id || undefined,
      name,
      type,
      cv_url: cvUrl,
      decus_activities: decusActivities,
      photo_url: photoUrl,
    };

    onSave(academicData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {academic ? 'Editar Académico' : 'Nuevo Académico'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Seleccione un tipo</option>
              {academicTypes.map((academicOption) => (
                <option key={academicOption.value} value={academicOption.value}>
                  {academicOption.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">URL del CV</label>
            <input
              type="text"
              placeholder="https://cv-ejemplo.com"
              value={cvUrl}
              onChange={(e) => setCvUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Actividades DECUS</label>
            <textarea
              placeholder="Ingrese actividades relacionadas"
              value={decusActivities}
              onChange={(e) => setDecusActivities(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">URL de la Foto</label>
            <input
              type="text"
              placeholder="https://foto-ejemplo.com"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {academic ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
