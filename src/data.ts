import type { ImageSourcePropType } from 'react-native';

export type CategoryId = 'duplicates' | 'screenshots' | 'blurry' | 'large';

export type Photo = {
  id: string;
  source: ImageSourcePropType;
  /** Size on disk. Fixed per photo so the numbers are stable between runs. */
  bytes: number;
  category: CategoryId;
  takenAt: string;
};

export type Category = {
  id: CategoryId;
  label: string;
  hint: string;
  emoji: string;
};

export const CATEGORIES: Category[] = [
  { id: 'duplicates', label: 'Duplicates', hint: 'The same shot, saved twice', emoji: '👯' },
  { id: 'screenshots', label: 'Screenshots', hint: 'Captured once, never opened again', emoji: '📱' },
  { id: 'blurry', label: 'Blurry', hint: 'Out of focus, not worth keeping', emoji: '🌫️' },
  { id: 'large', label: 'Large videos', hint: 'The heaviest files on your phone', emoji: '🎬' },
];

export const PHOTOS: Photo[] = [
  { id: 'd0a', source: require('../assets/photos/dup_0_0.jpg'), bytes: 4_812_000, category: 'duplicates', takenAt: '2025-03-14' },
  { id: 'd0b', source: require('../assets/photos/dup_0_1.jpg'), bytes: 4_640_000, category: 'duplicates', takenAt: '2025-03-14' },
  { id: 'd1a', source: require('../assets/photos/dup_1_0.jpg'), bytes: 3_970_000, category: 'duplicates', takenAt: '2025-05-02' },
  { id: 'd1b', source: require('../assets/photos/dup_1_1.jpg'), bytes: 3_845_000, category: 'duplicates', takenAt: '2025-05-02' },
  { id: 'd2a', source: require('../assets/photos/dup_2_0.jpg'), bytes: 5_310_000, category: 'duplicates', takenAt: '2025-06-21' },
  { id: 'd2b', source: require('../assets/photos/dup_2_1.jpg'), bytes: 5_120_000, category: 'duplicates', takenAt: '2025-06-21' },
  { id: 'd3a', source: require('../assets/photos/dup_3_0.jpg'), bytes: 2_880_000, category: 'duplicates', takenAt: '2025-07-09' },
  { id: 'd3b', source: require('../assets/photos/dup_3_1.jpg'), bytes: 2_760_000, category: 'duplicates', takenAt: '2025-07-09' },

  { id: 's0', source: require('../assets/photos/shot_0.jpg'), bytes: 1_240_000, category: 'screenshots', takenAt: '2024-11-03' },
  { id: 's1', source: require('../assets/photos/shot_1.jpg'), bytes: 1_610_000, category: 'screenshots', takenAt: '2024-12-19' },
  { id: 's2', source: require('../assets/photos/shot_2.jpg'), bytes: 980_000, category: 'screenshots', takenAt: '2025-01-27' },
  { id: 's3', source: require('../assets/photos/shot_3.jpg'), bytes: 1_450_000, category: 'screenshots', takenAt: '2025-02-11' },
  { id: 's4', source: require('../assets/photos/shot_4.jpg'), bytes: 1_120_000, category: 'screenshots', takenAt: '2025-04-06' },
  { id: 's5', source: require('../assets/photos/shot_5.jpg'), bytes: 1_735_000, category: 'screenshots', takenAt: '2025-08-30' },

  { id: 'b0', source: require('../assets/photos/blur_0.jpg'), bytes: 3_420_000, category: 'blurry', takenAt: '2025-02-02' },
  { id: 'b1', source: require('../assets/photos/blur_1.jpg'), bytes: 2_910_000, category: 'blurry', takenAt: '2025-03-28' },
  { id: 'b2', source: require('../assets/photos/blur_2.jpg'), bytes: 4_050_000, category: 'blurry', takenAt: '2025-05-17' },
  { id: 'b3', source: require('../assets/photos/blur_3.jpg'), bytes: 3_180_000, category: 'blurry', takenAt: '2025-06-04' },
  { id: 'b4', source: require('../assets/photos/blur_4.jpg'), bytes: 2_640_000, category: 'blurry', takenAt: '2025-09-12' },

  { id: 'v0', source: require('../assets/photos/vid_0.jpg'), bytes: 128_400_000, category: 'large', takenAt: '2025-01-15' },
  { id: 'v1', source: require('../assets/photos/vid_1.jpg'), bytes: 214_900_000, category: 'large', takenAt: '2025-04-22' },
  { id: 'v2', source: require('../assets/photos/vid_2.jpg'), bytes: 96_300_000, category: 'large', takenAt: '2025-06-30' },
  { id: 'v3', source: require('../assets/photos/vid_3.jpg'), bytes: 302_600_000, category: 'large', takenAt: '2025-07-18' },
  { id: 'v4', source: require('../assets/photos/vid_4.jpg'), bytes: 158_200_000, category: 'large', takenAt: '2025-09-05' },
];

export const PHOTOS_BY_ID: Record<string, Photo> = Object.fromEntries(
  PHOTOS.map((p) => [p.id, p]),
);
