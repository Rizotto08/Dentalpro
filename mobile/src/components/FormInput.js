import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function FormInput({ label, error, ...props }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, backgroundColor: '#fff' },
  error: { color: '#b00020', marginTop: 4 },
});
