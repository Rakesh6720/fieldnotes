import { EntryCard } from "@/components/EntryCard";
import { seedEntries } from "@/lib/seed";
import { palette, space } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

export default function Journal() {
  const router = useRouter();

  const openEntry = useCallback((id: string) => {
    router.push({pathname: "/entry/[id]", params: { id }})
  }, [router])

  return (
    <>
      <Tabs.Screen 
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/compose")}
              hitSlop={12}
              style={{marginRight: space.lg}}
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
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        {seedEntries.slice(0, 20).map((e) => (
          <EntryCard key={e.id} entry={e} onPress={openEntry} />
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: palette.paper},
  content: {padding: space.lg, gap: space.md}
});