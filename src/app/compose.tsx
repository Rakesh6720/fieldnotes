import { palette, space } from "@/theme/tokens";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Compose() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const idEdit = Boolean(id);
    
    return (
        <View style={{flex: 1, padding: space.lg, gap: space.md}}>
            <Stack.Screen options={{title: idEdit ? 'Edit Entry' : 'New Entry'}} />
            <Text>{idEdit ? `Editing Entry ${id}` : 'Creating New Entry'}</Text>
            <Pressable onPress={() => router.back()}>
                <Text style={{color: palette.accent}}>Close</Text>
            </Pressable>
        </View>
    );
}