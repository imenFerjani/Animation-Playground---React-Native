import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import BasicAnimationsScreen from './screens/BasicAnimationsScreen';
import GestureAnimationsScreen from './screens/GestureAnimationsScreen';
import PhysicsAnimationsScreen from './screens/PhysicsAnimationsScreen';
import LayoutAnimationsScreen from './screens/LayoutAnimationsScreen';
import AnimationDetailsScreen from './screens/AnimationDetailsScreen';

// Create navigation components
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator component
function AnimationTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Basic') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Gesture') {
            iconName = focused ? 'hand-right' : 'hand-right-outline';
          } else if (route.name === 'Physics') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Layout') {
            iconName = focused ? 'grid' : 'grid-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Basic" component={BasicAnimationsScreen} />
      <Tab.Screen name="Gesture" component={GestureAnimationsScreen} />
      <Tab.Screen name="Physics" component={PhysicsAnimationsScreen} />
      <Tab.Screen name="Layout" component={LayoutAnimationsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              title: 'Animation Playground' 
            }} 
          />
          <Stack.Screen 
            name="Animations" 
            component={AnimationTabs}
            options={{ 
              title: 'Animation Examples' 
            }} 
          />
          <Stack.Screen 
            name="AnimationDetails" 
            component={AnimationDetailsScreen}
            options={({ route }) => ({ 
              title: route.params?.title || 'Animation Details' 
            })} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}