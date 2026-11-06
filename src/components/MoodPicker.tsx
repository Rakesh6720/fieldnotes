import type { Mood } from '@/lib/types';
import { palette, radius, space } from '@/theme/tokens';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const options: { value: Mood; label: string }[] = [
  { value: 'great', label: 'Great' },
  { value: 'good', label: 'Good' },
  { value: 'okay', label: 'Okay' },
  { value: 'low', label: 'Low' },
];

type Props = { value: Mood | null; onChange: (m: Mood | null) => void };

export function MoodPicker({ value, onChange }: Props) {
  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(selected ? null : o.value)}
            style={[styles.chip, selected && styles.chipSelected]}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
          >
            <Text style={[styles.text, selected && styles.textSelected]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  chip: {
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.card,
  },
  chipSelected: { backgroundColor: palette.accent, borderColor: palette.accent },
  text: { color: palette.ink, fontWeight: '500' },
  textSelected: { color: '#fff' },
});