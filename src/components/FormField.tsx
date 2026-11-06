import { palette, radius, space, type } from '@/theme/tokens';
import { forwardRef, type ComponentRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {label: string; error?: string};

export const FormField = forwardRef<ComponentRef<typeof TextInput>, Props>(function formField({label, error, style, ...inputProps}, ref) {
    return(
        <View style={{gap: space.xs}}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                ref={ref}
                placeholderTextColor={palette.inkMuted}
                style={[styles.input, error ? styles.inputError : null, style]}
                aria-label={label}
                {...inputProps}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    )
})

const styles = StyleSheet.create({
  label: { ...type.meta, fontWeight: '600', color: palette.ink },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: radius.md,
    backgroundColor: palette.card,
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    fontSize: 16,
    color: palette.ink,
  },
  inputError: { borderColor: palette.danger },
  error: { ...type.meta, color: palette.danger },
});