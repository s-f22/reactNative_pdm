import { React, useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
import { Icon } from '@rneui/themed'

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

  const deleteItemOracle = async (cod_previsao) => {
    axios.delete(oracleUrl + `/${cod_previsao}`)
      .then(showToast())
      .then(getHistorico())
  }

  const showToast = () => {
    ToastAndroid.show("Item removido do histórico.", ToastAndroid.LONG);
  };


  const Item = ({ cidade, data_previsao, cod_previsao }) => (
    <View style={styles.item}>

      <Text style={styles.city}>{cidade}</Text>
      <View style={styles.dadosDataConsulta}>
        <Text style={styles.infosData}>Data da consulta:</Text>
        <Text style={styles.infos}>{moment(data_previsao).locale('pt-br').format('LLL')}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteItemOracle(cod_previsao)} style={styles.btnExcluir}>
        <Icon
          name='trash'
          type='font-awesome'
          color='#517fa4'
        />
      </TouchableOpacity>
    </View>
  );


  const renderItem = ({ item }) => (
    <Item
      cidade={item.cidade}
      data_previsao={item.data_previsao}
      cod_previsao={item.cod_previsao}
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
    <View style={styles.pgContainer}>
      <Text style={styles.titulo}>Suas pesquisas recentes:</Text>
      <FlatList
        data={resposta.items}
        renderItem={renderItem}
        keyExtractor={item => item.cod_previsao}
        style={styles.container}
        //horizontal={true}
        numColumns={1}
        //columnWrapperStyle={true}
        centerContent={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  pgContainer: {
    width: '100%',
    height: '127%',
    //backgroundColor: 'yellow',
  },
  container: {
    //display: 'flex',
    //backgroundColor: 'blue',
    alignSelf: 'center',
    width: '100%'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#ECECEC',
    marginHorizontal: '2%',
    width: '93%',
    justifyContent: 'space-around',
    padding: 5,
    marginTop: '1%',
    marginBottom: '.5%',
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',

    shadowColor: 'gray', shadowOpacity: .1,
    shadowOffset: { width: 5, height: 5 }
    //alignContent: 'center',
    //alignSelf: 'center',
  },
  dadosDataConsulta: {
    width: '35%',
    //marginRight: '5%',
    //backgroundColor: 'red',
  },
  infos: {
    fontSize: 14,
    color: '#767676',
    textAlign: 'center',
    paddingHorizontal: 5,
    alignItems: 'center',
    alignContent: 'center',
    //backgroundColor: 'cyan',
  },
  infosData: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#7393B3',
    textAlign: 'center',
    alignItems: 'flex-end',
    //backgroundColor: 'blue',
  },
  city: {
    fontSize: 20,
    color: '#1434A4',
    marginBottom: 5,
    textAlign: 'center',
    width: '50%',
    //marginHorizontal: '10%'
    //backgroundColor: 'yellow'
  },
  titulo: {
    fontSize: 26,
    color: '#767676',
    textAlign: 'center',
    marginBottom: '2%',
  },
  btnExcluir: {
    padding: 7,
    marginLeft: 5,
    //backgroundColor: 'yellow',
  }
});