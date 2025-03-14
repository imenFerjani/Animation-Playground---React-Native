// Import available animation examples
import FadeAnimation from './basic/FadeAnimation';
import FadeDelayAnimation from './basic/FadeDelayAnimation';
import TranslateAnimation from './basic/TranslateAnimation';
import ScaleAnimation from './basic/ScaleAnimation';
import RotateAnimation from './basic/RotateAnimation';
import ColorAnimation from './basic/ColorAnimation';

import SimpleDragAnimation from './gesture/SimpleDragAnimation';
import SwipeCardAnimation from './gesture/SwipeCardAnimation';
import PinchScaleAnimation from './gesture/PinchScaleAnimation';

import BasicSpringAnimation from './physics/BasicSpringAnimation';
import BouncingBallAnimation from './physics/BouncingBallAnimation';
//import ParticleFountainAnimation from './physics/ParticleFountainAnimation';

import SimpleAccordionAnimation from './layout/SimpleAccordionAnimation';
import ListItemAnimation from './layout/ListItemAnimation';
import GridListAnimation from './layout/GridListAnimation';

// Create dummy components for missing animations
const createDummyAnimation = (name) => {
  const DummyComponent = () => {
    return null;
  };
  DummyComponent.displayName = name;
  return DummyComponent;
};


// Export all animations in a single object, using actual components where available
// and placeholders for the rest
export default {
  // Basic animations
  FadeAnimation,
  FadeDelayAnimation,
  TranslateAnimation,
  ScaleAnimation,
  RotateAnimation,
  ColorAnimation,
  //FadeDelayAnimation: createDummyAnimation('FadeDelayAnimation'),
  FadeSequenceAnimation: createDummyAnimation('FadeSequenceAnimation'),
  //TranslateAnimation: createDummyAnimation('TranslateAnimation'),
  TranslateSpringAnimation: createDummyAnimation('TranslateSpringAnimation'),
  TranslatePathAnimation: createDummyAnimation('TranslatePathAnimation'),
  //ScaleAnimation: createDummyAnimation('ScaleAnimation'),
  PulseAnimation: createDummyAnimation('PulseAnimation'),
  ScaleBounceAnimation: createDummyAnimation('ScaleBounceAnimation'),
  //RotateAnimation: createDummyAnimation('RotateAnimation'),
  RotateLoopAnimation: createDummyAnimation('RotateLoopAnimation'),
  FlipAnimation: createDummyAnimation('FlipAnimation'),
  //ColorAnimation: createDummyAnimation('ColorAnimation'),
  RainbowAnimation: createDummyAnimation('RainbowAnimation'),
  ThemeAnimation: createDummyAnimation('ThemeAnimation'),
  EasingComparisonAnimation: createDummyAnimation('EasingComparisonAnimation'),
  CustomEasingAnimation: createDummyAnimation('CustomEasingAnimation'),
  BezierAnimation: createDummyAnimation('BezierAnimation'),
  
  // Gesture animations
  SimpleDragAnimation,
  SwipeCardAnimation,
  PinchScaleAnimation,
  //SimpleDragAnimation: createDummyAnimation('SimpleDragAnimation'),
  ConstrainedDragAnimation: createDummyAnimation('ConstrainedDragAnimation'),
  MultiDragAnimation: createDummyAnimation('MultiDragAnimation'),
  //SwipeCardAnimation: createDummyAnimation('SwipeCardAnimation'),
  SwipeActionAnimation: createDummyAnimation('SwipeActionAnimation'),
  DirectionSwipeAnimation: createDummyAnimation('DirectionSwipeAnimation'),
  ImageZoomAnimation: createDummyAnimation('ImageZoomAnimation'),
  //PinchScaleAnimation: createDummyAnimation('PinchScaleAnimation'),
  PinchRotateAnimation: createDummyAnimation('PinchRotateAnimation'),
  DragScaleAnimation: createDummyAnimation('DragScaleAnimation'),
  RotateDragAnimation: createDummyAnimation('RotateDragAnimation'),
  MapInteractionAnimation: createDummyAnimation('MapInteractionAnimation'),
  ThrowAnimation: createDummyAnimation('ThrowAnimation'),
  FlickAnimation: createDummyAnimation('FlickAnimation'),
  MomentumScrollAnimation: createDummyAnimation('MomentumScrollAnimation'),
  ButtonPressAnimation: createDummyAnimation('ButtonPressAnimation'),
  LongPressAnimation: createDummyAnimation('LongPressAnimation'),
  ProgressDragAnimation: createDummyAnimation('ProgressDragAnimation'),
  
  // Physics animations
  BasicSpringAnimation,
  BouncingBallAnimation,
  //ParticleFountainAnimation,
  //BasicSpringAnimation: createDummyAnimation('BasicSpringAnimation'),
  ConfigurableSpringAnimation: createDummyAnimation('ConfigurableSpringAnimation'),
  ChainedSpringAnimation: createDummyAnimation('ChainedSpringAnimation'),
  FallingObjectsAnimation: createDummyAnimation('FallingObjectsAnimation'),
  //BouncingBallAnimation: createDummyAnimation('BouncingBallAnimation'),
  ProjectileAnimation: createDummyAnimation('ProjectileAnimation'),
  BasicCollisionAnimation: createDummyAnimation('BasicCollisionAnimation'),
  MultiCollisionAnimation: createDummyAnimation('MultiCollisionAnimation'),
  ParticleCollisionAnimation: createDummyAnimation('ParticleCollisionAnimation'),
  FrictionAnimation: createDummyAnimation('FrictionAnimation'),
  DampedOscillationAnimation: createDummyAnimation('DampedOscillationAnimation'),
  AirResistanceAnimation: createDummyAnimation('AirResistanceAnimation'),
  AttractionAnimation: createDummyAnimation('AttractionAnimation'),
  RepulsionAnimation: createDummyAnimation('RepulsionAnimation'),
  OrbitAnimation: createDummyAnimation('OrbitAnimation'),
  ParticleFountainAnimation: createDummyAnimation('ParticleFountainAnimation'),
  ConfettiAnimation: createDummyAnimation('ConfettiAnimation'),
  FireworksAnimation: createDummyAnimation('FireworksAnimation'),
  
  // Layout animations
  SimpleAccordionAnimation,
  ListItemAnimation,
  GridListAnimation,
  SizeChangeAnimation: createDummyAnimation('SizeChangeAnimation'),
  PositionChangeAnimation: createDummyAnimation('PositionChangeAnimation'),
  LayoutTransitionAnimation: createDummyAnimation('LayoutTransitionAnimation'),
  //ListItemAnimation: createDummyAnimation('ListItemAnimation'),
  ListReorderAnimation: createDummyAnimation('ListReorderAnimation'),
  StaggeredListAnimation: createDummyAnimation('StaggeredListAnimation'),
  HeroTransitionAnimation: createDummyAnimation('HeroTransitionAnimation'),
  ViewMorphAnimation: createDummyAnimation('ViewMorphAnimation'),
  PhotoGridDetailAnimation: createDummyAnimation('PhotoGridDetailAnimation'),
  //SimpleAccordionAnimation: createDummyAnimation('SimpleAccordionAnimation'),
  NestedAccordionAnimation: createDummyAnimation('NestedAccordionAnimation'),
  CardExpansionAnimation: createDummyAnimation('CardExpansionAnimation'),
  //GridListAnimation: createDummyAnimation('GridListAnimation'),
  GridItemAnimation: createDummyAnimation('GridItemAnimation'),
  MasonryAnimation: createDummyAnimation('MasonryAnimation'),
  SlideTransitionAnimation: createDummyAnimation('SlideTransitionAnimation'),
  FadeTransitionAnimation: createDummyAnimation('FadeTransitionAnimation'),
  CustomPageTransitionAnimation: createDummyAnimation('CustomPageTransitionAnimation'),
};