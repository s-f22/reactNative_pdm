import { React, useState } from 'react'
import { View, FlatList, StyleSheet, Text, Button, TextInput } from 'react-native';
import axios from 'axios';


export default function ListaFlat() {

  const mockData = require('../assets/mock.json')
  const baseUrl = "api.openweathermap.org/data/2.5/forecast"
  const apiKey = "cd6a6dcf37771d34beb24817c6c3fd40";
  
  const [response, setResponse] = useState({});
  const [cidade, setCidade] = useState('');
  
  const requestUrl = `https://${baseUrl}?q=${cidade}&cnt&units=metric&lang=pt_br&appid=${apiKey}`;

  // function timeConverter(timestamp) {
  //   let a = new Date(timestamp * 1000);
  //   let months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  //   let year = a.getFullYear();
  //   let month = months[a.getMonth()];
  //   let date = a.getDate();
  //   let hour = a.getHours();
  //   let min = a.getMinutes();
  //   let sec = a.getSeconds();
  //   let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  //   return time;
  // }

  const getPrevisao = async () => {
    console.log('Request: ', requestUrl);
    const { data } = await axios.get(requestUrl);
    console.log('Response: ', data)
    setResponse(data);
  };

  const Item = ({ data, temp_max, temp_min }) => (
    <View style={styles.item}>
      <Text style={styles.infos}>{data}</Text>
      <Text style={styles.infos}>Max: {temp_max} ºC</Text>
      <Text style={styles.infos}>Min: {temp_min} ºC</Text>
    </View>
  );


  const renderItem = ({ item }) => (
    <Item
      //data={timeConverter(item.dt)}
      data={item.dt_txt}
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
        onPress={() => getPrevisao()}
      />
      {/* <Text style={styles.local}>{response.city.name}</Text> */}
      {
        Object.keys(response).length > 0 && <Text style={styles.local}>{response.city.name}</Text>
      }
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