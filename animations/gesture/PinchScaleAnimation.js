import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  PanResponder,
  Image,
  Platform
} from 'react-native';

const PinchScaleAnimation = ({ speed = 1, isPlaying = true }) => {
  // Animation values for scale
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = Animated.multiply(baseScale, pinchScale);
  
  // Distance for pinch calculation
  const [lastDistance, setLastDistance] = useState(0);
  
  // Create pan responder for pinch gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      
      // Handle touch events with multiple touches (pinch)
      onPanResponderMove: (evt, gestureState) => {
        // Handle pinch with two touches
        if (evt.nativeEvent.touches.length === 2) {
          // Calculate distance between two touches
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          
          // Simple Euclidean distance formula
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );
          
          // Calculate pinch scale
          if (lastDistance) {
            const scale = distance / lastDistance;
            // Clamp scale to prevent extreme values
            const newScale = Math.min(Math.max(0.5, scale), 2);
            pinchScale.setValue(newScale);
          }
          
          // Save current distance for next move event
          setLastDistance(distance);
        }
      },
      
      // Reset pinch scale when touch ends
      onPanResponderRelease: () => {
        setLastDistance(0);
        // Animate scale back to original
        Animated.spring(pinchScale, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true,
        }).start();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Pinch to Scale Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates pinch-to-zoom gesture using multiple touch points.
          Use two fingers to pinch or spread the image to resize it.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.imageContainer,
            { transform: [{ scale }] }
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Pinch to resize</Text>
          </View>
        </Animated.View>
        
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            ✌️ Use two fingers to pinch in or out
          </Text>
        </View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Features: Multi-touch detection and distance calculation
        </Text>
        <Text style={styles.codeComment}>
          // Calculate distance between two touch points to determine scale
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  instructions: {
    marginTop: 40,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  instructionText: {
    fontSize: 14,
    color: '#424242',
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

export default PinchScaleAnimation;