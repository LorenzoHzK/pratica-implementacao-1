import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

export interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function FormInput({
  label,
  error,
  style,
  ...rest
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, !!error && styles.inputError, style]}
        placeholderTextColor="#9ca3af"
        {...rest}
      />

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#ffffff",
    color: "#111827",
  },
  inputError: {
    borderColor: "#dc2626",
  },
  error: {
    fontSize: 12,
    color: "#dc2626",
  },
});
