import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

// Import animation components
import AnimationExamples from '../animations';

const { width } = Dimensions.get('window');

const AnimationDetailsScreen = ({ route, navigation }) => {
  const { title, component, category } = route.params;
  const [controlsVisible, setControlsVisible] = useState(true);
  const [speed, setSpeed] = useState(1); // Animation speed multiplier
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get the actual component to render
  const AnimationComponent = AnimationExamples[component] || (() => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Animation example not found</Text>
    </View>
  ));
  
  // Animation speed options
  const speedOptions = [0.5, 1, 1.5, 2];
  
  // Get category color for theme
  const getCategoryColor = () => {
    switch (category) {
      case 'fade':
      case 'translate':
      case 'spring':
      case 'layoutchange':
        return '#4285F4';
      case 'scale':
      case 'gravity':
      case 'shared':
        return '#34A853';
      case 'rotate':
      case 'collision':
      case 'accordion':
        return '#FBBC05';
      case 'color':
      case 'dampening':
      case 'grid':
        return '#9C27B0';
      case 'easing':
      case 'forces':
      case 'pageview':
        return '#FF5722';
      case 'drag':
      case 'swipe':
      case 'pinch':
      case 'combined':
      case 'velocity':
      case 'feedback':
      case 'particles':
      default:
        return '#EA4335';
    }
  };
  
  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Toggle animation play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Change animation speed
  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
  };

  // Get category title
  const getCategoryTitle = () => {
    switch (category) {
      case 'fade':
      case 'translate':
      case 'scale':
      case 'rotate':
      case 'color':
      case 'easing':
        return 'Basic Animation';
      
      case 'drag':
      case 'swipe':
      case 'pinch':
      case 'combined':
      case 'velocity':
      case 'feedback':
        return 'Gesture Animation';
      
      case 'spring':
      case 'gravity':
      case 'collision':
      case 'dampening':
      case 'forces':
      case 'particles':
        return 'Physics Animation';
      
      case 'layoutchange':
      case 'list':
      case 'shared':
      case 'accordion':
      case 'grid':
      case 'pageview':
        return 'Layout Animation';
      
      default:
        return 'Animation Example';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {/* Animation Display Area */}
        <View 
          style={[
            styles.animationContainer, 
            { borderColor: getCategoryColor() }
          ]}
        >
          <AnimationComponent 
            speed={speed} 
            isPlaying={isPlaying} 
          />
        </View>
        
        {/* Animation Controls */}
        <Animatable.View 
          style={styles.controlsContainer}
          animation={controlsVisible ? 'fadeIn' : 'fadeOut'}
          duration={300}
        >
          <View style={styles.controlsRow}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={togglePlay}
            >
              <Ionicons 
                name={isPlaying ? 'pause' : 'play'} 
                size={24} 
                color="#212121" 
              />
              <Text style={styles.controlText}>
                {isPlaying ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.speedControls}>
              <Text style={styles.speedLabel}>Speed:</Text>
              <View style={styles.speedButtons}>
                {speedOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.speedButton,
                      speed === option && styles.speedButtonActive
                    ]}
                    onPress={() => changeSpeed(option)}
                  >
                    <Text style={[
                      styles.speedButtonText,
                      speed === option && styles.speedButtonTextActive
                    ]}>
                      {option}x
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={toggleFavorite}
            >
              <Ionicons 
                name={isFavorite ? 'heart' : 'heart-outline'} 
                size={24} 
                color={isFavorite ? '#F44336' : '#212121'} 
              />
              <Text style={styles.controlText}>
                {isFavorite ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        
        {/* Animation Details */}
        <ScrollView style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <View>
              <Text style={styles.categoryLabel}>{getCategoryTitle()}</Text>
              <Text style={styles.detailsTitle}>{title}</Text>
            </View>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() }]}>
              <Text style={styles.categoryBadgeText}>
                {getCategoryTitle().split(' ')[0]}
              </Text>
            </View>
          </View>
          
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            This example demonstrates {title.toLowerCase()} animation techniques in React Native.
            The animation showcases how to create fluid motion using React Native's Animated API.
          </Text>
          
          <Text style={styles.codeTitle}>Implementation</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ${component} = ({ speed = 1, isPlaying = true }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (isPlaying) {
      // Animation logic specific to this example
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000 / speed,
          useNativeDriver: true
        })
      ).start();
    }
    
    return () => {
      animatedValue.stopAnimation();
    };
  }, [isPlaying, speed]);
  
  // Rest of component implementation
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedElement,
          {
            // Animated styles
          }
        ]}
      />
    </View>
  );
};

export default ${component};`}
            </Text>
          </View>
          
          <View style={styles.tipContainer}>
            <Ionicons name="bulb-outline" size={24} color="#FBBC05" style={styles.tipIcon} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Pro Tip</Text>
              <Text style={styles.tipText}>
                Try combining this animation technique with others for even more complex and interesting effects.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  animationContainer: {
    height: 300,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 2,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#757575',
  },
  controlsContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
  },
  controlText: {
    marginTop: 4,
    fontSize: 12,
    color: '#757575',
  },
  speedControls: {
    alignItems: 'center',
  },
  speedLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  speedButtons: {
    flexDirection: 'row',
  },
  speedButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  speedButtonActive: {
    backgroundColor: '#6200ee',
  },
  speedButtonText: {
    fontSize: 12,
    color: '#757575',
  },
  speedButtonTextActive: {
    color: 'white',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
    marginBottom: 24,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#212121',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  tipIcon: {
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});

export default AnimationDetailsScreen;