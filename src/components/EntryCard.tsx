import { Entry } from '@/lib/types';
import { palette, radius, space, type } from '@/theme/tokens';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const moodLabel = {great: 'Great', good: 'Good', okay: 'Okay', low: 'Low'} as const;

type Props = {
    entry: Entry;
    onPress?: (id: string) => void; 
}

function EntryCardBase({ entry, onPress }: Props) {
    const date = new Date(entry.createdAt).toLocaleDateString(undefined, {month: "short", day: "numeric"});
    const { fontScale } = useWindowDimensions();
    return (
        <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={() => onPress?.(entry.id)} accessibilityRole='button'>
            <View>
                <Text style={styles.title} numberOfLines={1}>{entry.title}</Text>
                <Text style={styles.meta} numberOfLines={2}>{date}</Text>
            </View>
            {entry.body ? (<Text style={styles.body}>{entry.body}</Text>) : null}
            {entry.mood ? <Text style={styles.meta}>Mood: {moodLabel[entry.mood]}</Text> : null}
            {entry.tags?.length ? (
                <View style={styles.chip}>
                    <Text style={styles.chipText}>{entry.tags.join(', ')}</Text>
                </View>
            ) : null}
        </Pressable>
    );
}

export const EntryCard = memo(EntryCardBase);

const styles = StyleSheet.create({
    card: {
        backgroundColor: palette.card,
        borderRadius: radius.md,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: palette.line,
        padding: space.lg,
        gap: space.xs,
    },
    pressed: {opacity:0.7},
    header: {flexDirection: 'row', alignItems: 'baseline', gap: space.sm},
    title: {...type.title, color: palette.ink, flex:1},
    body: {...type.body, color: palette.inkMuted},
    meta: {...type.meta, color: palette.inkMuted},
    chip: {alignSelf: 'flex-end', backgroundColor: palette.line, padding: space.xs, borderRadius: radius.sm},
    chipText: {...type.meta, color: palette.inkMuted},
})