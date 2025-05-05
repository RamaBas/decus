import { useState, useRef, useEffect } from "react";
import { X, BookOpen, Info } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  indexBook: string;
  price: number;
  image: string;
};

type BookModalProps = {
  book: Book | null;
  open: boolean;
  onClose: () => void;
};

type TabType = "description" | "index";

export default function BookCardModal({ book, open, onClose }: BookModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("index");
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open || !book) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      {/* Contenedor blanco con ref para detectar clicks fuera */}
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()} // Previene que el click se propague al overlay
      >
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Imagen del libro */}
            <div className="lg:w-1/2 flex justify-center bg-gray-50 rounded-lg p-4">
              <img
                src={book.image}
                alt={`Tapa de ${book.title}`}
                className="max-h-[400px] object-contain shadow-md rounded"
              />
            </div>

            {/* Detalles del libro */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-500">Precio</h3>
                  <p className="text-2xl font-bold text-blue-600">${book.price}</p>
                </div>
              
                {/* Pestañas */}
                <div className="pt-2">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab("index")}
                        className={`py-2 px-3 flex items-center gap-2 text-sm font-medium rounded-t-lg transition-colors ${
                          activeTab === "index"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <BookOpen size={16} />
                        Índice
                      </button>
                      <button
                        onClick={() => setActiveTab("description")}
                        className={`py-2 px-3 flex items-center gap-2 text-sm font-medium rounded-t-lg transition-colors ${
                          activeTab === "description"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Info size={16} />
                        Descripción
                      </button>
                    </nav>
                  </div>
                  
                  {/* Contenido con scroll controlado */}
                  <div className="py-4 max-h-[300px] overflow-y-auto">
                    {activeTab === "description" ? (
                      <div className="text-gray-700 leading-relaxed pr-2">
                        {book.description}
                      </div>
                    ) : (
                      <div className="text-gray-700 whitespace-pre-line pr-2">
                        {book.indexBook}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}