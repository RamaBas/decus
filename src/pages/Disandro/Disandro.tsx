import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Book, Music, Image, FileText, Briefcase } from 'lucide-react';
import Books from './Biblioteca';
import Discoteca from './Discoteca';

const DisandroLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const sections = [
    { name: 'Trayectoria Académica', path: '/disandro', icon: FileText },
    { name: 'Biblioteca', path: '/disandro/library', icon: Book },
    { name: 'Discoteca', path: '/disandro/music', icon: Music },
    { name: 'Trabajos', path: '/disandro/works', icon: Briefcase },
    { name: 'Galería', path: '/disandro/gallery', icon: Image },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Carlos A. Disandro</h1>
      </div>

      <nav className="bg-white shadow rounded-lg">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.path}
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  location.pathname === section.path
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <section.icon className="h-5 w-5 mr-2" />
                {section.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
};

const TrayectoriaAcademica: React.FC = () => (
  <div className="bg-white shadow rounded-lg p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">CARLOS ALBERTO DISANDRO</h1>
        <p className="text-xl text-gray-600">(1919-1994)</p>
      </header>

      <section className="prose lg:prose-lg mx-auto">
        <p className="mb-6">
          Entre las figuras más destacadas en el ámbito de los estudios clásicos en la República Argentina, Carlos Alberto Disandro es, al mismo tiempo, una de las más fecundas y prolíficas como así también una de las más controvertidas.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Primeros años y formación</h2>
        <p>
          Nació en la ciudad de Córdoba el 2 de junio de 1919, aunque vivió su niñez y adolescencia en la cercana localidad de Alta Gracia. Cursó sus estudios de Bachiller, orientación Humanística, en el Colegio Monserrat, dependiente de la Universidad Nacional de Córdoba, donde compartió aula –entre otros destacados condiscípulos– con José Antonio Balseiro, luego destacado Doctor en Física internacionalmente reconocido. Sus primeras aproximaciones al mundo clásico se deben a la labor de sus maestros de entonces, el RP Francisco Vera Vallejos y el doctor Luis G. Martínez Villada.
        </p>
        <p>
          Egresó en diciembre de 1938 con las más altas calificaciones, lo que le valió ser distinguido con el Premio "Ignacio Duarte Quirós". De 1937 data la primera conferencia dictada por Disandro: Aspectos de la cultura medieval, posteriormente publicada en 1939 en la Revista del Ateneo del Monserrat. Este primer trabajo vio su primera edición en la Colección "Alétheia", de la Fundación Decus, n° 1, La Plata, 2023.
        </p>
        <p>
          Tanto Disandro como Balseiro fueron inicialmente becados para realizar sus estudios universitarios en Europa (Francia el primero, Inglaterra el segundo) desde comienzos de 1939. Pero las conmociones que aquejaban a Europa y la inminencia del estallido de la Segunda Guerra Mundial frustraron ese proyecto.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Formación académica</h2>
        <p>
          En consecuencia, ambos eligen la ciudad de La Plata, capital de la provincia de Buenos Aires, a donde arribaron el 1º de mayo de 1939. Disandro completó sus estudios de grado en la Facultad de Humanidades y Ciencias de la Educación dependiente de la Universidad Nacional de La Plata, obteniendo el título de Profesor en Letras (diciembre de 1942), e inmediatamente completó su postgrado, obteniendo el título de Doctor en Letras con su tesis La poesía de Lucrecio, bajo la dirección académica del Dr. Enrique François (posteriormente Decano de la Facultad de Filosofía y Letras de la Universidad de Buenos Aires) y rendida en abril de 1946. Recibió su diploma de Doctor en Letras otorgado por la Universidad Nacional de La Plata el 20 de mayo de 1947.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Trayectoria académica</h2>
        <p>
          Radicado en la ciudad de La Plata, comenzó tempranamente su tarea docente y académica. Fue Profesor de Lengua Castellana y de Literatura Universal en el Colegio Nacional "Rafael Hernández", dependiente de la UNLP de manera ininterrumpida desde 1944 hasta 1978, y de manera discontinua desde 1979 hasta 1985. En la Facultad de Humanidades y Ciencias de la Educación realizó su cursus honorum académico, desempañándose sucesivamente como Ayudante Alumno, Ayudante Diplomado, Jefe de Trabajos Prácticos, Profesor Adjunto y, finalmente, Profesor Titular por concurso (desde 1948) de la Cátedra Lengua y Cultura Latinas I y II, habiendo sido además Profesor Titular de la cátedra de Filología.
        </p>
        <p>
          Desde 1956 y hasta 1967 se desempeñó también como Profesor en el Instituto del Profesorado de Educación Católica (Buenos Aires) y en el Instituto del Profesorado "Juan N. Terrero" (La Plata).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Cargos académicos</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Consejero Académico en la Facultad de Humanidades y Ciencias de la Educación de la UNLP entre 1948 y 1950.</li>
          <li>Director del Instituto de Lenguas Clásicas de la Facultad de Humanidades y Ciencias de la Educación de la UNLP entre 1952 y 1956.</li>
          <li>Jefe del Departamento de Lenguas Clásicas en la misma Facultad en el período 1974-1977.</li>
          <li>Director del Instituto de Filología en la misma Facultad desde 1978 y hasta su retiro de la Universidad en 1985.</li>
          <li>Jefe del Departamento de Letras en la Facultad de Filosofía y Letras de la Universidad de Buenos Aires, entre 1974 y 1976.</li>
          <li>Jefe del Departamento de Letras en el Instituto "Terrero", entre 1960 y 1967.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Vínculos académicos e internacionales</h2>
        <p>
          Mantuvo vínculos académicos y fue colaborador, en diversas oportunidades, con las áreas de Lenguas Clásicas, de diversas Universidades argentinas: Nacional de Cuyo (Mendoza), Nacional de Tucumán, Nacional del Nordeste (Resistencia – Chaco), Nacional de Córdoba, entre otras.
        </p>
        <p>
          Fue, asimismo, uno de los impulsores de los Simposios Nacionales de Estudios Clásicos, participando como expositor o como invitado especial en diversas de sus ediciones. De la misma manera participó de la creación de la Asociación Argentina de Estudios Clásicos, siendo su Secretario de Relaciones Internacionales, hasta su renuncia.
        </p>
        <p>
          En el ámbito internacional fue colaborador y coordinador de las Semanas de Estudios Romanos, organizadas por la Facultad de de Letras e Historia de la Universidad Católica de Valparaíso (Chile) entre los años 1974 y 1982, a cuyas sesiones llevó siempre la representación oficial de las Universidades de La Plata y de Buenos Aires. Asimismo fue inspirador de la creación del Centro de Estudios Clásicos de la Universidad Metropolitana de Ciencias de la Educación de Santiago de Chile, y colaboró con su Fundadora y Directora, Dra. Giuseppina Grammatico Amari en la organización y realización de los Encuentros Nacionales e Internacionales de Estudios Clásicos.
        </p>
        <p>
          Finalmente debe destacarse su vínculo y colaboración con el Programa conjunto de las Universidades de Tübingen (Alemania) y Boston (Estados Unidos), dirigido por los Doctores Wolfgang Hasse y Meyer Reinhold, dedicado a la Tradición Clásica y su trasiego a América, con motivo del V Centenario del Descubrimiento de América.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Actividad extracadémica</h2>
        <p>
          En 1956, como consecuencia de las conmociones políticas sufridas en la República Argentina fue arbitrariamente privado de su cátedra universitaria, que quedó vacante durante diez años. Ello motivó que organizara sus actividades docentes y académicas en ámbitos extra-universitarios, constituyendo primero el Centro Platense de Estudios Universitarios, que devino en 1965 en el Instituto de Cultura Clásica "Cardenal Cisneros" (La Plata). Posteriormente, y como consecuencia natural de estas actividades, fundará dos Institutos más: el Instituto de Cultura Clásica "Leopoldo Lugones" (Buenos Aires) y el Instituto de Cultura Clásica "San Atanasio" (Córdoba) desde donde suscitó numerosas vocaciones humanísticas mediante una labor incesante de cursos, seminarios y conferencias sobre un muy amplio arco de temas humanísticos, culturales, artísticos, teológicos, etcétera, muchos de los cuales, previa elaboración definitiva, dieron origen de numerosos libros y publicaciones. Estas actividades extra-universitarias se mantuvieron incluso luego de ser reincorporado a la Universidad Nacional de La Plata a partir del año 1967.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Obra y legado</h2>
        <p>
          Su vasta obra, articulada en libros, cursos, traducciones, seminarios, artículos, etcétera, en número que supera los trescientos títulos, ciertamente de diversa jerarquía y densidad, reconoce como centro significante sus estudios del Filología Griega y Latina, aunque se prolonga luego a diversos aspectos de la Filología Románica, de la Filología Germánica y de los Estudios Patrísticos, sin descuidar lo que para Disandro fue ciertamente determinante: la obra de los grandes poetas, independientemente de la lengua en la que escribieran. A lo largo de ella se hace patente un estilo, con esquemas y particiones novedosas y reveladoras, y un lenguaje propio, crecientemente complejo a medida que se recorre su obra siguiendo la curva cronológica de su elaboración.
        </p>
        <p>
          En síntesis, su concepción de los estudios humanísticos fue totalizadora, holística, y según este enfoque, inculcó en sus discípulos y seguidores el estímulo por el estudios de las lenguas clásicas, de la literatura e historia griegas y latinas, de la poesía en general, de la filosofía del lenguaje, del arte, etcétera.
        </p>
        <p>
          Falleció en la localidad de Alta Gracia, Córdoba, el 25 de enero de 1994, cuando contaba 74 años de edad.
        </p>
        <p>
          Desde ese entonces la Fundación Decus (Casilla de Correo 700 – 1900 La Plata, República Argentina – E-mail: fundaciondecuslaplata@gmail.com.ar) es depositaria de sus escritos y de su biblioteca, siendo la única institución autorizada a publicar sus Obras Completas, proyecto en curso de realización.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Obras principales</h2>
        <p className="italic text-gray-700 mb-4">Como síntesis de sus trabajos, se indicarán sólo los que se consideran más decisivos, ordenados por áreas temáticas:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Temas filológicos generales</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>La investigación de la Antigüedad. Trabajo publicado en Xenium, Revista de Filosofía, Córdoba, año II, fascículo 1, enero-marzo de 1958.</li>
          <li>Filología y teología. Homero, Sófocles, San Atanasio. Buenos Aires, Ediciones Horizontes del Gral, 1973.</li>
          <li>La tarea del espíritu. Diálogo con Aletheia. Publicado en la revista Caput Anguli, La Plata-Buenos Aires-Córdoba, nº 1, 1977.</li>
          <li>Romanidad y romanicidad: cuestión controvertida. Trabajo publicado en la revista Románica, del Instituto de Filología de la Facultad de Humanidades de La Plata, nº 9, 1980.</li>
          <li>El reino de la palabra. Semántica y Transfiguración. La Plata, República Argentina, Edición de la Fundación Decus, Volumen I, 1995.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Temas de Filología latina</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>La poesía de Lucrecio. La Plata, Edición de la Facultad de Humanidades y Ciencias de la Educación de la Universidad Nacional de La Plata, Colección Textos y Estudios, vol.1, 1950.</li>
          <li>De rerum natura (La naturaleza de las cosas) de Lucrecio. Traducción castellana con introducción de Carlos A. Disandro, Editorial Andes, La Plata, 1959.</li>
          <li>Las Geórgicas de Virgilio. Estudio de estructura poética. Buenos Aires, Boletín de la Academia Argentina de Letras, volúmenes XXI y XXII, 1956-1957.</li>
          <li>Vergili. Regeneratio lyrica. La Plata, Ediciones Hostería Volante, Colección Veterum Sapientia, VII, a1987.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Temas de Filología griega</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>En torno al problema de physis. Trabajo publicado en Anales de Filología Clásica, Facultad de Filosofía y Letras de la UBA, tomo IV, Buenos Aires, 1949.</li>
          <li>Filosofía y poesía en el pensar griego. Anaxágoras, Empédocles, Demócrito. Volumen editado por Ediciones Hostería Volante, Colección Veterum Sapientia, Vol. V, La Plata, 1974.</li>
          <li>La poesía physica de Homero. La Plata, Ediciones Hostería Volante, Colección Veterum Sapientia, VI, 1982.</li>
          <li>Theoxenía y Theandría. La lyrica de Píndaro. Volumen III de las Obras Completas de Carlos A. Disandro, editado por la Fundación Decus, La Plata, 1997.</li>
          <li>Tránsito del mythos al logos. Hesíodo, Heráclito, Parménides. Volumen IV de los Obras Completas de Carlos A. Disandro, Fundación Decus, La Plata, 2000.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. Temas Patrísticos</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Theandriké enérgeia en la semántica de Dionysius Areopagita. Trabajo redactado y presentado en la X Conferencia Internacional de Estudios Patrísticos, Oxford, Inglaterra, 1987.</li>
          <li>Dionysius Areopagita y mística española. Trabajo redactado y presentado en la XI Conferencia Internacional de Estudios Patrísticos, Oxford, Inglaterra, 1991. Publicado en el vol. XXVII de Studia Patristica.</li>
          <li>De mhysthica theologia de San Dionysio Areopagita. Edición en griego, latín y castellano con prólogo y traducción castellana de Carlos A. Disandro. Publicado en Noein, revista de la Fundación Decus, nº 10-11-12, La Plata, 2005-2006-2007.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">5. Temas de Filología Románica</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>La poesía de Rafael Obligado. Coronación de la tierra. La Plata, Edición del Colegio Nacional de la Universidad Nacional de La Plata, 1970.</li>
          <li>Lugones, poeta americano. Editado por Ediciones Hostería Volante, Colección Lírica Hymnein, La Plata, 1977.</li>
          <li>Tres poetas españoles: El lenguaje de San Juan de la Cruz - El fuego y la lumbre en la poesía de San Juan de la Cruz - Niveles poéticos en Góngora - Interioridad lírica en Lope de Vega - España y el hombre barroco. Volumen editado por Ediciones Hostería Volante, Colección Veterum Sapientia, La Plata, 1967.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">6. Temas de Filología Germánica</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Rainer M. Rilke. Etapas en su lírica. Publicado por Ediciones Hostería Volante, Colección Calíope, La Plata, 1964.</li>
          <li>Duineser Elegien de Rainer M. Rilke. Un texto controvertido. Publicado en la Revista Arkhé, Córdoba, año II, fascículo 2, 1965.</li>
          <li>Hölderlin y el sentimiento de las ruinas. Publicado en el volumen colectivo Friedrich Hölderlin (1770-1970).</li>
          <li>Lyrica de Pensamiento. Hölderlin y Novalis. La Plata, República Argentina, Edición de la Fundación Decus, Volumen VI, 2011.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">7. Otras obras fundamentales</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Las Fuentes de la Cultura. Estudio de las formas simbólicas. Editado por Ediciones Hostería Volante, Colección Veterum Sapientia, Vol. I, La Plata, 1965.</li>
          <li>El son que funda. La Plata, República Argentina, Edición de la Fundación Decus, Volumen II, 1996.</li>
          <li>Humanismo. Fuentes y desarrollo histórico. La Plata, República Argentina, Edición de la Fundación Decus, Volumen V, 2004.</li>
          <li>La significación de Dostoievsky. Publicado por Ediciones Hostería Volante, Colección Lustrationis Krateras, La Plata, 1974.</li>
          <li>Shakespeare y el poder de las tinieblas. Publicado por Ediciones Hostería Volante, Colección Lustrationis Krateras, La Plata, 1970.</li>
        </ul>
      </section>
  </div>
);

const Galeria: React.FC = () => (
  <div className="bg-white shadow rounded-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Galería Fotográfica</h2>
    {/* Add photo gallery grid */}
  </div>
);

const Trabajos: React.FC = () => (
  <div className="bg-white shadow rounded-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Trabajos</h2>
    {/* Add photo gallery grid */}
  </div>
);

const Disandro: React.FC = () => {
  return (
    <DisandroLayout>
      <Routes>
        <Route index element={<TrayectoriaAcademica />} />
        <Route path="library" element={<Books />} />
        <Route path="music" element={<Discoteca />} />
        <Route path="works" element={<Trabajos />} />
        <Route path="gallery" element={<Galeria />} />
      </Routes>
    </DisandroLayout>
  );
};

export default Disandro;