import { EntryCard } from "@/components/EntryCard";
import { seedEntries } from "@/lib/seed";
import { Entry } from "@/lib/types";
import { palette, space } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Tabs, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function Journal() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const openEntry = useCallback((id: string) => {
    router.push({ pathname: "/entry/[id]", params: { id } })
  }, [router])

  const renderItem = useCallback(({ item }: { item: Entry }) => (
    <EntryCard key={item.id} entry={item} onPress={openEntry} />
  ), [openEntry]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/compose")}
              hitSlop={12}
              style={{ marginRight: space.lg }}
              accessibilityLabel="New entry"
            >
              <Ionicons
                name="add"
                size={26}
                color={palette.accent}
              />
            </Pressable>
          )
        }}
      />
      <FlashList
        data={seedEntries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={EmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[palette.accent]} />
        }
      />
    </>
  )
}

function Separator() {
  return <View style={{ height: space.md }} />
}

function EmptyState() {
  return <View style={styles.empty}>
    <Text style={{ color: palette.inkMuted }}>No entries yet. Tap + to write your first one.</Text>
    <Ionicons name="book" size={48} color={palette.inkMuted} />
  </View>
}

const styles = StyleSheet.create({
  content: { padding: space.lg },
  empty: { padding: 80, alignItems: "center" }
});