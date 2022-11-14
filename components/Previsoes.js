import { React, useState } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { ListItem, Icon } from '@rneui/themed'
import moment from 'moment/min/moment-with-locales';
import { verificarIcone } from '../functions/verificarIcones';


export default function ListaFlat() {

  const mockData = require('../assets/mock.json')
  const baseUrl = "api.openweathermap.org/data/2.5/forecast"
  const apiKey = "cd6a6dcf37771d34beb24817c6c3fd40";

  const [response, setResponse] = useState({});
  const [cidade, setCidade] = useState('');

  const requestUrl = `https://${baseUrl}?q=${cidade}&cnt&units=metric&lang=pt_br&appid=${apiKey}`;
  const oracleUrl = 'https://gb127a7e9e901c7-projetopdmrest.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/historico_previsoes/'

  moment.locale('pt-br');

  const getPrevisao = async () => {
    axios(requestUrl)
      .then(resposta => {
        if (resposta.status === 200) {
          setResponse(resposta.data)
        }
      })
      .then(setCidade(''))
      .catch(erro => console.log(erro));
  };


  const postPrevisao = async () => {
    const obj = {
      "cidade": response.city.name,
      "data_previsao": moment(new Date())
    }
    try {
      const resposta = await axios.post(
        oracleUrl, obj
      )
      if (resposta.status === 201) {
        console.log("Previsao cadastrada no DB");
      } else {
        console("Erro ao cadastrar no DB")
      }
    } catch (error) {
      console.log(error)
    }
  }


  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Icon
        name={verificarIcone(item.weather[0].main)}
        type='feather'
        color='#517fa4'
        style={{ marginStart: '10%' }}
      />
      <ListItem.Content style={styles.cardInfos}>
        <ListItem.Title>{moment(item.dt_txt).locale('pt-br').format('LLL')}</ListItem.Title>
        <View style={styles.temperaturas}>
          <View style={styles.maxmin}>
            <Text style={{ textAlign: 'center' }}>Temp. Max: </Text>
            <ListItem.Subtitle style={{ textAlign: 'center' }}>{item.main.temp_max} °C</ListItem.Subtitle>
          </View>
          <View style={styles.maxmin}>
            <Text style={{ textAlign: 'center' }}>Temp. Min: </Text>
            <ListItem.Subtitle style={{ textAlign: 'center' }}>{item.main.temp_min} °C</ListItem.Subtitle>
          </View>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )


  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Insira o nome da cidade'
        value={cidade}
        onChangeText={text => setCidade(text)}
        style={styles.inputCidade}
      />
      {/* <Button title="Toggle Toast" onPress={() => showToast()} /> */}
      <TouchableOpacity
        onPress={() => getPrevisao()}
        style={styles.botaoPesquisar}
      >
        <Text style={{ textAlign: 'center' }} >Pesquisar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => postPrevisao()}
        style={styles.botaoPesquisar}
      >
        <Text style={{ textAlign: 'center' }} >Cadastrar pesquisa</Text>
      </TouchableOpacity>
      {Object.keys(response).length > 0 && <Text style={styles.local}>{response.city.name}</Text>}
      <FlatList
        data={response.list}
        renderItem={renderItem}
        keyExtractor={item => item.dt}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    //   //flex: 1,
    //   //width: '100%',
    //   //height: '100%',
    //   alignItems: 'center',
    //   backgroundColor: 'steelblue',
  },
  infos: {
    fontSize: 26,
    color: 'white'
  },
  local: {
    marginTop: 10,
    fontSize: 32,
    color: 'black',
    textAlign: 'center'
  },
  botaoPesquisar: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 5,
    height: 30,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    borderRadius: 15
  },
  inputCidade: {
    width: '90%',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignSelf: 'center',
    //textAlign: 'end'
  },
  cardInfos: {
    //backgroundColor: 'lime',
    alignItems: 'center'
  },
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //backgroundColor: 'red',
    width: '100%'
  },
  maxmin: {
    flexDirection: 'column',
    //backgroundColor: 'yellow',
    textAlign: 'center',
    padding: 5
  }
});