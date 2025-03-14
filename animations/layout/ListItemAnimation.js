import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Sample data for the list
const initialData = [
  { id: '1', title: 'Item 1', content: 'This is the content for Item 1' },
  { id: '2', title: 'Item 2', content: 'This is the content for Item 2' },
  { id: '3', title: 'Item 3', content: 'This is the content for Item 3' },
  { id: '4', title: 'Item 4', content: 'This is the content for Item 4' },
  { id: '5', title: 'Item 5', content: 'This is the content for Item 5' },
];

const ListItemAnimation = ({ speed = 1, isPlaying = true }) => {
  const [data, setData] = useState(initialData);
  const [nextId, setNextId] = useState(6);
  
  // Handle animation speed
  const getAnimationConfig = () => ({
    duration: 300 / speed,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  });
  
  // Add a new item to the list
  const addItem = () => {
    // Configure animation
    LayoutAnimation.configureNext(getAnimationConfig());
    
    // Create new item
    const newItem = {
      id: nextId.toString(),
      title: `Item ${nextId}`,
      content: `This is the content for Item ${nextId}`
    };
    
    // Add to list
    setData([newItem, ...data]);
    setNextId(nextId + 1);
  };
  
  // Remove an item from the list
  const removeItem = (id) => {
    // Configure animation
    LayoutAnimation.configureNext(getAnimationConfig());
    
    // Remove from list
    setData(data.filter(item => item.id !== id));
  };
  
  // Render item component
  const renderItem = ({ item }) => (
    <Animated.View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="close-circle" size={24} color="#EA4335" />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemContent}>{item.content}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.explanation}>
        <Text style={styles.title}>List Item Animation</Text>
        <Text style={styles.description}>
          This animation demonstrates adding and removing items from a list with smooth transitions.
          Tap the Add button to insert a new item. Tap the X to remove an item.
        </Text>
      </View>
      
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addItem}
        >
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
        
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
      
      <View style={styles.codeHint}>
        <Text style={styles.codeText}>
          Key Component: LayoutAnimation
        </Text>
        <Text style={styles.codeComment}>
          // LayoutAnimation.configureNext() animates all layout changes
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
  listContainer: {
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  itemContent: {
    fontSize: 14,
    color: '#757575',
  },
  deleteButton: {
    padding: 4,
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

export default ListItemAnimation;