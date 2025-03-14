import React, { useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // Animation values
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeIn, slideUp]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          {/* Simple animation instead of Lottie */}
          <Animated.View 
            style={[
              styles.animatedLogo,
              {
                opacity: fadeIn,
                transform: [{ translateY: slideUp }]
              }
            ]}
          >
            <Ionicons name="cube" size={80} color="#6200ee" />
            <Text style={styles.logoText}>AnimMotion</Text>
          </Animated.View>
        </View>

        <Animated.View 
          style={[
            styles.content,
            { 
              opacity: fadeIn,
              transform: [{ translateY: slideUp }] 
            }
          ]}
        >
          <Text style={styles.title}>Animation Playground</Text>
          <Text style={styles.subtitle}>
            Learn React Native animations through interactive examples
          </Text>

          <View style={styles.categoryContainer}>
            <CategoryCard
              title="Basic Animations"
              description="Explore fundamental React Native Animated API transitions"
              icon="cube-outline"
              color="#4285F4"
              onPress={() => navigation.navigate('Animations', { screen: 'Basic' })}
            />
            
            <CategoryCard
              title="Gesture Animations"
              description="Discover gesture-driven animations with PanResponder"
              icon="hand-right-outline"
              color="#EA4335"
              onPress={() => navigation.navigate('Animations', { screen: 'Gesture' })}
            />
            
            <CategoryCard
              title="Physics-Based"
              description="Create dynamic and realistic physics-based animations"
              icon="fitness-outline"
              color="#34A853"
              onPress={() => navigation.navigate('Animations', { screen: 'Physics' })}
            />
            
            <CategoryCard
              title="Layout Animations"
              description="Learn to animate component layouts and transitions"
              icon="grid-outline"
              color="#FBBC05"
              onPress={() => navigation.navigate('Animations', { screen: 'Layout' })}
            />
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Animations')}
        >
          <Text style={styles.startButtonText}>Explore All Animations</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Category Card Component
const CategoryCard = ({ title, description, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconCircle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {description}
        </Text>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="#757575" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: width * 0.8,
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 32,
  },
  categoryContainer: {
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#757575',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default HomeScreen;