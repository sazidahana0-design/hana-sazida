
export interface CarPurchase {
  id: string;
  make: string;
  model: string;
  year: number;
  location: string;
  pricePaid: string;
  condition: 'Damaged' | 'Wrecked' | 'Used' | 'Non-runner';
  imageUrl: string;
  date: string;
  description: string;
}

export interface QuoteRequest {
  make: string;
  model: string;
  year: number;
  condition: string;
  location: string;
  phone: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
