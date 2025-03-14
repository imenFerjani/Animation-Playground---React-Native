import React, { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  Dimensions,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

const { height } = Dimensions.get('window');
const GRAVITY = 0.5;
const BALL_HEIGHT = 60;

const BouncingBallAnimation = ({ speed = 1, isPlaying = true }) => {
  // Create animated value for ball position
  const ballY = useRef(new Animated.Value(0)).current;
  
  // State for controlling animation
  const [isAnimating, setIsAnimating] = useState(isPlaying);
  
  // References for physics simulation
  const velocityRef = useRef(0);
  const frameRef = useRef(null);
  const containerHeightRef = useRef(0);
  const containerOffsetRef = useRef(0);
  
  // Update animation state when isPlaying prop changes
  useEffect(() => {
    setIsAnimating(isPlaying);
  }, [isPlaying]);
  
  // Effect for animation loop
  useEffect(() => {
    if (isAnimating) {
      startPhysicsAnimation();
    } else {
      stopPhysicsAnimation();
    }
    
    return () => {
      stopPhysicsAnimation();
    };
  }, [isAnimating, speed]);
  
  // Start physics-based animation loop
  const startPhysicsAnimation = () => {
    stopPhysicsAnimation();
    
    // Set initial velocity
    velocityRef.current = 0;
    
    // Animation frame loop
    const animate = () => {
      // Apply gravity (adjusted by speed)
      velocityRef.current += GRAVITY * speed;
      
      // Get current Y position
      const currentY = ballY.__getValue();
      
      // Calculate new position
      let newY = currentY + velocityRef.current;
      
      // Check for collision with bottom
      const maxY = containerHeightRef.current - BALL_HEIGHT - 60;
      if (newY > maxY) {
        // Bounce with energy loss (bounce factor)
        newY = maxY;
        velocityRef.current = -velocityRef.current * 0.7;
        
        // Stop if almost not moving
        if (Math.abs(velocityRef.current) < 0.5) {
          velocityRef.current = 0;
          newY = maxY;
        }
      }
      
      // Update position
      ballY.setValue(newY);
      
      // Continue animation loop
      if (isAnimating) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Start animation loop
    frameRef.current = requestAnimationFrame(animate);
  };
  
  // Stop animation loop
  const stopPhysicsAnimation = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };
  
  // Reset ball position to top
  const resetBall = () => {
    velocityRef.current = 0;
    ballY.setValue(0);
  };
  
  // Handle press on the animation area
  const handlePress = () => {
    resetBall();
  };
  
  // Set container dimensions
  const handleLayout = (event) => {
    containerHeightRef.current = event.nativeEvent.layout.height;
    containerOffsetRef.current = event.nativeEvent.layout.y;
  };

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Bouncing Ball Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates physics-based bouncing with gravity and bounce dampening.
          Tap the animation area to reset the ball.
        </Text>
      </View>
      
      <TouchableWithoutFeedback onPress={handlePress}>
        <View 
          style={styles.animationContainer}
          onLayout={handleLayout}
        >
          <View style={styles.ground} />
          
          <Animated.View 
            style={[
              styles.ball,
              {
                transform: [{ translateY: ballY }]
              }
            ]}
          />
          
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              Tap to reset ball
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Concepts: Gravity simulation and collision detection
        </Text>
        <Text style={styles.codeComment}>
          // Apply gravity to velocity, detect collisions, and apply bounce factor
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  ball: {
    width: BALL_HEIGHT,
    height: BALL_HEIGHT,
    borderRadius: BALL_HEIGHT / 2,
    backgroundColor: '#EA4335',
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -BALL_HEIGHT / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  ground: {
    height: 20,
    backgroundColor: '#E0E0E0',
    width: '100%',
    borderRadius: 10,
    marginBottom: 40,
  },
  instructions: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 8,
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

export default BouncingBallAnimation;