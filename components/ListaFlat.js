import { React, useState } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { ListItem, Avatar } from '@rneui/themed'


export default function ListaFlat() {

  const mockData = require('../assets/mock.json')
  const baseUrl = "api.openweathermap.org/data/2.5/forecast"
  const apiKey = "cd6a6dcf37771d34beb24817c6c3fd40";

  const [response, setResponse] = useState(mockData);
  const [cidade, setCidade] = useState('');

  const requestUrl = `https://${baseUrl}?q=${cidade}&cnt&units=metric&lang=pt_br&appid=${apiKey}`;



  const getPrevisao = async () => {
    console.log('Request: ', requestUrl);
    const { data } = await axios.get(requestUrl);
    console.log('Response: ', data)
    setResponse(data);
  };

  /*
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
*/

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
      <ListItem.Content style={styles.card}>
        <ListItem.Title>{item.dt_txt}</ListItem.Title>
        <ListItem.Subtitle>{item.main.temp_max}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.main.temp_min}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )


  return (
    <View>
      <TextInput
        placeholder='Digite a cidade'
        value={cidade}
        onChangeText={text => setCidade(text)}
        style={styles.inputCidade}
      />
      {/* <Button title="Toggle Toast" onPress={() => showToast()} /> */}
      <TouchableOpacity
        onPress={() => getPrevisao()}
        style={styles.botaoPesquisar}
      >
        <Text style={{textAlign: 'center'}} >Pesquisar</Text>
      </TouchableOpacity>
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
    marginTop: 30,
    fontSize: 32,
    color: 'black',
    textAlign: 'center'
  },
  botaoPesquisar: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 30,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    borderRadius: 15
  },
  inputCidade: {
    width: '90%',
    height: 30,
    //backgroundColor: 'gold',
    alignSelf: 'center',
    textAlign: 'center'
  },
  card: {
    backgroundColor: 'lime',
    alignItems: 'center'
  }
});