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
        style={styles.container}
        //horizontal={true}
        numColumns={2}
        columnWrapperStyle={true}
        centerContent={true}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    //backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    display: 'flex',

    //justifyContent: 'center'
  },
  item: {
    //backgroundColor: 'gray',
    marginHorizontal: '2.5%',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: '1%',
    marginBottom: '1%',
    borderRadius: 5
  },
  infos: {
    fontSize: 14,
    color: '#7393B3',
    textAlign: 'center'
  },
  city: {
    fontSize: 20,
    color: '#1434A4',
    marginBottom: 5,
    textAlign: 'center'
  },
  titulo: {
    fontSize: 26,
    color: '#767676',
    textAlign: 'center'
  }
});