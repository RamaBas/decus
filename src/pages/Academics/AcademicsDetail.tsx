import React, { useState } from 'react';
import { Academic } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft, X, FileText, ClipboardList, Image as ImageIcon } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactMarkdown from 'react-markdown';

const AcademicDetail: React.FC = () => {
  const navigate = useNavigate();
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('cv'); // 'cv', 'activities', 'photos'

  const openCarousel = (index: number) => {
    setCurrentImageIndex(index);
    setShowCarousel(true);
  };

    // Datos de ejemplo (debes reemplazar con tus props reales)
    const academic: Academic = {
      id: '1',
      name: 'Dr. Juan Pérez',
      type: 'honorary',
      cvUrl: `EDUCACIÓN:
  1982: Doctor, Syracuse University.
  Tesis: “Los Milagros de Nuestra Señora  de Gonzalo de Berceo y la elaboración artística de las fuentes latinas.”
  Director: Dr. Reinaldo Ayerbe-Chaux.
  1970: Profesor en Letras, Universidad Nacional de La Plata.
  
  CARGOS ACADÉMICOS:
  2006: Universidad de Kentucky, Profesor.
  1991-2006: Universidad de Kentucky, Associate Professor.
  1987-1991: Universidad de Kentucky, Assistant Professor.
  1985-1987: Universidad de Auburn (Alabama), Assistant Professor.
  1984-1985: Findlay College (Ohio), Assistant Professor.
  1981-1984: Ohio State University, Instructor de español.
  1977-1979: State University of New York College en Oswego, Instructor de español.
  1975-1976: Ayudante alumno en la Universidad de Syracuse (New York).
  
  CARGOS EDITORIALES:
  2012: Miembro del Consejo Editorial de Revista de Literaturas Modernas, Universidad Nacional de Cuyo, Argentina.
  2011: Miembro del Consejo Editorial de Polifonía: Revista académica de estudios hispánicos, Austin Peay State University.
  2006: Miembro del Consejo Editorial de The Coastal Review, Georgia Southern University.
  2000-2003: Co-editor de Romance Quarterly.
  2001: Miembro del Consejo Editorial de Troianalexandrina, Universidad de Santiago de Compostela, España.
  2000: Editor de Romance Quarterly.
  1998-1999: Editor Asociado de Romance Quarterly.
  1993-2001: Miembro del Consejo Editorial de Cuadernos del Sur, Universidad Nacional del Sur, Bahía Blanca, Argentina.
  1972-1975: Secretario del Consejo Editorial de Español actual, OFINES, Madrid.
  
  PUBLICACIONES:
  
  Libros: 
  Las ideas geográficas y la imagen del mundo en la literatura española medieval. Madrid: Iberoamericana-Editorial Vervuert, 2012.
  
  Medea en la literatura española medieval. La Plata: Fundación Decus, 2005.
  
  Hacia una poética del relato didáctico: ocho estudios sobre El conde Lucanor. Chapel Hill: The University of North Carolina Press, 1989.
  
   Artículos:
  “Luz y oscuridad en la poesía de Horacio Castillo”. Estudios y homenajes hispanoamericanos IV. Eds. Efthimía Pandís Pavlakis, Haralambos Symeonidis, Slobodan Pajovic, Dimitrios Drosos, Viktoria Kritikou. Madrid: Ediciones Clásicas, 2016. 35-44.
  
  “Ávila y Granada en Impresiones y paisajes de Federico García Lorca”. Giralda (Boletín del Instituto Iberoamericano de Estudios Andalusíes) 2 (2014) 15-26.
  “Nueva mirada al medievalismo hispánico (segunda parte)”. Gramma 53 (2014) 165-90.
  
  “Nueva mirada al medievalismo hispánico (primera parte)”. Gramma 51 (2013) 169-93.
  “Sobre etnografía medieval: el Oriente de Marco Polo y Juan de Mandevilla”. Revista de Literaturas Modernas 42 (2012) 9-26.
  
  “De la lírica medieval a la moderna: tradicionalidad e individualidad en la poesía española”. Letras. Studia Hispanica Medievalia IX 65-66 (2012) I, 33-63.
  
  “Florencia Pinar: entre las convenciones poéticas y la voz personal”. Essays in Homage to John E. Keller. Ed. Roger Tinnell. Newark, Delaware: Juan de la Cuesta Hispanic Monographs, 2012. 49-66.
  
  “Centauros hispanomedievales”. Romance Philology 65 (2011) 9-42.
  
  “Catón frente a Julio César: historia y geografía en Lucano y Alfonso X”. Itinera: Homenaje al Dr. Alberto J. Vaccaro. Eds. Lía Galán-María Delia Buisel. La Plata: Centro de Estudios Latinos-Facultad de Humanidades y Ciencias de la Educación, 2011. 11-25.
  
  “Alfonso VI y Urraca en Toledo: de las crónicas a la novela”. Cuestiones de Historia Medieval. Ed. Gerardo Rodríguez. Buenos Aires: Facultad de Filosofía y Letras-Universidad Católica Argentina, 2011. II, 33-70.
  
  “Espacios y personajes en Enrique Fi de Oliva”. El olvidado encanto de “Enrique Fi de Oliva”: Homenaje a Alan D. Deyermond. Ed. Cristina González. New York: Hispanic Seminary of Medieval Studies, 2011. 143-58.
  
  “Espacios narrativos medievales: propuestas para su estudio”. “De ninguna cosa es alegre posesión sin compañía.” Estudios celestinescos y medievales en honor del profesor Joseph Thomas Snow. Ed. Devid Paolini. New York: Hispanic Seminary of Medieval Studies, 2010. II, 24-37.
  
  “La Argentina de Antígona Vélez”. En recuerdo de Beatriz Rabaza. Comedias, tragedias y leyendas grecorromanas en el teatro del siglo XX. Eds. Aurora López y Andrés Pociña. Granada: Universidad de Granada, 2009. 111-22.
  
  “Jerusalén: de la Gran conquista de ultramar a Pero Tafur”. La corónica 36 (2008) 59-73.
  
  “Trajano en la Estoria de Espanna de Alfonso X”. Auster 10/11 (2006) 119-41; Auster 12 (2007) 81-101.
  
  “El monólogo de Medea en la General Estoria de Alfonso X”. Revista Melibea 1-2 (2005) 13-18.
  
  “Estado actual sobre los estudios de narrativa”. Actas de las Primeras Jornadas: Literatura/ Crítica/ Medios: Perspectivas 2003. Eds. Ma. Amelia Arancet Ruda, Mariano García, Valeria Melchiorre y Ma. Lucía Puppo. Buenos Aires: Universidad Católica Argentina, 2004. CD-Rom.
  
  “Ciudad, campo y yermo en las vidas de santos de Gonzalo de Berceo”. Silos. Un milenio: Actas del Congreso Internacional sobre la Abadía de Santo Domingo de Silos. (Stvdia Silensia, XXVII). Ed. Blanca Acinas Lope. Santo Domingo de Silos: Universidad de Burgos-Abadía de Silos, 2003. III, 539-53.
  
  “Medea, la transgresora”. Noein 7 (2002) 71-90.
  
  “Los desafíos del postmodernismo a la narración histórica”. Hispanismo en la Argentina: en los portales del siglo XXI. Eds. César Eduardo Quiroga Salcedo et al. San Juan: Editorial Universidad Nacional de San Juan, 2002, I, 33-46.
  
  “Ruinas romanas y poesía española”. Auster 6/7 (2001-02) 85-111.
  
  “Peregrinos y cruzados a Jerusalén en la Gran Conquista de Ultramar”. Literatura y Cristiandad: Homenaje al profesor Jesús Montoya Martínez. Eds. Manuel José Alonso García, María Luisa Dañobeitia Fernández y Antonio Rafael Rubio Flores. Granada: Universidad de Granada, 2001. 497-511.
  
  “Alfonso VI en la Estoria de Espanna: retrato ejemplar y narración histórica”. Olivar 2 (2001) 11-25.
  
  “Medea, la destructora”. Troianalexandrina 1 (2001) 55-84.
  
  “Divus Titus: de Suetonio a Alfonso X”.  Auster 5 (2000) 87-112.
  
  “Medea y sus mundos posibles”. Revista de Poética Medieval 2 (1998) 49-77.
  
  “Godos, hunos y amazonas y los extremos del mundo en la obra de Alfonso X”. Caballeros, monjas y maestros en la Edad Media. Eds. Lillian von der Walde, Concepción Company, Aurelio González. México: Universidad Nacional Autónoma de México, 1996. 455-65.
  
  “Jerusalén en la obra de Alfonso X”. La corónica  24 (1996) 41-55.
  “África y los confines del mundo según la General Estoria”. Cuadernos del Sur  26 (1994-95) 37-47.
  
  “Para una poética del retrato medieval: Sisebuto en la Primera Crónica General”. Exemplaria Hispánica  2 (1992-93) 64-75.
  
  “Poética y sentido del Libro de los gatos”. Anuario Medieval  4 (1992) 21-48.
  
  “Inserción del exemplum  medieval en el Libro de buen amor”. Revista de Filología Española  70 (1990) 119-32.
  
  “Ascenso y caída del reino visigodo según la Primera Crónica General”. Hispanófila  96 (1989) 1-11.
  
  “Hacia una poética del discurso histórico: la rebelión de Paulo en la Estoria de Espanna”. Iberoromania  29 (1989) 1-14.
  
  “De nuevo sobre la originalidad de los ejemplos en el Libro de buen amor”. Proceedings of the 38th Annual Mountain Interstate Foreign Language Conference. Knoxville: The University of Tennessee, 1989. 107-14.
  
  “Descripción ‘realista’ y sentido del ejemplo 4 de El conde Lucanor”. Revista de Estudios Hispánicos  22 (1988) 15-29.
  
  “El conde Lucanor, ejemplo 36: (el autor), (la realidad), el texto”. Revista canadiense de estudios hispánicos  11 (1987) 461-75.
  
  “Descripción de Sevilla en la Estoria de Espanna  (capítulos 1127-28)”. La corónica 16 (1987) 67-80.
  
  “El conde Lucanor, ejemplo 37: estudio de sus campos léxicos”. Cahiers de Linguistique Hispanique Médiévale  12 (1987) 49-62.
  
  “Hacia una revisión del realismo medieval (El conde Lucanor, ejemplo 46)”. Lexis  9 (1985) 31-59.
  
  “El milagro de Teófilo: hacia un (nuevo) concepto de los personajes de Berceo”. Helicon  8 (1983) 48-55.
  
  “Vida activa y vida contemplativa según Don Juan Manuel”. Románica 6 (1973) 13-16.
   
  Artículos en prensa:
  “‘Qué bonita labradora / matadora’: representaciones  de las campesinas en la lírica popular hispánica”. Melibea (Universidad Nacional de Cuyo, Mendoza).
  
  “The frontiers of David Cureses’ La frontera”. The Oxford Handbook of Greek Drama in the Americas. Oxford: Oxford University Press.
  
  “The Construction of Space and Place in the Narrative: Cuento del enperador Carlos Maynes de Roma e de la buena enperatris Seuilla, su mugier”. Charlemagne and His Legend in Early Spanish Literature and Historiography. Eds. Matthew Bailey and Ryan D. Giles. Boydell and Brewer. 89-122.
  
  “Antigone, Medea, and civilization and barbarism in Spanish American History”. A Handbook to the Reception of Greek Drama. Wiley & Sons.
  
  “La meseta castellana: del paisaje al problema”. Castilla bajo la mirada extraña: hacia un imaginario cultural.
  
  “El discurso geográfico de Marco Polo”. Homenaje al profesor Edward Stanton. Delaware: Juan de la Cuesta.
  
  “Juan José Saer y los límites de la narratividad”. Amoxcalli (Benemérita Universidad Autónoma de Puebla).
  
  “The Leyenda de la condesa traidora: old problems, new readings?” A Companion to the Other Medieval Spanish Epic. Brill Publishers.
   
  Reseñas:
  Salvador García Castañeda, coord., Literatura de viajes. El Viejo Mundo y el Nuevo (Madrid: Editorial Castalia-Ohio State University, 1999). Romance Quarterly 50 (2004) 78-79.
  
  Eloísa Palafox, Las éticas del exemplum: Los Castigos del rey don Sancho IV, El conde Lucanor y el Libro de buen amor (México: Universidad Nacional Autónoma de México, 1998). La corónica 29 (2000) 267-73.
  
  Paula Olinger, Images of Transformation in Traditional Hispanic Poetry (Newark, Delaware: Juan de la Cuesta Monographs, 1985). South Atlantic Review 53 (1988) 11-13.
  
  Edith Randman Rogers, The Perilous Hunt: Symbols in Hispanic and European Balladry  (Lexington: The University Press of Kentucky, 1980). Mentalities/ Mentalités 1 (1983) 42.
  
  El Arcipreste de Hita: Actas del Congreso Internacional sobre el Arcipreste de Hita  (Barcelona: SERESA, 1973) and Arcipreste de Hita, Libro de buen amor, glosario de la edición crítica de M. Criado de Val, E. W. Naylor y J. García Antezana (Barcelona: SERESA, 1972). Cuadernos Hispanoamericanos 286 (1974) 229-36.
  `,
      photoUrl: [
        'https://placehold.co/800x600',
        'https://placehold.co/800x600',
        'https://placehold.co/800x600'
      ],
      decusActivities: `SEMINARIOS: 
  AÑO 2018:
  
  Vivir en la llanura: la casa en la pampa.
  Dictado por el Dr. Aníbal A. Biglieri (Universidad de Kentucky), se desarrolló en dos sesiones los días 22 y 23 de junio de 2018, en la Sala Polivalente del Pasaje “Dardo Rocha”, de la ciudad de La Plata.
   
  AÑO 2017:
  
  La Plata:
  
  La Puna de Héctor Tizón. Regionales naturales, espacios y regiones.
  Dictado por el Dr. Aníbal A. Biglieri (Universidad de Kentucky), se desarrolló en dos sesiones los días 20¿9 y 30 de mayo de 2017, en la Sala Polivalente del Pasaje “Dardo Rocha”, de la ciudad de La Plata.
   
  AÑO 2016:
  
  La Plata:
  
  La representación de la pampa argentina en los textos literarios de los siglos XIX a XXI.
  Dictado por el Dr. Aníbal A. Biglieri (Universidad de Kentucky), se desarrolló en tres sesiones entre los días 4 y 6 de agosto de 2016 en la Sala Polivalente del Pasaje “Dardo Rocha”, de acuerdo al siguiente programa:
  
  Primera sesión: ¿Qué es una región? – Geografía de la pampa – La pampa percibida.
  Segunda sesión: Ideología de la pampa – La pampa concebida.
  Tercera sesión: Historia de la pampa – La pampa vivida – La sociedad pampeana.
   
  AÑO 2008:
  
  La Plata:
  
  La interpretación de los textos.
  Se desarrolló en tres sesiones entre los días 16 y 18 de julio de 2008 en el Auditorio de la Biblioteca Central de la Provincia de Buenos Aires, de acuerdo al siguiente programa:
  
  Primera sesión: Interpretación de los textos históricos.
  Segunda sesión: Interpretación de los textos poéticos.
  Tercera sesión: Interpretación de los textos evangélicos.
  
  
  CONFERENCIAS:
  
  Tema: Federico García Lorca y las vanguardias.
  Lugar: Sede del Palacio Francisco López Merino, La Plata, 2016.
  Organizada conjuntamente con la Cátedra Libre de Estudios Andaluces de la Universidad Nacional de La Plata.
  
  Tema: Historia, narración, relato.
  Lugar: Sede de la Fundación Decus, La Plata, 2014.
  
  Tema: Historia, narración, relato.
  Lugar: Sede de la Fundación Decus, Córdoba, 2012.
  
  Tema: Cosmopolitismo, globalización e identidad nacional: preguntas para un bicentenario.
  Lugar: Auditorio de la Biblioteca Central de la Provincia de Buenos Aires, 2010.
  
  Tema: Actualidad de los estudios medievales ¿vigencia o caducidad?
  Lugar: Auditorio del Archivo y Museo “Arturo Jauretche”, Buenos Aires, 2008.
  
  Tema: Narrativa y realidad.
  Lugar: Auditorio de la Biblioteca Central de la Provincia de Buenos Aires y se repitió en el Auditorio del Hotel Sheltown, Buenos Aires, 2004.
  
  Tema: La amistad en la Antigüedad clásica y en la Edad Media.
  Lugar: Sala de Lectura de la Biblioteca Central de la Provincia de Buenos Aires, 2003.
  
  Tema: La crisis del siglo XIV y los orígenes de la modernidad.
  Lugar: Sala Polivalente del Pasaje Dardo Rocha, dependiente de la Municipalidad de la ciudad de La Plata y se repitió en el Auditorio del Archivo y Museo “Arturo Jauretche”, Buenos Aires, 2002.
  
  Tema: La ciudad medieval.
  Lugar: Sala Polivalente del Pasaje Dardo Rocha, dependiente de la Municipalidad de la ciudad de La Plata, organizada con el Instituto Cultural Argentino Heleno, 2001.
   
  PUBLICACIONES:
  
  Libro:
  Medea en la literatura española medieval. La Plata, Fundación Decus, Colección “Mnemosyne”, 2005.
  
  Artículo en la Revista Noein:
  “Medea, la transgresora”, n° 7, La Plata, 2002, pág. 71-90
  
      `,
      specialty: 'Literatura Clásica',
      email: 'juan.perez@universidad.edu',
      phone: '+54 9 1234-5678',
      faculty: 'Facultad de Humanidades'
    };

  const tabs = [
    { id: 'cv', name: 'CV', icon: FileText },
    { id: 'activities', name: 'Actividades en DECUS', icon: ClipboardList },
    { id: 'photos', name: 'Fotos', icon: ImageIcon },
  ];

  return (
    <div className="bg-gray-50 p-8">
      {/* Botón Volver */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver a Académicos
      </button>

      {/* Nombre del académico */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{academic.name}</h1>

      {/* Menú de pestañas */}
      <nav className="bg-white shadow rounded-lg mb-8">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido de las pestañas */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Pestaña CV */}
        {activeTab === 'cv' && (
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Curriculum Vitae</h2>
            <ReactMarkdown>
              {academic.cvUrl || 'No se ha proporcionado información del CV'}
            </ReactMarkdown>
          </div>
        )}

        {/* Pestaña Actividades */}
        {activeTab === 'activities' && (
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Actividades en DECUS</h2>
            <ReactMarkdown>
              {academic.decusActivities || 'No se registran actividades específicas'}
            </ReactMarkdown>
          </div>
        )}

        {/* Pestaña Fotos */}
        {activeTab === 'photos' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Galería de Fotos</h2>
            {academic.photoUrl.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {academic.photoUrl.map((url, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-pointer" 
                    onClick={() => openCarousel(index)}
                  >
                    <img
                      src={url}
                      alt={`${academic.name} ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-95"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-semibold">
                        Ver imagen
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay fotos disponibles</p>
            )}
          </div>
        )}
      </div>

      {/* Popup del carrusel */}
      {showCarousel && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowCarousel(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="max-w-4xl w-full">
            <Carousel
              selectedItem={currentImageIndex}
              showThumbs={false}
              infiniteLoop
              renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
                <button
                  onClick={clickHandler}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-white hover:text-gray-300 ml-4"
                >
                  <ChevronLeft className="h-12 w-12" />
                </button>
              )}
              renderArrowNext={(clickHandler, hasNext) => hasNext && (
                <button
                  onClick={clickHandler}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-white hover:text-gray-300 mr-4"
                >
                  <ChevronRight className="h-12 w-12" />
                </button>
              )}
            >
              {academic.photoUrl.map((url, index) => (
                <div key={index} className="h-[80vh]">
                  <img
                    src={url}
                    alt={`${academic.name} ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicDetail;