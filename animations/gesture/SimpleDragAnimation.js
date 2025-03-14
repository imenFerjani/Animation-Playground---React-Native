import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  PanResponder,
  Platform,
} from 'react-native';

const SimpleDragAnimation = ({ speed = 1, isPlaying = true }) => {
  // Create animated values for position
  const pan = useRef(new Animated.ValueXY()).current;
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Create pan responder
  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setShowInstructions(false);
        // Set offset when drag starts
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        // Reset animated values
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // Flatten the offset to avoid strange behavior
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Simple Drag Animation</Text>
        <Text style={styles.description}>
          This example demonstrates a basic draggable element using PanResponder. 
          Touch and drag the box to move it around.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        {showInstructions && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>Touch and drag the box</Text>
          </View>
        )}
        
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y }
              ]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.boxText}>Drag Me</Text>
        </Animated.View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Components: PanResponder + Animated.ValueXY
        </Text>
        <Text style={styles.codeComment}>
          // PanResponder tracks touch gestures and updates position
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
  instructionsContainer: {
    position: 'absolute',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 5,
  },
  instructions: {
    color: 'white',
    fontSize: 14,
  },
  box: {
    width: 100,
    height: 100,
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

export default SimpleDragAnimation;