import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [newEvent, setNewEvent] = useState('')
  const [events, setEvents] = useState([])

  const goalInputHandler = (text) => {
    setNewEvent(text)
  }

  const addEventHandler = () => {
    setEvents(events => [...events, { key: Math.random().toString(), value: newEvent }])
    setNewEvent('')
  }
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Enter Event" style={styles.input}
          onChangeText={goalInputHandler}
          value={newEvent}
        ></TextInput>
        <Button title="ADD" onPress={addEventHandler} />
      </View>
      <FlatList 
        keyExtractor={(item, index) => item.key}
        data={events}
        renderItem={itemData => (
        <View style={styles.listItem}>
          <Text>{itemData.item.value}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  inputContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  input: { width: '80%', borderColor: 'black', borderWidth: 1, padding: 10, margin: 5 },
  listItem: { padding: 10, margin: 5, backgroundColor: '#ccc', borderColor: 'black', borderWidth: 1 }
})
