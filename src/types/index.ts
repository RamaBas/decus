export interface Academic {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  faculty: string;
  photoUrl: string;
  type: 'honorary' | 'ordinary';
  cvUrl: string;
  decusActivities: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  library: string;
  available: boolean;
  category: string;
  coverUrl: string;
  indexUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: 'course' | 'conference' | 'seminar' | 'concert' | 'video' | 'theater' | 'workshop';
  title: string;
  description: string;
  date: string;
  location: string;
  multimediaUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const activityTypes = [
  { value: 'course', label: 'Cursos' },
  { value: 'conference', label: 'Conferencias' },
  { value: 'seminar', label: 'Seminarios' },
  { value: 'concert', label: 'Conciertos' },
  { value: 'video', label: 'Proyecciones' },
  { value: 'theater', label: 'Teatro Leído' },
  { value: 'workshop', label: 'Talleres' },
];


export interface Publication {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'collection' | 'magazine' | 'recording' | 'video';
  coverUrl: string;
  indexUrl: string;
  description: string;
  price: number;
  purchaseLink: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsDTO {
  id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalAcademics: number;
  totalBooks: number;
  totalActivities: number;
  totalPublications: number;
  totalNews: number;
  recentActivities: Activity[];
  recentPublications: Publication[];
  recentNews: News[];
}