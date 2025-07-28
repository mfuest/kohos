// Re-export all types for easy importing
export * from './campaign';
export * from './creator';
export * from './brand';
export * from './application';

// Common types used across the application
export interface User {
  id: string;
  email: string;
  user_type: 'brand' | 'creator';
  created_at: string;
  updated_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form validation schemas
export interface FormErrors {
  [key: string]: string;
}

// UI state types
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface ModalState {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any; // React.ComponentType
  children?: NavigationItem[];
}

// Theme types
export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
