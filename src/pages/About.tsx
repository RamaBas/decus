import React from 'react';
import { Book, Users, History } from 'lucide-react';

const sections = [
  {
    title: 'Presentación',
    content: `La Biblioteca Académica DECUS es un espacio dedicado al conocimiento, la cultura y la investigación académica. 
    Nuestra misión es preservar y difundir el patrimonio cultural y académico, facilitando el acceso a recursos valiosos 
    para investigadores, estudiantes y amantes de la cultura.`,
    icon: Book
  },
  {
    title: 'Historia',
    content: `Fundada con el objetivo de promover la excelencia académica y la difusión cultural, DECUS ha sido testigo 
    y partícipe de importantes momentos en la vida académica de la región. Desde sus inicios, ha albergado una valiosa 
    colección de obras y ha sido sede de numerosos eventos culturales y académicos.`,
    icon: History
  },
  {
    title: 'Autoridades',
    content: `Nuestro equipo está compuesto por profesionales comprometidos con la excelencia académica y la difusión cultural. 
    Cada miembro aporta su experiencia y dedicación para mantener vivo el espíritu de DECUS y su misión educativa.`,
    icon: Users
  }
];

const About: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Quiénes Somos
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Conoce más sobre la Biblioteca Académica DECUS y su misión
        </p>
      </div>

      <div className="grid gap-12">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <section.icon className="h-8 w-8 text-indigo-600" />
                <h2 className="ml-4 text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;