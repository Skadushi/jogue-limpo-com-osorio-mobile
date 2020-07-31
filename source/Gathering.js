import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View, Image, Platform, StatusBar, Alert } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Footer, H1, FooterTab, Button, Title, Left, Right, Body, Icon, Text, H3, Badge, Spinner } from 'native-base';
import styles from './styles';
import axios from 'axios';
import URL_API from './Config/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Gathering() {
  const navigation = useNavigation()
  const [ districts, setDistricts ] = useState([]);
  const [ selected, setSelected ] = useState();

  const [fetchingAPI, setFetchingApi] = useState(true);
  const [requestSucess,setRequestSucess] = useState(true);
  
  const getDistrictsFromApi = React.useCallback(async () => {

    try {

      setFetchingApi(true);
      setRequestSucess(true)
      const response = await axios.get(URL_API.coleta);

      if(response.status !== 200){
        setRequestSucess(false);
        setFetchingApi(false);
      }
     
      setDistricts(group_by(response.data,'neighborhood').map(function (item){
        return {key: item.key,values:group_by(item.values,'type')};
      }));
      
      setFetchingApi(false);

    } catch (error) {
      console.log('erro em renderizar lista de coletas: ',error);
      setRequestSucess(false);
      setFetchingApi(false)
    }

  },[fetchingAPI]); 
 
    
  

  function group_by (lista, coluna) {
    var colunas = {};
    var resultado = [];
  
    lista.forEach(function (item) {
      var reg = {};
  
      colunas[item[coluna]] = colunas[item[coluna]] || [];
  
      for (var i in item) 
        if (i != coluna) 
          reg[i] = item[i]; 
  
      colunas[item[coluna]].push(reg);
    });
  
    for (var i in colunas) 
      resultado.push({key: i, values: colunas[i]});
  
    return resultado;
  }
  

  useEffect(() => {
    getDistrictsFromApi();
  }, []);

  return (
    <Container>
      <Header hasTabs style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={{color: 'white', marginLeft:15}}>Coleta de Lixo</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <SafeAreaView style={styles.content}>
          <ScrollView
              refreshControl={
              <RefreshControl
                refreshing={fetchingAPI}
                onRefresh={getDistrictsFromApi}
              />}
              >
      
      <Content style={styles.content}>
        
      
            <View style={styles.container}>
                <H1 style={[styles.title, {marginBottom: 5}]}>Selecione seu Bairro</H1>
                {
                fetchingAPI ? <Spinner color="green"/> :
                districts.length === 0 ? 
                <Text>{requestSucess ? 'Não existem dados cadastrados' : 'Ocorreu um problema no servidor, tente recarregar a página, ou visualizar esses dados mais tarde.'}</Text>
                :
                <>
                {districts.map((item, index) => {
                  return (
                    <View key={index} style={styles.districtsListView}>
                      <Button style={styles.districtsListButton} onPress={() => { setSelected(index !== selected ? index : undefined) }}>
                        <Text>{item.key}</Text>
                      </Button>
                      {
                        index === selected ? 
                          <View style={styles.districtsListInsideView} >

                            {
                              item.values.map((itemtypeGuatering,indexTypeGuatering) => {
                                return(
                                <View style={indexTypeGuatering == 0 ? styles.districtsListSelective : null}>
                                  <Text style={[styles.districtsListTexts, {color: '#1d814c', fontSize: 18, paddingBottom: 0}]}>{itemtypeGuatering.key}</Text>
                                  <Text style={styles.districtsListTexts}>{itemtypeGuatering.values[0].description}</Text>
                                </View>
                                )})
                            }
                          </View>
                          :
                          null
                      }
                    </View>
                  ) 
                })}
                </>
              }
            </View>
          
      </Content>
      </ScrollView>
          </SafeAreaView>
    </Container>
  );    
}