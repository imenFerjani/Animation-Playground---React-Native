AnimMotion: Interactive Animation Playground for React Native
AnimMotion is a comprehensive mobile application built with React Native and Expo that demonstrates a wide range of animation techniques. This educational app serves as both a learning tool and a reference guide for developers looking to implement animations in their mobile applications.
Show Image
Features

Interactive Animation Examples: Explore 60+ animation examples across four categories
Live Animation Controls: Adjust animation speed, pause/play, and experiment with animation parameters
Detailed Code Examples: Learn implementation details for each animation technique
Cross-Platform: Works on both iOS and Android using React Native

Animation Categories
Basic Animations
Fundamental transitions using the React Native Animated API:

Fade In/Out
Translation
Scaling
Rotation
Color Transitions
Easing Functions

Gesture Animations
Touch-driven animations with user interaction:

Drag & Drop
Card Swipe
Pinch to Zoom
Multi-Touch Gestures
Swipe Actions
Touch Feedback

Physics Animations
Realistic motion with physics simulation:

Spring Effects
Bouncing
Gravity & Falling
Particle Systems
Collision Detection
Force Fields

Layout Animations
Component layout transitions:

List Item Add/Remove
Grid/List Toggle
Accordion Expansion
Shared Element Transitions
Custom Layout Changes

Technical Implementation
AnimMotion showcases several key React Native animation concepts:

Animated API: Core animation capabilities
PanResponder: Touch and gesture handling
LayoutAnimation: Automatic layout transitions
Interpolation: Value mapping for complex animations
useNativeDriver: Performance optimization for animations

Getting Started
Prerequisites

Node.js & npm
Expo CLI
React Native development environment

Installation

Clone the repository:

git clone [https://github.com/imenFerjani/Animation-Playground---React-Native.git]
cd animmotion

Install dependencies:

npm install

Start the development server:

expo start

Run on your device or simulator by scanning the QR code with Expo Go app

Project Structure
animmotion/
├── App.js                    # Main application entry point
├── screens/                  # Main navigation screens
│   ├── HomeScreen.js
│   ├── BasicAnimationsScreen.js
│   ├── GestureAnimationsScreen.js
│   ├── PhysicsAnimationsScreen.js
│   ├── LayoutAnimationsScreen.js
│   └── AnimationDetailsScreen.js
├── animations/               # Animation examples
│   ├── index.js              # Animation registry
│   ├── basic/                # Basic animation examples
│   ├── gesture/              # Gesture animation examples
│   ├── physics/              # Physics animation examples
│   └── layout/               # Layout animation examples
└── assets/                   # Images and resources
Key Dependencies

react-native: Core framework
expo: Development toolchain
@react-navigation/native & @react-navigation/stack: Navigation
react-native-gesture-handler: Gesture recognition
react-native-reanimated: Advanced animations (optional)

Educational Value
This project was created for learning purposes and covers:

Implementing animations with React Native's built-in APIs
Creating smooth, responsive user interfaces
Building performance-optimized animations
Combining different animation techniques for complex effects

Contributing
Contributions are welcome! If you'd like to add new animation examples or improve existing ones:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-animation)
Commit your changes (git commit -m 'Add new wave animation')
Push to the branch (git push origin feature/amazing-animation)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

React Native team for creating an excellent animation system
Expo team for simplifying the React Native development experience
The open-source community for inspiration and examples


Created by Imen Ferjani as an educational resource for the React Native community.
