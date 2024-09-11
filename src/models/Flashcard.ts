export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  chapterId?: string;
  lastReviewedDate?: Date;
  nextReviewDate?: Date;  // We'll keep this but won't automatically calculate it
  reviewCount: number;
  difficulty?: ReviewPerformance;
  easeFactor?: number;  // We'll keep this but won't use it for calculations
  createdDate: Date;
}