import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('user1@example.com');
  const [password, setPassword] = useState('password1');

  // Static users data (replace with API or backend authentication if needed)
  const users = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' },
  ];

  const handleLogin = async () => {
    // Find user matching the entered email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Save user data in AsyncStorage for session management
      await AsyncStorage.setItem('userToken', JSON.stringify(user));
      Alert.alert('Login Successful', 'Welcome to Hotel Booking App!');

      // Navigate to Dashboard screen
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Signup')}
        >
          Sign Up
        </Text>
      </View>

      <Text
        style={styles.forgotPasswordText}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  signupText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});
