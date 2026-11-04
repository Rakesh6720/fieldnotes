import { EntryCard } from "@/components/EntryCard";
import { seedEntries } from "@/lib/seed";
import { Entry } from "@/lib/types";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { palette, radius, space } from "../../theme/tokens";
    

export default function Search() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    const results = useMemo(() => {
        const q = deferredQuery.trim().toLowerCase();
        if (!q) return [];
        return seedEntries.filter(entry => entry.title.toLowerCase().includes(q) || entry.body.toLowerCase().includes(q));
    }, [deferredQuery]);

    const openEntry = useCallback((id: string) => {
        router.push({ pathname: "/entry/[id]", params: { id } });
    }, [router]);

    const renderItem = useCallback(({ item }: { item: Entry }) =>
        <EntryCard entry={item} onPress={openEntry} />,
        [openEntry]
    );

    return (
        <View style={styles.screen}>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search titles and notes"
                placeholderTextColor={palette.inkMuted}
                style={styles.input}
                autoCorrect={false}
                clearButtonMode="while-editing"
                returnKeyType="search"
            />
            <FlashList
                data={results}
                renderItem={renderItem}
                keyExtractor={item => item.id}              
                style={{opacity: isStale ? 0.6 : 1}}
                contentContainerStyle={{padding: space.lg}}
                ItemSeparatorComponent={() => <View style={{height: space.md}} />}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                    <Text style={styles.hint}>
                        {deferredQuery ? `No entries match "${deferredQuery}"` : "Start typing to search entries"}
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    input: {
        margin: space.lg,
        marginBottom: 0,
        paddingHorizontal: space.lg,
        paddingVertical: space.md,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: palette.line,
        backgroundColor: palette.card,
        fontSize: 16,
        color: palette.ink,
    },
    hint: { textAlign: 'center', color: palette.inkMuted, marginTop: 48 },
})