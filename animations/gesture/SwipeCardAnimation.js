import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  PanResponder,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

const SwipeCardAnimation = ({ speed = 1, isPlaying = true }) => {
  const [cardsComplete, setCardsComplete] = useState(0);
  
  // Animation values for position and rotation
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-width/2, 0, width/2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });
  
  // Create pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Handle swipe right
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: { x: width + 100, y: gestureState.dy },
            useNativeDriver: true,
            speed: 20 * speed,
          }).start(() => {
            setCardsComplete(c => c + 1);
            position.setValue({ x: 0, y: 0 });
          });
        } 
        // Handle swipe left
        else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: { x: -width - 100, y: gestureState.dy },
            useNativeDriver: true,
            speed: 20 * speed,
          }).start(() => {
            setCardsComplete(c => c + 1);
            position.setValue({ x: 0, y: 0 });
          });
        }
        // Return to center if not swiped far enough
        else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      }
    })
  ).current;

  // Card colors for the deck
  const cardColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9C27B0', '#FF5722'];
  
  // Get a color based on the current card index
  const getCardColor = () => {
    return cardColors[cardsComplete % cardColors.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Swipe Card Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates a card swiping gesture commonly used in dating or decision apps.
          Swipe right or left to dismiss the card.
        </Text>
      </View>
      
      <View style={styles.animationContainer}>
        <View style={styles.cardStack}>
          {/* Background cards (static) */}
          <View style={[styles.card, styles.cardBackground, { backgroundColor: cardColors[(cardsComplete + 2) % cardColors.length] }]}>
            <Text style={styles.cardText}>Swipe Me</Text>
          </View>
          
          <View style={[styles.card, styles.cardBackground, { backgroundColor: cardColors[(cardsComplete + 1) % cardColors.length] }]}>
            <Text style={styles.cardText}>Swipe Me</Text>
          </View>
          
          {/* Front card (animated) */}
          <Animated.View 
            style={[
              styles.card,
              {
                backgroundColor: getCardColor(),
                transform: [
                  { translateX: position.x },
                  { translateY: position.y },
                  { rotate: rotation }
                ]
              }
            ]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.cardText}>Swipe Me</Text>
            <Text style={styles.cardCounter}>Card #{cardsComplete + 1}</Text>
          </Animated.View>
        </View>
        
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Swipe right or left to dismiss
          </Text>
        </View>
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Components: PanResponder + Animated.ValueXY + detection logic
        </Text>
        <Text style={styles.codeComment}>
          // Check gesture.dx against threshold to determine swipe direction
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
  cardStack: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardBackground: {
    top: 5,
    left: 5,
    opacity: 0.7,
  },
  cardText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardCounter: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  instructions: {
    marginTop: 220,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
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

export default SwipeCardAnimation;