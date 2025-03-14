import React, { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

const BasicSpringAnimation = ({ speed = 1, isPlaying = true }) => {
  // Create animated value for position
  const springAnim = useRef(new Animated.Value(0)).current;
  
  // Toggle state
  const [stretched, setStretched] = useState(false);
  
  // Spring animation config
  const getSpringConfig = () => ({
    tension: 40 * speed,    // Spring stiffness
    friction: 7,            // Controls bounce (lower = more bounce)
    useNativeDriver: true
  });

  // Trigger animation when stretched state changes or isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      Animated.spring(
        springAnim,
        {
          toValue: stretched ? 1 : 0,
          ...getSpringConfig(),
        }
      ).start();
    }
  }, [stretched, isPlaying, speed]);
  
  // Auto toggle if isPlaying is true
  useEffect(() => {
    let toggleInterval;
    
    if (isPlaying) {
      toggleInterval = setInterval(() => {
        setStretched(prev => !prev);
      }, 2000 / speed);
    }
    
    return () => {
      if (toggleInterval) clearInterval(toggleInterval);
    };
  }, [isPlaying, speed]);
  
  // Interpolate translation from springAnim
  const translateX = springAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100]
  });

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Basic Spring Animation</Text>
        <Text style={styles.description}>
          This animation uses spring physics for realistic motion. 
          The ball moves with natural bounce and overshoot.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <View style={styles.trackLine} />
        <TouchableWithoutFeedback onPress={() => setStretched(!stretched)}>
          <Animated.View 
            style={[
              styles.ball,
              {
                transform: [{ translateX }]
              }
            ]}
          >
            <Text style={styles.ballText}>Tap</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Function: Animated.spring()
        </Text>
        <Text style={styles.codeComment}>
          // tension: controls stiffness (higher = stiffer)
        </Text>
        <Text style={styles.codeComment}>
          // friction: controls damping (lower = more bounce)
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
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  ballText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
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

export default BasicSpringAnimation;