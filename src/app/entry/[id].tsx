import { seedEntries } from "@/lib/seed";
import { palette, space, type } from "@/theme/tokens";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function Entry() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const entry = seedEntries.find(e => e.id === id);

    if (!entry) {
        return (
            <>
                <Stack.Screen options={{ title: "Not found" }} />
                <Text style={{ padding: space.lg }}>This entry doesn't exist.</Text>
            </>)
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: entry.title,
                    headerRight: () => (
                        <Pressable
                            onPress={() => router.push({ pathname: "/compose", params: { id: entry.id } })}
                            hitSlop={12}
                        >
                            <Text style={{ color: palette.accent, fontWeight: '600' }}>Edit</Text>
                        </Pressable>
                    )
                }} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.meta}>{new Date(entry.createdAt).toLocaleDateString()}</Text>
                <Text style={styles.body}>{entry.body || "No notes."}</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    content: { padding: space.lg, gap: space.md },
    meta: { ...type.meta, color: palette.inkMuted },
    body: { ...type.body, color: palette.ink }
})