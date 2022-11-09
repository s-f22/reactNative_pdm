import React from 'react';
import { Button, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react'
import axios from 'axios';



export default function ListaFlat() {

  const api = require('../assets/mock.json')
  const key = 'cd6a6dcf37771d34beb24817c6c3fd40'
  const [response, setResponse] = useState(api);
  const [cidade, setCidade] = useState('');

  const getCidade = async () => {
    console.log(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&appid=${key}`)
    await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&appid=${key}`)
      .then(response => {
        console.log(response)
        getPrevisao(response.data[0].lat, response.data[0].lon)
      })
      .catch(response => {
        alert('Digite uma cidade válida!')
        console.log('Erro')
      })
  };

  const getPrevisao = async (lat, lon) => {
    console.log(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`)
    const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
    console.log(data)
    setResponse(data);
  };

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
      <TextInput
        placeholder='Digite a cidade'
        value={cidade}
        onChangeText={text => setCidade(text)}
      />
      <Button
        title='Pesquisar'
        onPress={getCidade}
      />
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