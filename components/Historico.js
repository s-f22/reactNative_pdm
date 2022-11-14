import { React, useState } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import axios from 'axios';
import { ListItem, Icon } from '@rneui/themed'
import moment from 'moment/min/moment-with-locales';
import { verificarIcone } from '../functions/verificarIcones';


export default function ListaFlat() {

  const mockData = require('../assets/mock.json')
  const baseUrl = "api.openweathermap.org/data/2.5/forecast"
  const apiKey = "cd6a6dcf37771d34beb24817c6c3fd40";

  const [response, setResponse] = useState({});

  const oracleUrl = "https://gb127a7e9e901c7-projetopdmrest.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/historico_previsoes/"

  moment.locale('pt-br');

  const getHistorico = async () => {
    const data = await axios.get("https://gb127a7e9e901c7-projetopdmrest.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/historico_previsoes/", {
      headers: {
        
      },
    });
    console.log('\n\n\nResponse: ', data)
    //setResponse(data);
  };




  const Item = ({ cidade, data_previsao }) => (
    <View style={styles.item}>
      <Text style={styles.infos}>Cidade: {cidade}</Text>
      <Text style={styles.infos}>Data da consulta: {moment(data_previsao).locale('pt-br').format('LLL')}</Text>
    </View>
  );


  const renderItem = ({ item }) => (
    <Item
      cidade={item.cidade}
      data_previsao={item.data_previsao}
    />
  );


  return (
    <View>
      
      <Button
        title='Pesquisar'
        onPress={() => getHistorico()}
      />
      <Text style={styles.local}>Suas pesquisas recentes:</Text>
      <FlatList
        data={response.items}
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