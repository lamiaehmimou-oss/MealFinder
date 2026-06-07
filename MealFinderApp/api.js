// api.js — Appels à TheMealDB API

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

async function apiFetch(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    return null;
  }
}

// 1. Toutes les catégories
export async function getAllCategories() {
  const data = await apiFetch(`${API_BASE}/categories.php`);
  return data?.categories || [];
}

// 2. Plats par catégorie
export async function getMealsByCategory(category) {
  const data = await apiFetch(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`);
  return data?.meals || [];
}

// 3. Recherche par nom
export async function searchMealsByName(query) {
  const data = await apiFetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);
  return data?.meals || [];
}

// 4. Détail d'un plat
export async function getMealById(id) {
  const data = await apiFetch(`${API_BASE}/lookup.php?i=${id}`);
  return data?.meals?.[0] || null;
}
