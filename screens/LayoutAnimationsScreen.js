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

// Layout animation examples data
const layoutAnimations = [
  {
    id: 'layoutchange',
    title: 'Layout Changes',
    description: 'Animate changes in component dimensions and position',
    icon: 'resize-outline',
    color: '#4285F4',
    examples: [
      { name: 'Size Change', type: 'Dimension Shift', component: 'SizeChangeAnimation' },
      { name: 'Position Change', type: 'Location Shift', component: 'PositionChangeAnimation' },
      { name: 'Layout Transition', type: 'Combined Changes', component: 'LayoutTransitionAnimation' },
    ]
  },
  {
    id: 'list',
    title: 'List Animations',
    description: 'Smooth transitions for list items and collections',
    icon: 'list-outline',
    color: '#EA4335',
    examples: [
      { name: 'List Item Add/Remove', type: 'Item Transition', component: 'ListItemAnimation' },
      { name: 'List Reordering', type: 'Sorting', component: 'ListReorderAnimation' },
      { name: 'Staggered List', type: 'Sequence Timing', component: 'StaggeredListAnimation' },
    ]
  },
  {
    id: 'shared',
    title: 'Shared Element',
    description: 'Elements that transition between screens and states',
    icon: 'git-merge-outline',
    color: '#34A853',
    examples: [
      { name: 'Hero Transition', type: 'Screen Change', component: 'HeroTransitionAnimation' },
      { name: 'View Morphing', type: 'Shape Change', component: 'ViewMorphAnimation' },
      { name: 'Photo Grid to Detail', type: 'Grid to Detail', component: 'PhotoGridDetailAnimation' },
    ]
  },
  {
    id: 'accordion',
    title: 'Expandable Layouts',
    description: 'Collapsible elements with smooth transitions',
    icon: 'chevron-down-outline',
    color: '#FBBC05',
    examples: [
      { name: 'Simple Accordion', type: 'Expand/Collapse', component: 'SimpleAccordionAnimation' },
      { name: 'Nested Accordions', type: 'Hierarchical', component: 'NestedAccordionAnimation' },
      { name: 'Card Expansion', type: 'Detail View', component: 'CardExpansionAnimation' },
    ]
  },
  {
    id: 'grid',
    title: 'Grid Layouts',
    description: 'Transitions for grid-based interfaces',
    icon: 'grid-outline',
    color: '#9C27B0',
    examples: [
      { name: 'Grid to List', type: 'Layout Switch', component: 'GridListAnimation' },
      { name: 'Grid Item Animation', type: 'Item Focus', component: 'GridItemAnimation' },
      { name: 'Masonry Layout', type: 'Dynamic Grid', component: 'MasonryAnimation' },
    ]
  },
  {
    id: 'pageview',
    title: 'Page Transitions',
    description: 'Smooth navigation between screens and views',
    icon: 'albums-outline',
    color: '#FF5722',
    examples: [
      { name: 'Slide Transition', type: 'Horizontal Slide', component: 'SlideTransitionAnimation' },
      { name: 'Fade Transition', type: 'Cross Fade', component: 'FadeTransitionAnimation' },
      { name: 'Custom Page Transitions', type: 'Complex Navigation', component: 'CustomPageTransitionAnimation' },
    ]
  },
];

const LayoutAnimationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Layout Animations</Text>
          <Text style={styles.headerDescription}>
            Smooth transitions for changing layouts and screen states
          </Text>
        </View>

        <View style={styles.content}>
          {layoutAnimations.map((category) => (
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

export default LayoutAnimationsScreen;