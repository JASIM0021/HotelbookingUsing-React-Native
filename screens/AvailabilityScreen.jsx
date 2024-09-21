import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';

const AvailabilityScreen = ({ route, navigation }) => {
  const { hotel } = route.params; // Get hotel data from navigation parameters
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      Alert.alert('Error', 'Please fill in both dates.');
      return;
    }

    // Here you would typically check the availability through an API
    Alert.alert(
      'Availability Check',
      `Rooms available from ${checkInDate} to ${checkOutDate}.`,
    );
    navigation.navigate('BookHotel', { hotel, checkInDate, checkOutDate }); // Navigate to Booking screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Availability for {hotel.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Check-In Date (YYYY-MM-DD)"
        value={checkInDate}
        onChangeText={text => setCheckInDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Check-Out Date (YYYY-MM-DD)"
        value={checkOutDate}
        onChangeText={text => setCheckOutDate(text)}
      />

      <Button title="Check Availability" onPress={handleCheckAvailability} />
    </View>
  );
};

export default AvailabilityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
