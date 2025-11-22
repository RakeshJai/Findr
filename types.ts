export enum Category {
  CLOTHING = 'Clothing',
  ELECTRONICS = 'Electronics',
  WATER_BOTTLES = 'Water Bottles',
  SUPPLIES = 'School Supplies',
  ACCESSORIES = 'Accessories',
  OTHER = 'Other'
}

export interface LostItem {
  id: string;
  item_name: string;
  description: string;
  category: Category | string;
  image_url: string; // Base64 for this demo, URL in prod
  uploaded_by: string;
  timestamp: number;
  claimedBy?: string; // Name of the student who claimed it
}

export interface AIAnalysisResult {
  item_name: string;
  description: string;
}

export type ViewState = 'student' | 'teacher-login' | 'teacher-dashboard';
