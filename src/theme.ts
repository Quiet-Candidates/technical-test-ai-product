export const colors = {
  bg: '#F4F6F8',
  card: '#FFFFFF',
  ink: '#101828',
  inkSoft: '#667085',
  inkFaint: '#98A2B3',
  line: '#E4E7EC',
  brand: '#0E9F6E',
  brandSoft: '#E7F6F0',
  danger: '#E5484D',
  dangerSoft: '#FEECEC',
  warn: '#F79009',
  overlay: 'rgba(16,24,40,0.55)',
};

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };

export const space = (n: number) => n * 4;

export function formatBytes(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(0)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(0)} KB`;
  return `${bytes} B`;
}
