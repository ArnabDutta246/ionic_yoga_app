export interface Yoga {
  id?: string;
  name: string;
  imageUrl?: string;
  videoUrl?: string;
  description: {
    details: string;
    pose?: string;
    benifit?: string;
  };
  minutes: number;
  repeatation: number;
  recomandedTime: string;
  category?: Category;
}

export interface Category {
  isDaily: boolean;
  weekDays: string[];
}
