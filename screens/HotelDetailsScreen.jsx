import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';
import { addBooking } from '../redux/slices/bookingSlice';
const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotel } = route.params; // Get hotel data from navigation parameters
  const [modalVisible, setModalVisible] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();

  const checkAvailability = () => {
    const selectedDateString = selectedDate.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
    const availableDates = hotel.availability.map(date => date); // Get hotel availability dates

    const available = availableDates.includes(selectedDateString);
    setIsAvailable(available);
    setModalVisible(true);
  };

  const handleBookHotel = async hotel => {
    if (isAvailable) {
      const bookingDetails = {
        id: new Date().getTime(), // Generate a unique ID for the booking
        hotel: hotel,
        checkInDate: selectedDate.toISOString().split('T')[0],
      };
      Alert.alert(
        'Booking Confirmed',
        `You have booked ${
          hotel.name
        } on ${selectedDate.toLocaleDateString()}.`,
      );

      // Schedule a notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Booking Confirmation',
          body: `Thank you for booking ${hotel.name}! We look forward to your stay.`,
        },
        trigger: null, // Send immediately
      });
      dispatch(addBooking(bookingDetails));
      navigation.navigate('Dashboard');
    } else {
      Alert.alert(
        'Booking Error',
        `Unfortunately, ${hotel.name} is not available for the selected date.`,
      );
    }
  };

  const onChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: hotel.image }} style={styles.image} />
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.location}>Location: {hotel.location}</Text>
        <Text style={styles.rating}>Rating: {hotel.rating} ★</Text>
        <Text style={styles.description}>{hotel.description}</Text>
        <Text style={styles.price}>Price: ${hotel.price} per night</Text>

        {/* Available Dates Display */}
        <Text style={styles.availableDatesTitle}>Available Dates:</Text>
        <Text style={styles.availableDates}>
          {hotel.availability.join(', ')}
        </Text>

        <Text style={styles.dateTitle}>Select Check-in Date:</Text>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.selectedDate}>
          Selected Date: {selectedDate.toLocaleDateString()}
        </Text>

        <Text style={styles.amenitiesTitle}>Amenities:</Text>
        <FlatList
          data={hotel.amenities}
          renderItem={({ item }) => <Text style={styles.amenity}>{item}</Text>}
          keyExtractor={item => item}
          style={styles.amenitiesList}
        />

        <Button title="Check Availability" onPress={checkAvailability} />

        {/* Availability Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {isAvailable ? 'Available' : 'Not Available'}
              </Text>
              <Text style={styles.modalMessage}>
                {isAvailable
                  ? `You can book ${
                      hotel.name
                    } for ${selectedDate.toLocaleDateString()}.`
                  : `Unfortunately, ${hotel.name} is not available for the selected date.`}
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  handleBookHotel(hotel);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Map to show hotel location */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: hotel.latitude,
              longitude: hotel.longitude,
            }}
            title={hotel.name}
            description={hotel.location}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  availableDatesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  availableDates: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  amenitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  amenitiesList: {
    marginBottom: 10,
  },
  amenity: {
    fontSize: 16,
    paddingVertical: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});
