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

// Animation examples data
const basicAnimations = [
  {
    id: 'fade',
    title: 'Fade In/Out',
    description: 'Animate opacity to create smooth fade transitions',
    icon: 'eye-outline',
    color: '#4285F4',
    examples: [
      { name: 'Simple Fade', type: 'Opacity', component: 'FadeAnimation' },
      { name: 'Fade with Delay', type: 'Opacity with Delay', component: 'FadeDelayAnimation' },
      { name: 'Fade Sequence', type: 'Opacity Sequence', component: 'FadeSequenceAnimation' },
    ]
  },
  {
    id: 'translate',
    title: 'Translation',
    description: 'Move elements around the screen with precision',
    icon: 'move-outline',
    color: '#EA4335',
    examples: [
      { name: 'Simple Translation', type: 'Position', component: 'TranslateAnimation' },
      { name: 'Spring Translation', type: 'Position with Spring', component: 'TranslateSpringAnimation' },
      { name: 'Path Movement', type: 'Coordinate Path', component: 'TranslatePathAnimation' },
    ]
  },
  {
    id: 'scale',
    title: 'Scale',
    description: 'Grow and shrink elements with scaling animations',
    icon: 'resize-outline',
    color: '#34A853',
    examples: [
      { name: 'Simple Scale', type: 'Size', component: 'ScaleAnimation' },
      { name: 'Pulse Animation', type: 'Size Pulse', component: 'PulseAnimation' },
      { name: 'Scale with Bounce', type: 'Size with Bounce', component: 'ScaleBounceAnimation' },
    ]
  },
  {
    id: 'rotate',
    title: 'Rotation',
    description: 'Rotate elements for dynamic visual effects',
    icon: 'sync-outline',
    color: '#FBBC05',
    examples: [
      { name: 'Simple Rotation', type: 'Transform', component: 'RotateAnimation' },
      { name: 'Continuous Rotation', type: 'Loop Transform', component: 'RotateLoopAnimation' },
      { name: 'Flip Animation', type: '3D Transform', component: 'FlipAnimation' },
    ]
  },
  {
    id: 'color',
    title: 'Color Change',
    description: 'Smooth transitions between colors',
    icon: 'color-palette-outline',
    color: '#9C27B0',
    examples: [
      { name: 'Color Fade', type: 'Color Interpolation', component: 'ColorAnimation' },
      { name: 'Rainbow Effect', type: 'Multi-Color Sequence', component: 'RainbowAnimation' },
      { name: 'Theme Transition', type: 'Light/Dark Theme', component: 'ThemeAnimation' },
    ]
  },
  {
    id: 'easing',
    title: 'Easing Functions',
    description: 'Different timing functions for natural movement',
    icon: 'options-outline',
    color: '#FF5722',
    examples: [
      { name: 'Easing Comparison', type: 'Timing Functions', component: 'EasingComparisonAnimation' },
      { name: 'Custom Easing', type: 'Custom Curves', component: 'CustomEasingAnimation' },
      { name: 'Bezier Curves', type: 'Complex Timing', component: 'BezierAnimation' },
    ]
  },
];

const BasicAnimationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Basic Animations</Text>
          <Text style={styles.headerDescription}>
            Fundamental animations using React Native's Animated API
          </Text>
        </View>

        <View style={styles.content}>
          {basicAnimations.map((category) => (
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

export default BasicAnimationsScreen;