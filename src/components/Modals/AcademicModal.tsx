import { useEffect, useState } from "react";
import FileUploader from "../../utils/fileUploader";
import { Academic } from "../../types";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css"; // Estilos del editor

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
type MembershipType = 'honorary' | 'ordinary';

export const AcademicModal: React.FC<AcademicModalProps> = ({ isOpen, onClose, academic, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<MembershipType>('ordinary');
  const [cvMarkdown, setCvMarkdown] = useState('');
  const [decusActivitiesMarkdown, setDecusActivitiesMarkdown] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  useEffect(() => {
    if (academic) {
      setName(academic.name || '');
      setType(academic.type || 'ordinary');
      setCvMarkdown(academic.cvUrl || '');
      setDecusActivitiesMarkdown(academic.decusActivities || '');
      setPhotoUrls(academic.photoUrl || []);
    }
  }, [academic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const academicData: Academic = {
      id: academic?.id || "",
      name,
      type,
      cvUrl: cvMarkdown,
      decusActivities: decusActivitiesMarkdown,
      photoUrl: photoUrls,
    };

    onSave(academicData);
    onClose();
  };

  const handleAddPhoto = (url: string) => {
    setPhotoUrls((prev) => [...prev, url]);
  };
  const handleDeletePhoto = (url: string) => {
    setPhotoUrls(prev => prev.filter(p => p !== url))
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {academic ? 'Editar Académico' : 'Nuevo Académico'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primera fila: Nombre y tipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                onChange={(e) => setType(e.target.value as MembershipType)}
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
          </div>

          {/* Segunda fila: Subir fotos */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Fotos</label>
            <FileUploader 
              isImage 
              maxFiles={5}
              onUploadURL={handleAddPhoto} 
              onDeleteURL={handleDeletePhoto}
            />
          </div>

          {/* Tercera fila: CV en Markdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Curriculum Vitae</label>
            <MdEditor
              value={cvMarkdown}
              onChange={({ text }) => setCvMarkdown(text)}
              style={{ height: "200px" }}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            />
          </div>

          {/* Cuarta fila: Actividades en Markdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Actividades en DECUS</label>
            <MdEditor
              value={decusActivitiesMarkdown}
              onChange={({ text }) => setDecusActivitiesMarkdown(text)}
              style={{ height: "200px" }}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            />
          </div>

          {/* Botones */}
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