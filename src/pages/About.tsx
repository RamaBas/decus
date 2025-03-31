import React, { useState } from 'react';
import { Book, Users, History } from 'lucide-react';

// Definir el tipo de las secciones
interface Section {
  title: string;
  content: string; // El contenido es una cadena de texto con HTML
  icon: React.ComponentType<{ className?: string }>;
}

const sections: Section[] = [
  {
    title: 'Presentación',
    content: `La Fundación Decus procura instalarse y desarrollarse como una Fundación humanística, que irradie la claridad de una interpretación acorde con los requerimientos profundos de un saber interdisciplinario, una investigación holística y un servicio histórico, estético, cultural, que le permita integrarse a la fecunda trayectoria cultural y pedagógica de nuestra Patria.

Como Fundación humanística, pues, le competirá estudiar las fuentes de la cultura occidental, las artes y las ciencias, en su doble dimensión histórica y epocal, y en lo que atañe al beneficio o a la transformación e irradiación de sus manifestaciones, ya pasadas u hodiernas. En cuanto a la cultura intentará una visión de su morfología viviente; en cuanto a las artes tratará de recuperar el mensaje del pasado y la inspiración del presente. En cuanto a las ciencias intentará conocer el advenimiento de las teorías científicas y sus sucesivos y connaturales efectos en el mundo actual. Y sobre todo, interpretar la curva de ese ritmo, como una expresión de búsqueda y plenitud, sin desatender, desde luego, la transformación de ciencia en tecnología, según los lineamientos acontecidos en el último siglo.

La Fundación promoverá, asimismo, una investigación interdisciplinaria, de modo de no abandonar ninguna ladera del saber, pero en procura de una unificación o interrelación en el campo del hombre.

Tanto el estudio de aquellas fuentes complejas cuanto la investigación interdisciplinaria, mantendrán una constante aplicación a todas las esferas del quehacer pedagógico y docente argentino, intentando servir a la comunidad en el acto mismo de generar un trasiego cultural.

Aunque abierta a todos los horizontes generacionales, parece conveniente subrayar una especial referencia a los jóvenes, en una situación histórica de profundos cambios y de inevitables valoraciones constructivas y promotoras.

Como actividad especial, la Fundación Decus asume la tarea de recopilar y ordenar la obra humanística, teológica, política del doctor Carlos Alberto Disandro, sea inédita o publicada, tanto en nuestro país como en el exterior. Se establece, de esta manera, un marco orgánico institucional que custodie y difunda el pensamiento, la obra y las enseñanzas de quien hizo de su vida testimonio de Saber, compartiendo Cultura, Belleza y Verdad con sus discípulos y amigos.
`,
    icon: Book,
  },
  {
    title: 'Historia',
    content: `En 1956 Carlos A. Disandro fue despojado de todos sus cargos académicos por decisión de la Intervención en la Universidad Nacional de La Plata, establecida por el gobierno de facto surgido del golpe militar de 1955. Desde ese momento buscó dar continuidad a su labor humanística y académica, primero de modo itinerante, en casas de familia, salones parroquiales, salones de entidades gremiales o similares. Esta tarea congregó a un nutrido grupo de discípulos y amigos que organizaron, en 1957, el Centro Platense de Estudios Universitarios.

La tarea de dicho Centro de Estudios fue creciendo, y en 1965 Disandro fundó el Instituto de Cultura Clásica “Cardenal Cisneros” en recordación y homenaje del ilustre Cardenal español, promotor y fundador de la Universidad de Alcalá de Henares y propulsor de la edición de la Biblia Poliglota, entre otras memorables realizaciones.

La labor desarrollada a partir de 1965 se expandió. De ella nacieron otros Institutos de similares características y orientación humanística. En la Ciudad de Buenos Aires el Instituto de Cultura Clásica “Leopoldo Lugones” y en la ciudad de Córdoba el Instituto de Cultura Clásica “San Atanasio”, de los que Disandro fue el Asesor Académico.

Diversas causas motivaron la declinación de esas entidades. Por ello, en 1992 Disandro decidió continuar su tarea fundando las Cátedras Libres de Estudios Humanísticos, que dieron más flexibilidad y mejor articulación a sus cursos, seminarios, conferencias, etcétera.

Ese mismo año concibió la constitución de una nueva entidad: una fundación que recogiera –de modo institucional y organizado– el legado de tantos años de labor. Para dar impulso a esa nueva iniciativa redactó los documentos fundacionales y concibió el primer Plan Operativo Trienal requerido para su constitución.

Pero su repentino fallecimiento truncó esa iniciativa. No obstante, su familia y sus discípulos acordaron asumir el desafío de concretar ese último proyecto fundacional de Carlos Disandro.

La Fundación Decus se constituyó, como organización civil sin fines de lucro, el 5 de julio de 1994 y recibió su reconocimiento jurídico por parte de la Dirección Provincial de Personas Jurídicas de la Provincia de Buenos Aires (República Argentina) el 22 de noviembre del mismo año. Desde ese momento, hace más de veinte años, y sin interrupciones, cumple sus actividades en diversas ciudades de nuestro país.

Los interesados en acceder a una genuina cultura humanística interdisciplinaria encontrarán en esta página la información de todo lo realizado en estas dos largas décadas y también la información de las actividades que se programen en el futuro.
`,
    icon: History,
  },
  {
    title: 'Autoridades',
    content: `<p>
        <strong>FUNDADORES</strong>
        Prof. Sra. Francisca Notz de Disandro (†)
        Ing. Carlos Esteban Disandro (†)
        Ing. Jorge Marcos Disandro
      </p>
      <p>
        <strong>PRESIDENTE</strong>
        Ing. Jorge Marcos Disandro
      </p>
      <p>
        <strong>VICEPRESIDENTE</strong>
        Prof. María Isabel Disandro
      </p>
    `,
    icon: Users,
  },
];

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0); // Estado para controlar la sección activa

  // Obtener el ícono de la sección activa
  const IconComponent = sections[activeSection].icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Quiénes Somos</h1>
        <p className="mt-4 text-xl text-gray-500">
          Conoce más sobre la Fundación DECUS
        </p>
      </div>

      <nav className="bg-white shadow rounded-lg">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {sections.map((section, index) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(index)} // Cambia la sección activa al hacer clic
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  activeSection === index
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <section.icon className="h-5 w-5 mr-2" />
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
        <div className="flex items-center mb-6">
          <IconComponent className="h-8 w-8 text-green-600" /> {/* Usar el ícono correctamente */}
          <h2 className="ml-4 text-2xl font-bold text-gray-900">
            {sections[activeSection].title}
          </h2>
        </div>
        <div
          className="text-gray-600 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: sections[activeSection].content }} // Renderizar HTML
        />
      </div>
    </div>
  );
};

export default About;