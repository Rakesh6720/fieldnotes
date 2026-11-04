import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFound() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Stack.Screen options={{ title: 'Not found' }} />
      <Text>That page doesn't exist.</Text>
      <Link href="/" style={{ color: '#0f766e' }}>Back to Journal</Link>
    </View>
  );
}