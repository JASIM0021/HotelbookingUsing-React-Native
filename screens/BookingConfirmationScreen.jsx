import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookingConfirmationScreen = ({ route, navigation }) => {
  const { status, hotelName, checkInDate, checkOutDate } = route.params; // Get status and booking details from navigation parameters

  const handleBackToDashboard = () => {
    navigation.navigate('Dashboard'); // Navigate back to the Dashboard
  };

  return (
    <View style={styles.container}>
      {status === 'confirmed' ? (
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.details}>You have successfully booked:</Text>
          <Text style={styles.hotelName}>{hotelName}</Text>
          <Text style={styles.details}>Check-In: {checkInDate}</Text>
          <Text style={styles.details}>Check-Out: {checkOutDate}</Text>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Booking Failed</Text>
          <Text style={styles.details}>
            Sorry, there was an issue with your booking.
          </Text>
        </View>
      )}

      <Button title="Back to Dashboard" onPress={handleBackToDashboard} />
    </View>
  );
};

export default BookingConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
