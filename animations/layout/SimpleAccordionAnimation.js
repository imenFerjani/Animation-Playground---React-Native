import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  LayoutAnimation, 
  Platform, 
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem = ({ title, content, expanded, onToggle }) => {
  // Rotation animation for the arrow icon
  const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  
  // Update rotation animation when expanded state changes
  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [expanded]);
  
  // Interpolate rotation value
  const arrowRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity 
        style={[
          styles.accordionHeader,
          expanded && styles.accordionHeaderActive
        ]} 
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <Ionicons name="chevron-forward" size={20} color="#212121" />
        </Animated.View>
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.accordionContent}>
          <Text style={styles.accordionContentText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const SimpleAccordionAnimation = ({ speed = 1, isPlaying = true }) => {
  // Expanded state for each accordion item
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  // Toggle accordion item
  const toggleAccordion = (index) => {
    // Configure the animation
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300 / speed,
    });
    
    // Set the active index (open or close)
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  // Accordion data
  const accordionData = [
    {
      title: 'What are React Native animations?',
      content: 'React Native animations allow you to create smooth transitions and visual feedback in your mobile apps. They help improve user experience by making the UI more interactive.'
    },
    {
      title: 'LayoutAnimation vs Animated API',
      content: 'LayoutAnimation provides simple animations for layout changes with minimal code. The Animated API offers more precise control over animations but requires more setup.'
    },
    {
      title: 'Performance considerations',
      content: 'For best performance, use useNativeDriver: true when possible to run animations on the native thread instead of the JS thread.'
    },
    {
      title: 'Best practices',
      content: 'Keep animations subtle and purposeful. Don\'t overuse animations as they can become distracting. Ensure animations complete quickly.'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Simple Accordion Animation</Text>
        <Text style={styles.description}>
          This example demonstrates expanding and collapsing content sections using LayoutAnimation.
          Tap each header to toggle its content visibility.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            expanded={expandedIndex === index}
            onToggle={() => toggleAccordion(index)}
          />
        ))}
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Component: LayoutAnimation
        </Text>
        <Text style={styles.codeComment}>
          // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  explanation: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  animationContainer: {
    flex: 1,
  },
  accordionItem: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  accordionHeaderActive: {
    backgroundColor: '#FBBC05',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  accordionContentText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  codeHint: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#212121',
    marginBottom: 4,
  },
  codeComment: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#757575',
    fontStyle: 'italic',
  },
});

export default SimpleAccordionAnimation;