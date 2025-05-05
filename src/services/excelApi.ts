// services/excelApi.ts
export async function fetchBooksFromGoogleSheet(sheetName: string): Promise<Omit<Book, 'id'>[]> {
  // Usa variables públicas de Next.js o valores directos en el cliente
  const API_KEY = "AIzaSyBItN9MkUoavvZywaePzLiaQbuh1WBgIfc";
  const SHEET_ID = "1IuW2m2xS2JXBNZrfj_FB27jxh9EodsVw-SqPATAsCH4";
  const RANGE = "A:E";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}!${RANGE}?key=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    const rows = data.values || [];

    return rows.slice(1).map((row: string[]) => ({
      title: row[0]?.trim() || 'Sin título',
      description: row[1]?.trim() || '',
      indexBook: row[2]?.trim() || '',
      price: parseFloat(row[3]?.replace(',', '.')) || 0,
      image: row[4]?.trim() || '',
    }));
  } catch (error) {
    console.error("Error al cargar libros:", error);
    return [];
  }
}