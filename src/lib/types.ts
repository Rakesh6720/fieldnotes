export type Mood = 'great' | 'good' | 'okay' | 'low';

export type Entry = {
  id: string;
  title: string;
  body: string;
  mood: Mood | null;
  tags: string[];
  createdAt: number; // epoch ms
  updatedAt: number;
};