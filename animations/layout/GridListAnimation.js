import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

// Sample data for the list/grid
const initialData = Array(20).fill(0).map((_, i) => ({
  id: (i + 1).toString(),
  title: `Item ${i + 1}`,
  color: getRandomColor(),
}));

// Get random color for items
function getRandomColor() {
  const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9C27B0', '#FF5722'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const GridListAnimation = ({ speed = 1, isPlaying = true }) => {
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState(initialData);
  
  // Configure animation speed
  const configureAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 300 / speed,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
  };
  
  // Toggle between grid and list view
  const toggleView = () => {
    configureAnimation();
    setIsGridView(!isGridView);
  };
  
  // Calculate item width based on grid or list view
  const getItemWidth = () => {
    return isGridView ? (width - 48) / 2 : width - 32;
  };
  
  // Calculate number of columns based on view mode
  const getNumColumns = () => {
    return isGridView ? 2 : 1;
  };
  
  // Calculate item height based on view mode
  const getItemHeight = () => {
    return isGridView ? 120 : 80;
  };
  
  // Render item component
  const renderItem = ({ item }) => (
    <View 
      style={[
        styles.item, 
        { 
          backgroundColor: item.color,
          width: getItemWidth(),
          height: getItemHeight(),
        }
      ]}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>Grid/List Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates transitioning between grid and list layouts.
          Tap the button to toggle between views.
        </Text>
      </View>
      
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleView}
        >
          <Ionicons 
            name={isGridView ? 'list' : 'grid'} 
            size={20} 
            color="white" 
          />
          <Text style={styles.toggleButtonText}>
            {isGridView ? 'Switch to List' : 'Switch to Grid'}
          </Text>
        </TouchableOpacity>
        
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={getNumColumns()}
          key={isGridView ? 'grid' : 'list'}
          contentContainerStyle={styles.listContent}
        />
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Components: LayoutAnimation + FlatList with numColumns
        </Text>
        <Text style={styles.codeComment}>
          // FlatList key prop must change to re-render with different numColumns
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
  contentContainer: {
    flex: 1,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9C27B0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  item: {
    margin: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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

export default GridListAnimation;