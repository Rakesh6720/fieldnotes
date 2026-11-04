import { palette } from "@/theme/tokens";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
  <>
    <StatusBar style="dark"/>
    <Stack
      screenOptions={{ 
        headerStyle: {backgroundColor: palette.paper },
        headerTintColor: palette.ink,
        contentStyle: {backgroundColor: palette.paper},
      }}
    >
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="entry/[id]" options={{title: ""}} />
      <Stack.Screen name="compose" options={{presentation: "modal", title: "New entry"}} />
    </Stack>
  </>)
}
