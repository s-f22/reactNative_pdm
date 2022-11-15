import { React, useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';

export default function Historico(props) {

  const [resposta, setResposta] = useState({});

  const oracleUrl = "https://gb127a7e9e901c7-projetopdmrest.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/historico_previsoes/"

  moment.locale('pt-br');

  const getHistorico = async () => {
    axios(oracleUrl)
      .then(response => {
        if (response.status === 200) {
          setResposta(response.data)
        }
      })
      //.then(console.log(resposta.items))
      .catch(erro => console.log(erro));
  };


  const Item = ({ cidade, data_previsao }) => (
    <View style={styles.item}>
      <Text style={styles.city}>{cidade}</Text>
      <Text style={styles.infos}>Data da consulta:</Text>
      <Text style={styles.infos}>{moment(data_previsao).locale('pt-br').format('LLL')}</Text>
    </View>
  );


  const renderItem = ({ item }) => (
    <Item
      cidade={item.cidade}
      data_previsao={item.data_previsao}
    />
  );


  useEffect(() => {
    setTimeout(() => {
      getHistorico()
    }, 2000);
    //console.log("A CIDADE no historico É: ", props.cidadeAtual)
    return (
      setResposta({})
    )
  }, [props.cidadeAtual]);


  return (
    <View>
      <Text style={styles.titulo}>Suas pesquisas recentes:</Text>
      <FlatList
        data={resposta.items}
        renderItem={renderItem}
        keyExtractor={item => item.cod_previsao}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  item: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6600cc',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: '5%',
    borderRadius: 5
  },
  infos: {
    fontSize: 14,
    color: 'white',
  },
  city: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5
  },
  titulo: {
    fontSize: 26,
    color: 'black',
    textAlign: 'center'
  }
});