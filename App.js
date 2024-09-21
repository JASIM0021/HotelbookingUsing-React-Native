import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Import Screens
import SplashScreen from './screens/SplashScreen.jsx';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import HotelDetailsScreen from './screens/HotelDetailsScreen';
import AvailabilityScreen from './screens/AvailabilityScreen';
import BookHotelScreen from './screens/BookHotelScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import BookingListScreen from './screens/BookingListScreen';
import BookingDetailsScreen from './screens/BookingDetailsScreen';
import CancelBookingScreen from './screens/CancelBookingScreen';
import * as Notifications from 'expo-notifications';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const requestNotificationPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };

    requestNotificationPermissions();

    const subscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log(notification);
      },
    );

    return () => subscription.remove();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/* Splash Screen */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

          {/* Main Screens */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} />
          <Stack.Screen name="Availability" component={AvailabilityScreen} />
          <Stack.Screen name="BookHotel" component={BookHotelScreen} />
          <Stack.Screen
            name="BookingConfirmation"
            component={BookingConfirmationScreen}
          />
          <Stack.Screen name="BookingList" component={BookingListScreen} />
          <Stack.Screen
            name="BookingDetails"
            component={BookingDetailsScreen}
          />
          <Stack.Screen name="CancelBooking" component={CancelBookingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
