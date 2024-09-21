import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Simple email validation
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    // Here you would typically send a reset password request to your backend
    // Simulating the password reset process
    Alert.alert(
      'Reset Link Sent',
      'A password reset link has been sent to your email address.',
    );

    // Navigate back to the Login Screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Send Reset Link" onPress={handleForgotPassword} />

      <Text
        style={styles.backToLoginText}
        onPress={() => navigation.navigate('Login')}
      >
        Back to Login
      </Text>
    </View>
  );
};

export default ForgotPasswordScreen;

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
  backToLoginText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});
