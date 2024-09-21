import React from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { cancelBooking } from '../redux/slices/bookingSlice';
import * as Notifications from 'expo-notifications';

const BookingDetailsScreen = ({ route, navigation }) => {
  const { booking } = route.params; // Get booking details from navigation parameters
  const dispatch = useDispatch();

  console.log('booking', booking);

  const handleCancelBooking = bookingId => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            dispatch(cancelBooking({ id: bookingId }));
            Alert.alert(
              'Booking Cancelled',
              'Your booking has been successfully cancelled.',
            );
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Booking Cancelled',
                body: `Your booking has been successfully cancelled.`,
              },
              trigger: null, // Send immediately
            });

            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>

      {/* Hotel Image */}
      <Image source={{ uri: booking.hotel.image }} style={styles.hotelImage} />

      {/* Hotel Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.hotelName}>{booking.hotel.name}</Text>
        <Text style={styles.details}>Check-In: {booking.checkInDate}</Text>
        <Text style={styles.details}>Check-Out: {booking.checkOutDate}</Text>
        <Text style={styles.details}>
          Price: ${booking.hotel.price} per night
        </Text>
      </View>

      {/* Map showing hotel location */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: booking.hotel.location.lat,
          longitude: booking.hotel.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: booking.hotel.location.lat,
            longitude: booking.hotel.location.lng,
          }}
          title={booking.hotel.name}
          description={booking.hotel.address}
        />
      </MapView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel Booking"
          onPress={() => handleCancelBooking(booking.id)}
        />
        <Button
          title="Back to Booking List"
          onPress={() => navigation.navigate('BookingList')}
        />
      </View>
    </View>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  hotelImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  details: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
