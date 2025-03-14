import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  Platform,
} from 'react-native';

const RotateAnimation = ({ speed = 1, isPlaying = true }) => {
  // Animation value for rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Animation reference for cleanup
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
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000 / speed,
        useNativeDriver: true,
      })
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

  // Interpolate rotation value to degrees
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Rotation Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates how to rotate elements using the rotate transform property.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <Animated.View 
          style={[
            styles.box,
            {
              transform: [{ rotate: spin }]
            }
          ]}
        >
          <Text style={styles.boxText}>Rotate</Text>
        </Animated.View>
      </View>
      
      <View style={styles.codeHint}>
      <Text style={styles.codeText}>
  Key Properties: transform: {`[{ rotate: spin }]`}
</Text>
        <Text style={styles.codeComment}>
          // rotate needs to be interpolated to degree values like '0deg', '360deg'
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
    width: 120,
    height: 120,
    backgroundColor: '#FBBC05',
    borderRadius: 8,
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

export default RotateAnimation;