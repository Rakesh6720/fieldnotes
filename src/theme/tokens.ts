export const palette = {
  ink: '#16202a',
  inkMuted: '#5b6773',
  paper: '#f7f8fa',
  card: '#ffffff',
  line: '#dfe3e8',
  accent: '#0f766e',
  danger: '#b42318',
} as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const radius = { sm: 6, md: 10, lg: 16 } as const;

export const type = {
  title: { fontSize: 20, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 22 },
  meta: { fontSize: 13 },
} as const;