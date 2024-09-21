import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking } from '../redux/slices/bookingSlice';
import * as Notifications from 'expo-notifications';

const BookingListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings);

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
          },
        },
      ],
    );
  };
  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      {console.log('hotel', item?.hotel)}
      <Text style={styles.hotelName}>{item.hotel.name}</Text>
      <Text style={styles.details}>Location: {item.hotel.location}</Text>
      <Text style={styles.details}>Check-in Date: {item.checkInDate}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="View Details"
          onPress={() =>
            navigation.navigate('BookingDetails', { booking: item })
          }
        />
        <Button
          title="Cancel Booking"
          onPress={() => handleCancelBooking(item.id)}
          color="red"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      {bookings.length === 0 ? (
        <Text>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default BookingListScreen;

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
  bookingItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
