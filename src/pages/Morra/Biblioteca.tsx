import React, { useState } from 'react';
import AlphabetFilter from '../../components/AlphabetFilter';
import bibliotecaMorra from '../../utils/bibliotecaMorra';

const Biblioteca: React.FC = () => {
    const [selectedLetter, setSelectedLetter] = useState("");

    // Función para normalizar texto (quitar acentos y diacríticos)
    const normalizeText = (text: string) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    };

    // Función para filtrar los libros según la letra seleccionada
    const filteredBooks = bibliotecaMorra.filter(book => {
        if (!selectedLetter) return true; // Si no hay letra seleccionada, mostrar todos
        
        const firstChar = book.data.trim()[0];
        const normalizedFirstChar = normalizeText(firstChar);
        
        // Para el caso del '#', mostrar los que no empiezan con letra
        if (selectedLetter === '#') {
            return !/[A-Za-z]/.test(normalizedFirstChar);
        }
        
        // Para letras normales, comparar la primera letra normalizada
        return normalizedFirstChar === selectedLetter;
    });

    return (
        <div className="space-y-8">
            <AlphabetFilter
                selectedLetter={selectedLetter}
                onLetterSelect={setSelectedLetter}
            />
            <div className="bg-white shadow rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Biblioteca Personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-5">
                                    <p className="mt-2 text-gray-600">{book.data}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">
                                {selectedLetter 
                                    ? `No existen libros para la letra "${selectedLetter}"`
                                    : "No hay libros disponibles"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <AlphabetFilter
                selectedLetter={selectedLetter}
                onLetterSelect={setSelectedLetter}
            />
        </div>
    )
};

export default Biblioteca;