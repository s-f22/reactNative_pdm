import { React, useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ToastAndroid, Alert, Modal, Pressable } from 'react-native';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
import { Icon } from '@rneui/themed'
import * as Animatable from 'react-native-animatable'

export default function Historico(props) {

  const [resposta, setResposta] = useState([]);
  const [idItemOracle, serIdItemOracle] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const oracleUrl = "https://gb127a7e9e901c7-projetopdmrest.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/historico_previsoes/"

  moment.locale('pt-br');

  const getHistorico = async () => {
    axios(oracleUrl)
      .then(response => {
        if (response.status === 200) {
          setResposta(response.data.items.sort(function (a, b) {
            var dateA = a.data_previsao;
            var dateB = b.data_previsao;
            return dateA < dateB ? 1 : -1; // ? -1 : 1 para ordem crescente/decrescente order
          }))
          
        }
      })
      //.then(console.log(resposta.items))
      .catch(erro => console.log(erro));
  };

  const deleteItemOracle = async (cod_previsao) => {
    axios.delete(oracleUrl + `/${cod_previsao}`)
      .then(response => {
        if (response.status === 200 || response.status === 204) {

          setModalVisible(false);
          setTimeout(() => {
            getHistorico()
          }, 2000);
          showToast()
        }
      })
      //.then(console.log(resposta.items))
      .catch(erro => console.log(erro));

  }

  const showToast = () => {
    ToastAndroid.show("Item removido do histórico.", ToastAndroid.LONG);
  };

  

  <View style={styles.centeredView}>

  </View>

const acionarExclusao = (idOracle) => {
  setModalVisible(true);
  serIdItemOracle(idOracle)
}



  const Item = ({ cidade, data_previsao, cod_previsao }) => (

    <View  style={styles.item}>

      <Text style={styles.city}>{cidade}</Text>
      <View style={styles.dadosDataConsulta}>
        <Text style={styles.infosData}>Data da consulta:</Text>
        <Text style={styles.infos}>{moment(data_previsao).locale('pt-br').format('LLL')}</Text>
      </View>
      <TouchableOpacity onPress={() => acionarExclusao(cod_previsao)} style={styles.btnExcluir}>
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
      setResposta([])
    )
  }, [props.cidadeAtual]);


  return (
    <View style={styles.viewCentralizada}>
      <Text style={styles.titulo}>Suas pesquisas recentes:</Text>
      <FlatList
        data={resposta}
        renderItem={renderItem}
        keyExtractor={item => item.cod_previsao}
        style={styles.container}
        //horizontal={true}
        numColumns={1}
        //columnWrapperStyle={true}
        centerContent={true}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirmar exclusão:</Text>
            <View style={styles.containerBotoes}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => deleteItemOracle(idItemOracle)}
              >
                <Text style={styles.textStyle}>Sim</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  viewCentralizada: {
    width: '100%',
    height: '121%',
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '70%',
    margin: 20,
    backgroundColor: "#444444",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: '45%'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'white'
  },
  containerBotoes: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    //backgroundColor: 'red'
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
    //backgroundColor: 'yellow'
  },
  titulo: {
    fontSize: 26,
    color: '#767676',
    textAlign: 'center',
    marginBottom: '2%',
    marginTop: '2%'
  },
  btnExcluir: {
    padding: 7,
    marginLeft: 5,
    //backgroundColor: 'yellow',
  }
});