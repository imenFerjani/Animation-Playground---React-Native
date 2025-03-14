import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

const FadeDelayAnimation = ({ speed = 1, isPlaying = true }) => {
  // Animation values for multiple elements
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  
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

  // Animation sequence with delays
  const startAnimation = () => {
    // Reset any previous animation
    stopAnimation();
    
    // Create a new animation sequence with delays
    animationRef.current = Animated.loop(
      Animated.sequence([
        // Reset all opacities to 0
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim3, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        
        // First box fades in
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 500 / speed,
          useNativeDriver: true,
        }),
        
        // Second box fades in after a delay
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 500 / speed,
          useNativeDriver: true,
        }),
        
        // Third box fades in after another delay
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 500 / speed,
          useNativeDriver: true,
        }),
        
        // Hold for a moment
        Animated.delay(1000 / speed),
        
        // All boxes fade out together
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 0,
            duration: 800 / speed,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 800 / speed,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim3, {
            toValue: 0,
            duration: 800 / speed,
            useNativeDriver: true,
          }),
        ]),
        
        // Pause before restarting
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
        <Text style={styles.title}>Fade with Delay Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates how to create staggered fade effects with delays between elements.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <Animated.View 
          style={[
            styles.box, 
            styles.box1,
            { opacity: fadeAnim1 }
          ]}
        >
          <Text style={styles.boxText}>1</Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.box, 
            styles.box2,
            { opacity: fadeAnim2 }
          ]}
        >
          <Text style={styles.boxText}>2</Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.box, 
            styles.box3,
            { opacity: fadeAnim3 }
          ]}
        >
          <Text style={styles.boxText}>3</Text>
        </Animated.View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Properties: Animated.sequence and delays
        </Text>
        <Text style={styles.codeComment}>
          // Animated.sequence creates timed sequential animations
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
    flexDirection: 'row',
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
  },
  box1: {
    backgroundColor: '#4285F4',
  },
  box2: {
    backgroundColor: '#EA4335',
  },
  box3: {
    backgroundColor: '#34A853',
  },
  boxText: {
    color: 'white',
    fontSize: 20,
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

export default FadeDelayAnimation;