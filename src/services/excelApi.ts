type Book = {
  title: string;
  description: string;
  indexBook: string;
  price: number;
  images: string[]; // Ahora es un array
};

export async function fetchBooksFromGoogleSheet(): Promise<Book[]> {
  const API_KEY = "AIzaSyBItN9MkUoavvZywaePzLiaQbuh1WBgIfc"
  const SHEET_ID = "1IuW2m2xS2JXBNZrfj_FB27jxh9EodsVw-SqPATAsCH4";
  const SHEET_NAME = "Libros";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

    const data = await res.json();
    const rows = data.values;

    if (!rows || rows.length === 0) return [];

    return data.values.slice(1).map((row: string[], index: number) => ({
      id: `book-${index}`, // ID único basado en posición
      title: row[0],
      description: row[1],
      indexBook: (row[2]),
      price: parseFloat(row[3]),
      image: row[4],
    }));
  } catch (error) {
    console.error("Error al cargar libros desde Google Sheets:", error);
    return [];
  }
}