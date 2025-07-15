export interface TailwindSuggestion {
  tw: string;           // Kelas Tailwind yang disarankan, contoh: "p-4"
  reason?: string;      // Penjelasan kenapa disarankan, contoh: "dari padding: 1rem"
  source?: string;      // CSS asal, contoh: "padding: 1rem"
  important?: boolean;  // Jika ada !important di source CSS
}