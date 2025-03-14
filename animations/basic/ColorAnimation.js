import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  Platform,
} from 'react-native';

const ColorAnimation = ({ speed = 1, isPlaying = true }) => {
  // Animation value for color
  const colorAnim = useRef(new Animated.Value(0)).current;
  
  // Animation reference
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
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 1500 / speed,
          useNativeDriver: false, // Color animations cannot use native driver
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 1500 / speed,
          useNativeDriver: false, // Color animations cannot use native driver
        }),
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

  // Interpolate color
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9C27B0', '#4285F4']
  });

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Color Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates color transitions using interpolation with Animated values.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <Animated.View 
          style={[
            styles.box,
            {
              backgroundColor
            }
          ]}
        >
          <Text style={styles.boxText}>Color</Text>
        </Animated.View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Properties: backgroundColor: colorAnim.interpolate()
        </Text>
        <Text style={styles.codeComment}>
          // Color animations require interpolation and cannot use useNativeDriver
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
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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

export default ColorAnimation;