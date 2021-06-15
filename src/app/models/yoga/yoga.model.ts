export interface Yoga {
  id?: string;
  name: string;
  imageUrl?: string;
  videoUrl?: string;
  details: string;
  pose: string;
  benifit: string;
  minutes: number;
  repeatation: number;
  recomandedTime: string;
  createdAt: Date;
  updatedAt: Date;
  isFavourite: boolean;
  isSelected?: boolean;
}
