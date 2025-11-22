import { LostItem } from "../types";
import { db, isFirebaseEnabled } from "./firebase";
import { 
  collection, 
  getDocs, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy 
} from 'firebase/firestore';

const COLLECTION_NAME = 'lostItems';
const STORAGE_KEY = 'school_lost_found_items';

// Helper to simulate network delay (optional, can remove)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getItems = async (): Promise<LostItem[]> => {
  if (isFirebaseEnabled && db) {
    try {
      const itemsRef = collection(db, COLLECTION_NAME);
      const q = query(itemsRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as LostItem));
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  } else {
    // Fallback to localStorage
    await delay(200);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
};

export const saveItem = async (item: LostItem): Promise<void> => {
  if (isFirebaseEnabled && db) {
    try {
      // Use the provided ID as the document ID for consistency
      const itemRef = doc(db, COLLECTION_NAME, item.id);
      const { id, ...itemData } = item;
      await setDoc(itemRef, itemData);
    } catch (error) {
      console.error('Error saving item:', error);
      throw error;
    }
  } else {
    // Fallback to localStorage
    await delay(200);
    const items = await getLocalItems();
    const newItems = [item, ...items];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  }
};

export const updateItem = async (updatedItem: LostItem): Promise<void> => {
  if (isFirebaseEnabled && db) {
    try {
      const itemRef = doc(db, COLLECTION_NAME, updatedItem.id);
      const { id, ...itemData } = updatedItem;
      await updateDoc(itemRef, itemData);
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  } else {
    // Fallback to localStorage
    await delay(200);
    const items = await getLocalItems();
    const index = items.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  if (isFirebaseEnabled && db) {
    try {
      const itemRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(itemRef);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  } else {
    // Fallback to localStorage
    await delay(200);
    const items = await getLocalItems();
    const newItems = items.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  }
};

// Internal synchronous helper for localStorage fallback
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
