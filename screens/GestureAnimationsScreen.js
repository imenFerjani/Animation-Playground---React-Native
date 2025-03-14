import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Gesture animation examples data
const gestureAnimations = [
  {
    id: 'drag',
    title: 'Draggable Elements',
    description: 'Move elements around with touch gestures',
    icon: 'hand-left-outline',
    color: '#4285F4',
    examples: [
      { name: 'Simple Drag', type: 'Basic Touch', component: 'SimpleDragAnimation' },
      { name: 'Constrained Drag', type: 'Boundary Limits', component: 'ConstrainedDragAnimation' },
      { name: 'Multi-Touch Drag', type: 'Multiple Items', component: 'MultiDragAnimation' },
    ]
  },
  {
    id: 'swipe',
    title: 'Swipe Interactions',
    description: 'Implement swipe gestures with dynamic feedback',
    icon: 'swap-horizontal-outline',
    color: '#EA4335',
    examples: [
      { name: 'Swipe Cards', type: 'Card Deck', component: 'SwipeCardAnimation' },
      { name: 'Swipe Actions', type: 'List Actions', component: 'SwipeActionAnimation' },
      { name: 'Direction Swipe', type: 'Multi-Direction', component: 'DirectionSwipeAnimation' },
    ]
  },
  {
    id: 'pinch',
    title: 'Pinch & Zoom',
    description: 'Scale elements with multi-touch gestures',
    icon: 'expand-outline',
    color: '#34A853',
    examples: [
      { name: 'Image Zoom', type: 'Photo Viewer', component: 'ImageZoomAnimation' },
      { name: 'Pinch to Scale', type: 'Multi-Touch', component: 'PinchScaleAnimation' },
      { name: 'Pinch with Rotation', type: 'Complex Gesture', component: 'PinchRotateAnimation' },
    ]
  },
  {
    id: 'combined',
    title: 'Combined Gestures',
    description: 'Complex interactions using multiple gestures',
    icon: 'finger-print-outline',
    color: '#FBBC05',
    examples: [
      { name: 'Drag & Scale', type: 'Multi-Gesture', component: 'DragScaleAnimation' },
      { name: 'Rotation & Drag', type: 'Transform & Move', component: 'RotateDragAnimation' },
      { name: 'Pan & Zoom Map', type: 'Map Interaction', component: 'MapInteractionAnimation' },
    ]
  },
  {
    id: 'velocity',
    title: 'Velocity & Momentum',
    description: 'Physics-driven gestures with natural movement',
    icon: 'speedometer-outline',
    color: '#9C27B0',
    examples: [
      { name: 'Throw & Catch', type: 'Momentum', component: 'ThrowAnimation' },
      { name: 'Flick Gesture', type: 'Velocity', component: 'FlickAnimation' },
      { name: 'Momentum Scrolling', type: 'Deceleration', component: 'MomentumScrollAnimation' },
    ]
  },
  {
    id: 'feedback',
    title: 'Gesture Feedback',
    description: 'Visual and interactive feedback for touch',
    icon: 'pulse-outline',
    color: '#FF5722',
    examples: [
      { name: 'Button Press', type: 'Touch Feedback', component: 'ButtonPressAnimation' },
      { name: 'Long Press', type: 'Hold Gesture', component: 'LongPressAnimation' },
      { name: 'Progress Drag', type: 'Interactive Slider', component: 'ProgressDragAnimation' },
    ]
  },
];

const GestureAnimationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gesture Animations</Text>
          <Text style={styles.headerDescription}>
            Touch-driven animations using PanResponder and gesture systems
          </Text>
        </View>

        <View style={styles.content}>
          {gestureAnimations.map((category) => (
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

export default GestureAnimationsScreen;