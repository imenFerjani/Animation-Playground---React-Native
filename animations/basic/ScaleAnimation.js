import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

const ScaleAnimation = ({ speed = 1, isPlaying = true }) => {
  // Animation value for scale - make sure this is properly initialized
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
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
        // Scale up
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000 / speed,
          useNativeDriver: true,
        }),
        // Scale down
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000 / speed,
          useNativeDriver: true,
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

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Scale Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates growing and shrinking elements using the scale transform property.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <Animated.View 
          style={[
            styles.box,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={styles.boxText}>Scale</Text>
        </Animated.View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          {"Key Properties: transform: [{ scale }]"}
        </Text>
        <Text style={styles.codeComment}>
          // scale transforms resize an element without affecting layout
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
    width: 100,
    height: 100,
    backgroundColor: '#34A853',
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

export default ScaleAnimation;