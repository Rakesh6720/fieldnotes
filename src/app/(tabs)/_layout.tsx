import { palette } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#007AFF",
                headerStyle: { backgroundColor: palette.paper },
                sceneStyle: {backgroundColor: palette.paper}
            }}
        >
            <Tabs.Screen name="index" options={{
                title: "Journal",
                tabBarIcon: ({color, size}) => <Ionicons name="book-outline" color={color ?? undefined} size={size} />
            }} />
            <Tabs.Screen name="search" options={{
                title: "Search",
                tabBarIcon: ({color, size}) => <Ionicons name="search" color={color ?? undefined} size={size} />
            }} />
            <Tabs.Screen name="settings" options={{
                title: "Settings",
                tabBarIcon: ({color, size}) => <Ionicons name="settings-outline" color={color ?? undefined} size={size} />
            }} />
        </Tabs>
    );
}