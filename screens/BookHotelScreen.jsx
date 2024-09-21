import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const BookHotelScreen = ({ route, navigation }) => {
  const { hotel, checkInDate, checkOutDate } = route.params; // Get hotel and date data from navigation parameters

  const handleConfirmBooking = () => {
    // Here you would typically handle the booking logic (e.g., API call)
    Alert.alert(
      'Booking Confirmed',
      `You have booked ${hotel.name} from ${checkInDate} to ${checkOutDate}.`,
    );
    navigation.navigate('Dashboard'); // Navigate back to the Dashboard
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Booking</Text>
      <Text style={styles.hotelName}>{hotel.name}</Text>
      <Text style={styles.details}>Location: {hotel.location}</Text>
      <Text style={styles.details}>Check-In: {checkInDate}</Text>
      <Text style={styles.details}>Check-Out: {checkOutDate}</Text>
      <Text style={styles.price}>Price: ${hotel.price} per night</Text>

      <Button title="Confirm Booking" onPress={handleConfirmBooking} />
    </View>
  );
};

export default BookHotelScreen;

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
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
