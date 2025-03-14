import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Physics animation examples data
const physicsAnimations = [
  {
    id: 'spring',
    title: 'Spring Animations',
    description: 'Realistic spring-based motion effects',
    icon: 'flash-outline',
    color: '#4285F4',
    examples: [
      { name: 'Basic Spring', type: 'Simple Spring', component: 'BasicSpringAnimation' },
      { name: 'Configurable Springs', type: 'Custom Spring', component: 'ConfigurableSpringAnimation' },
      { name: 'Chained Springs', type: 'Connected Motion', component: 'ChainedSpringAnimation' },
    ]
  },
  {
    id: 'gravity',
    title: 'Gravity & Falling',
    description: 'Simulate gravitational forces and falling objects',
    icon: 'arrow-down-outline',
    color: '#EA4335',
    examples: [
      { name: 'Falling Objects', type: 'Gravity', component: 'FallingObjectsAnimation' },
      { name: 'Bouncing Ball', type: 'Gravity + Bounce', component: 'BouncingBallAnimation' },
      { name: 'Projectile Motion', type: 'Parabolic Path', component: 'ProjectileAnimation' },
    ]
  },
  {
    id: 'collision',
    title: 'Collisions',
    description: 'Simulate object interactions and collisions',
    icon: 'baseball-outline',
    color: '#34A853',
    examples: [
      { name: 'Basic Collisions', type: 'Bounce Physics', component: 'BasicCollisionAnimation' },
      { name: 'Collision Response', type: 'Multiple Objects', component: 'MultiCollisionAnimation' },
      { name: 'Particle Collider', type: 'Many Particles', component: 'ParticleCollisionAnimation' },
    ]
  },
  {
    id: 'dampening',
    title: 'Damping & Friction',
    description: 'Realistic motion with natural slowdown',
    icon: 'water-outline',
    color: '#FBBC05',
    examples: [
      { name: 'Friction Effects', type: 'Slow Down', component: 'FrictionAnimation' },
      { name: 'Damped Oscillation', type: 'Spring + Damping', component: 'DampedOscillationAnimation' },
      { name: 'Air Resistance', type: 'Fall + Resistance', component: 'AirResistanceAnimation' },
    ]
  },
  {
    id: 'forces',
    title: 'Force Fields',
    description: 'Objects affected by simulated force fields',
    icon: 'magnet-outline',
    color: '#9C27B0',
    examples: [
      { name: 'Attraction', type: 'Magnetic Force', component: 'AttractionAnimation' },
      { name: 'Repulsion', type: 'Repel Force', component: 'RepulsionAnimation' },
      { name: 'Orbit Simulation', type: 'Circular Motion', component: 'OrbitAnimation' },
    ]
  },
  {
    id: 'particles',
    title: 'Particle Systems',
    description: 'Multiple objects with physics behaviors',
    icon: 'snow-outline',
    color: '#FF5722',
    examples: [
      { name: 'Particle Fountain', type: 'Emitter', component: 'ParticleFountainAnimation' },
      { name: 'Confetti Effect', type: 'Celebration', component: 'ConfettiAnimation' },
      { name: 'Fireworks Display', type: 'Explosion', component: 'FireworksAnimation' },
    ]
  },
];

const PhysicsAnimationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Physics Animations</Text>
          <Text style={styles.headerDescription}>
            Realistic physical simulations with natural motion
          </Text>
        </View>

        <View style={styles.content}>
          {physicsAnimations.map((category) => (
            <AnimationCategory 
              key={category.id}
              category={category}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Animation Category Component
const AnimationCategory = ({ category, navigation }) => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <View style={[styles.iconCircle, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={24} color="white" />
        </View>
        <View style={styles.categoryTitleContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      </View>

      <View style={styles.examplesContainer}>
        {category.examples.map((example, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exampleButton}
            onPress={() => navigation.navigate('AnimationDetails', {
              title: example.name,
              component: example.component,
              category: category.id
            })}
          >
            <Text style={styles.exampleName}>{example.name}</Text>
            <View style={styles.exampleType}>
              <Text style={styles.exampleTypeText}>{example.type}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#757575" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#757575',
  },
  examplesContainer: {
    padding: 8,
  },
  exampleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
  exampleName: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  exampleType: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  exampleTypeText: {
    fontSize: 12,
    color: '#757575',
  },
});

export default PhysicsAnimationsScreen;