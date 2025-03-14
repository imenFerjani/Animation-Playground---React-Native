import React, { useRef, useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  Dimensions,
  Platform, 
} from 'react-native';

const { width, height } = Dimensions.get('window');
const PARTICLE_COUNT = 15;
const GRAVITY = 0.2;

// Particle component
const Particle = ({ startX, startY, color, size, speed }) => {
  // Animation values
  const posX = useRef(new Animated.Value(startX)).current;
  const posY = useRef(new Animated.Value(startY)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  
  // Physics values - use useRef instead of const
  const velocityX = useRef((Math.random() * 2 - 1) * 3 * speed).current;
  const velocityY = useRef(-8 * speed - Math.random() * 4 * speed).current;
  
  // Use a mutable ref to track current velocities
  const velocityRef = useRef({
    x: velocityX,
    y: velocityY
  });
  
  // Animation frame ref
  const animationRef = useRef(null);
  
  // Start particle animation
  useEffect(() => {
    const animate = () => {
      // Update velocity with gravity
      velocityRef.current.y += GRAVITY * speed;
      
      // Get current positions
      const x = posX.__getValue();
      const y = posY.__getValue();
      
      // Update positions
      posX.setValue(x + velocityRef.current.x);
      posY.setValue(y + velocityRef.current.y);
      
      // Check if particle is out of bounds
      if (y > height - 100) {
        // Reset particle
        posX.setValue(startX);
        posY.setValue(startY);
        velocityRef.current.x = (Math.random() * 2 - 1) * 3 * speed;
        velocityRef.current.y = -8 * speed - Math.random() * 4 * speed;
        
        // Fade in effect
        opacity.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);
  
  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [
            { translateX: posX },
            { translateY: posY },
            { scale }
          ],
          opacity
        }
      ]}
    />
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
  particleContainer: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  emitter: {
    alignItems: 'center',
  },
  emitterBody: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#424242',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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

export default ParticleFountainAnimation;