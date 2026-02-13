import React, { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import { isEmail, minLength, required } from '../utils/validation';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = async () => {
    const nextErrors = {
      name: required(name, 'Name'),
      email: required(email, 'Email') || isEmail(email),
      password: required(password, 'Password') || minLength(password, 6, 'Password'),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    try { await signup(name, email, password); } catch { Alert.alert('Error', 'Signup failed'); }
  };

  return <View style={styles.container}><FormInput label="Name" value={name} onChangeText={setName} error={errors.name} /><FormInput label="Email" value={email} onChangeText={setEmail} error={errors.email} /><FormInput label="Password" value={password} secureTextEntry onChangeText={setPassword} error={errors.password} /><Button title="Sign up" onPress={submit} /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: '#f7f9fc' } });
