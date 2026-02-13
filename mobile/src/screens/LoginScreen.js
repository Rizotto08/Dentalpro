import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import { isEmail, minLength, required } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = async () => {
    const nextErrors = {
      email: required(email, 'Email') || isEmail(email),
      password: required(password, 'Password') || minLength(password, 6, 'Password'),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    try { await login(email, password); } catch { Alert.alert('Error', 'Invalid credentials'); }
  };

  return <View style={styles.container}><Text style={styles.title}>DentalPro</Text><FormInput label="Email" value={email} onChangeText={setEmail} error={errors.email} /><FormInput label="Password" value={password} secureTextEntry onChangeText={setPassword} error={errors.password} /><Button title="Login" onPress={submit} /><Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Create account</Text></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7f9fc' }, title: { fontSize: 28, fontWeight: '700', marginBottom: 16 }, link: { marginTop: 14, color: '#2663ff', textAlign: 'center' } });
