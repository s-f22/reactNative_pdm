import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useState } from 'react'



export default function ListaFlat() {

  const api = require('../assets/mock.json')

  const [response, setResponse] = useState(api);

  function timeConverter(timestamp) {
    let a = new Date(timestamp * 1000);
    let months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  const Item = ({ data, temp_max, temp_min }) => (
    <View style={styles.item}>
      <Text style={styles.infos}>{data}</Text>
      <Text style={styles.infos}>Max: {temp_max}º</Text>
      <Text style={styles.infos}>Min: {temp_min}º</Text>
    </View>
  );


  const renderItem = ({ item }) => (
    <Item
      data={timeConverter(item.dt)}
      temp_max={item.main.temp_max}
      temp_min={item.main.temp_min}
    />
  );

  return (
    <View>
      <Text style={styles.local}>{response.city.name}</Text>
      <FlatList
        data={response.list}
        renderItem={renderItem}
        keyExtractor={item => item.dt}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  item: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6600cc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  infos: {
    fontSize: 26,
    color: 'white'
  },
  local: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center'
  }
});