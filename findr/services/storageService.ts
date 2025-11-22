import { LostItem } from "../types";

// If you want to use a REAL database (Firebase), you would swap these functions
// to call Firestore instead of localStorage.

const STORAGE_KEY = 'school_lost_found_items';

// Helper to simulate network delay (makes app feel more realistic)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getItems = async (): Promise<LostItem[]> => {
  await delay(200); // Simulate network request
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const saveItem = async (item: LostItem): Promise<void> => {
  await delay(200);
  const items = await getLocalItems();
  const newItems = [item, ...items];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
};

export const updateItem = async (updatedItem: LostItem): Promise<void> => {
  await delay(200);
  const items = await getLocalItems();
  const index = items.findIndex(i => i.id === updatedItem.id);
  if (index !== -1) {
    items[index] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  await delay(200);
  const items = await getLocalItems();
  const newItems = items.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
};

// Internal synchronous helper
const getLocalItems = async (): Promise<LostItem[]> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
};

// Helper to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
