import { StyleSheet, StatusBar, View } from 'react-native';
import ListaFlat from './components/ListaFlat';
import { React, useState } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';

export default function App() {

  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'cyan',
          height: 5,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Pesquisar"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'search', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Histórico"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
          
        />

      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <ListaFlat />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <Text style={{ fontSize: 32 }} >Favorite</Text>
        </TabView.Item>

      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
    height: '87%',
    backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  previsoes: {
    //flex: 1,
    backgroundColor: 'blue'
  }
});
