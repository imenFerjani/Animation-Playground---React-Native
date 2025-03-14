import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, Platform,
  TouchableWithoutFeedback 
} from 'react-native';

const FadeAnimation = ({ speed = 1, isPlaying = true }) => {
  // Animation value for opacity
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Reference to control the animation
  const animationRef = useRef(null);

  useEffect(() => {
    // Start or stop the animation based on isPlaying prop
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
    
    // Cleanup on unmount
    return () => {
      stopAnimation();
    };
  }, [isPlaying, speed]);

  // Animation sequence
  const startAnimation = () => {
    // Reset any previous animation
    stopAnimation();
    
    // Create a new animation sequence
    animationRef.current = Animated.loop(
      Animated.sequence([
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000 / speed,
          useNativeDriver: true,
        }),
        // Hold at full opacity
        Animated.delay(500 / speed),
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000 / speed,
          useNativeDriver: true,
        }),
        // Hold at zero opacity
        Animated.delay(500 / speed),
      ])
    );
    
    // Start the animation
    animationRef.current.start();
  };

  // Stop animation
  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Simple Fade Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates a smooth opacity transition from transparent to opaque and back.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <Animated.View 
          style={[
            styles.box,
            {
              opacity: fadeAnim, // Bind opacity to animated value
            }
          ]}
        >
          <Text style={styles.boxText}>Fade</Text>
        </Animated.View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Properties: opacity
        </Text>
        <Text style={styles.codeComment}>
          // Animated.timing + opacity creates smooth fade effects
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
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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

export default FadeAnimation;