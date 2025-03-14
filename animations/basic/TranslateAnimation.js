import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  Platform,
} from 'react-native';

const TranslateAnimation = ({ speed = 1, isPlaying = true }) => {
  // Create animated value for position
  const position = useRef(new Animated.Value(0)).current;
  
  // Animation reference
  const animationRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
    
    return () => {
      stopAnimation();
    };
  }, [isPlaying, speed]);

  // Start animation
  const startAnimation = () => {
    stopAnimation();
    
    // Move box from left to right and back
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 1,
          duration: 1500 / speed,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0,
          duration: 1500 / speed,
          useNativeDriver: true,
        })
      ])
    );
    
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
        <Text style={styles.title}>Simple Translation Animation</Text>
        <Text style={styles.description}>
          This animation moves an element horizontally across the screen using translateX.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <View style={styles.trackLine} />
        <Animated.View 
          style={[
            styles.box,
            {
              transform: [{ 
                translateX: position.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 100]
                }) 
              }]
            }
          ]}
        >
          <Text style={styles.boxText}>Move</Text>
        </Animated.View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Properties: transform: [{"{"} translateX {"}"}]
        </Text>
        <Text style={styles.codeComment}>
          // translateX/Y moves elements without affecting layout
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
  trackLine: {
    width: 250,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#EA4335',
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

export default TranslateAnimation;