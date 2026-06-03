export interface UserPreferences {
  darkMode: boolean;
  selectedCategories: string[];
  searchQuery: string;
  itemsPerPage: number;
  language: string;
}

export interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url: string;
  category: string;
  source: string;
  type: string;
}
