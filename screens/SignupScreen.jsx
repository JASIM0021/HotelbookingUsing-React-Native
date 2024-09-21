import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Simple validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Here you would normally send the data to your backend for registration
    // For now, we just simulate storing the user data locally
    const newUser = { email, password };

    // Simulate saving the new user (you might save to a database instead)
    await AsyncStorage.setItem('userToken', JSON.stringify(newUser));

    Alert.alert('Signup Successful', 'You can now log in with your account.');

    // Navigate back to Login Screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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

      <Button title="Sign Up" onPress={handleSignup} />

      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;

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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  loginText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
