import type { Entry, Mood } from './types';

const moods: (Mood | null)[] = ['great', 'good', 'okay', 'low', null];
const titles = ['Morning walk', 'Lake Michigan shoreline', 'Coffee notes', 'Trail log', 'Rainy day'];

export const seedEntries: Entry[] = Array.from({ length: 200 }, (_, i) => {
  const createdAt = Date.now() - i * 1000 * 60 * 60 * 9;
  return {
    id: String(i + 1),
    title: `${titles[i % titles.length]} #${i + 1}`,
    body: i % 3 === 0 ? '' : 'Saw three herons and a kingfisher near the inlet. Cold wind off the water.',
    mood: moods[i % moods.length],
    tags: i % 2 ? ['outdoors'] : [],
    createdAt,
    updatedAt: createdAt,
  };
});