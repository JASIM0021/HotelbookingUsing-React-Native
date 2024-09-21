import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const CancelBookingScreen = ({ route, navigation }) => {
  const { booking } = route.params; // Get booking details from navigation parameters

  const handleConfirmCancellation = () => {
    // Logic to cancel the booking (e.g., API call or state update)
    Alert.alert(
      'Booking Canceled',
      `You have canceled your booking for ${booking.hotelName}.`,
    );
    navigation.navigate('BookingList'); // Navigate back to the Booking List
  };

  const handleCancel = () => {
    navigation.navigate('BookingDetails', { booking }); // Go back to Booking Details without canceling
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cancel Booking</Text>
      <Text style={styles.message}>
        Are you sure you want to cancel your booking for:
      </Text>
      <Text style={styles.hotelName}>{booking.hotelName}</Text>
      <Text style={styles.details}>Check-In: {booking.checkInDate}</Text>
      <Text style={styles.details}>Check-Out: {booking.checkOutDate}</Text>

      <Button
        title="Confirm Cancellation"
        onPress={handleConfirmCancellation}
      />
      <Button title="Go Back" onPress={handleCancel} />
    </View>
  );
};

export default CancelBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
});
