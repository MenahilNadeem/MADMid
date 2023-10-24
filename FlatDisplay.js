import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useBitcoinData from './useBitcoinData';

const FlatDisplay = () => {
  const { data, error } = useBitcoinData();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.currency}</Text>
      <Text>Rate: {item.rate}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Coin Desk Bitcoin Price Index</Text>
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item) => item.currency}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  flatList: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'darkblue',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default FlatDisplay;
