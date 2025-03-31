import React, { useEffect, useState } from 'react';
import { PlusCircle, Pencil, Trash2, Search } from 'lucide-react';
import type { Academic } from '../../types';
import { useAcademics } from '../../hooks/useAcademics';
import { AcademicModal } from '../../components/Modals/AcademicModal';


const AdminAcademics: React.FC = () => {
  const {
      getAcademics,
      createAcademic,
      updateAcademic,
      deleteAcademic
    } = useAcademics();
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [newAcademics, setNewAcademics] = useState<Academic[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAcademic, setSelectedAcademic] = useState<Academic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAcademics = await getAcademics();
      setAcademics(fetchedAcademics);
    };
    fetchData();
  }, [isUpload])
  
  const filteredAcademics = React.useMemo(() => {
    return academics.filter(academic =>
    academic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  }, [academics, searchTerm]);

  const handleOpenModal = (academic?: Academic) => {
    setSelectedAcademic(academic || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAcademic(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAcademic(id);
      setIsUpload((prev) => !prev);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleSave = async (newAcademics: Academic) => {
    if (selectedAcademic) {
      await updateAcademic(selectedAcademic.id,newAcademics);
    } else {
      await createAcademic(newAcademics);
    }
    setIsUpload((prev) => !prev);
    handleCloseModal();
  };
  console.log("filteredAcademics", filteredAcademics);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Académicos</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          onClick={() => handleOpenModal()}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nuevo Académico
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar académicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Académico</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAcademics.map((academic: Academic) => (
                    <tr key={academic.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={academic.photoUrl} alt={academic.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{academic.name}</div>
                            <div className="text-sm text-gray-500">{academic.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${academic.type === 'honorary' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{academic.type === 'honorary' ? 'Honorario' : 'Ordinario'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-4" onClick={() => handleOpenModal(academic)}>
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(academic.id)}>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AcademicModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} academic={selectedAcademic} />
    </div>
  );
};

export default AdminAcademics;
