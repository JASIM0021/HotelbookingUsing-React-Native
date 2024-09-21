import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import hotelsData from '../data/hotels.json'; // Importing the hotel data
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Simulate fetching hotel data from JSON
    setHotels(hotelsData);
  }, []);

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hotelItem}
      onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
    >
      <Image source={{ uri: item.image }} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelDetails}>Location: {item.location}</Text>
        <Text style={styles.hotelDetails}>Rating: {item.rating} ★</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Hotel Booking</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('BookingList')}
          style={styles.bookingIcon}
        >
          <Ionicons name="list" size={28} color="#2980b9" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={item => item.id}
        style={styles.hotelList}
      />
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', // Light background color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50', // Darker text color for contrast
  },
  bookingIcon: {
    padding: 10,
  },
  hotelList: {
    marginVertical: 10,
  },
  hotelItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2, // Shadow effect for Android
  },
  hotelImage: {
    width: 100,
    height: 100,
  },
  hotelInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9', // Color for hotel name
  },
  hotelDetails: {
    fontSize: 14,
    color: '#34495e', // Slightly muted color for details
  },
});
