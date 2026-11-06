import { FormField } from '@/components/FormField';
import { MoodPicker } from '@/components/MoodPicker';
import { entrySchema, parseTags, type EntryFormValues } from '@/lib/entrySchema';
import { seedEntries } from '@/lib/seed';
import { palette, space, type } from '@/theme/tokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';

export default function Compose() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const existing = id ? seedEntries.find((e) => e.id === id) : undefined;

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    mode: 'onTouched',
    defaultValues: {
      title: existing?.title ?? '',
      body: existing?.body ?? '',
      mood: existing?.mood ?? null,
      tags: existing?.tags.join(', ') ?? '',
    },
  });

  const onSubmit = async (values: EntryFormValues) => {
    const entry = { ...values, tags: parseTags(values.tags) };
    console.log(existing ? 'update' : 'create', entry); // Module 5 saves this to SQLite
    router.back();
  };

  const onCancel = () => {
    if (!isDirty) return router.back();
    Alert.alert('Discard changes?', 'Your edits to this entry will be lost.', [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: existing ? 'Edit entry' : 'New entry',
          headerLeft: () => (
            <Pressable onPress={onCancel} hitSlop={12}>
              <Text style={{ color: palette.inkMuted }}>Cancel</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting} hitSlop={12}>
              <Text style={{ color: palette.accent, fontWeight: '700' }}>Save</Text>
            </Pressable>
          ),
        }}
      />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: space.lg, gap: space.lg }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <Controller
            control={control}
            name="title"
            render={({ field: { ref, value, onChange, onBlur } }) => (
              <FormField
                ref={ref}
                label="Title"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.title?.message}
                placeholder="What happened?"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => setFocus('body')}
                autoFocus={!existing}
              />
            )}
          />

          <View style={{ gap: space.xs }}>
            <Text style={{ ...type.meta, fontWeight: '600', color: palette.ink }}>Mood</Text>
            <Controller
              control={control}
              name="mood"
              render={({ field: { value, onChange } }) => (
                <MoodPicker value={value} onChange={onChange} />
              )}
            />
          </View>

          <Controller
            control={control}
            name="body"
            render={({ field: { ref, value, onChange, onBlur } }) => (
              <FormField
                ref={ref}
                label="Notes"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.body?.message}
                placeholder="Details, observations, anything"
                multiline
                textAlignVertical="top"
                style={{ minHeight: 160 }}
              />
            )}
          />

          <Controller
            control={control}
            name="tags"
            render={({ field: { ref, value, onChange, onBlur } }) => (
              <FormField
                ref={ref}
                label="Tags"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="outdoors, birds"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}