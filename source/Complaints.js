import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Camera from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View, Platform, StatusBar, Linking, Alert, Image } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem, H2, CheckBox, Spinner } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import styles from './styles';
import axios from 'axios';
import { resizeImages } from './Helper/images';
import URL_API from './Config/Constants';
import requestsConfigList from './Config/requestsConfig';

export default function Complaints() {
  const navigation = useNavigation();
  const [ incognito, setIncognito ] = useState(false); 
  const [ selected, setSelected ] = useState("0");
  const [loading,setLoading] = useState(false);
  const [ permissionGallery, setPermissionGallery ] = useState("undetermined");
  const [ permissionCamera, setPermissionCamera ] = useState("undetermined");
  const [ images, setImages ] = useState([]);
  const [ imagesID, setImagesID ] = useState(0);
  const [ name, setName ] = useState('');
  const [ contact, setContact ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ district, setDistrict ] = useState('');
  const [ description, setDescription ] = useState('');

  async function pickImages(){
    if(images.length > 3){
      Alert.alert(
        'Máximo de fotos alcançado!',
        'Há um máximo de quatro fotos por denúncia, aproveite bem esse espaço.', 
        [
          {
            text: 'Ok',
          }
        ],
        {cancelable: true},
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      
      if (!result.cancelled) {
        result.id = imagesID;
        setImagesID(imagesID + 1);
        setImages([... images, result]);
      }
    }
  }

  async function captureImages(){
    if(images.length > 3){
      Alert.alert(
        'Máximo de fotos alcançado!',
        'Há um máximo de quatro fotos por denúncia, aproveite bem esse espaço.', 
        [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ],
        {cancelable: true},
      );
    } else {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      
      if (!result.cancelled) {
        result.id = imagesID;
        setImagesID(imagesID + 1);
        setImages([... images, result]);
      }
    }
  }

  async function sendRequestToApi() {   
    
    try {
    setLoading(true);
    //axios setup
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://saude.osorio.rs.gov.br:3003/';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

    const form = new FormData();

    form.append('name',name);
    form.append('phone',contact);
    form.append('typeReport',selected);
    form.append('adressOcurr',address + ' / ' + district);
    form.append('description',description);

    const resizedImgs = await resizeImages(images);

    resizedImgs.forEach(img => form.append('images',img));
    
    axios.post(URL_API.report,form,requestsConfigList.reqPostWithImage)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          Alert.alert(
            'Sucesso!',
            'Denúncia enviada com sucesso!',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
          setName('');
          setContact('')
          setAddress('');
          setDistrict('');
          setDescription('');
          setImages([]);
          setSelected(0);

        } else {
          setLoading(false);
          Alert.alert(
            'Oops!',
            'Ocorreu um erro no servidor!',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false },
          );

        }
      })
      .catch((error) =>{
        setLoading(false);
        console.log(error);
        Alert.alert(
          'Oops!',
          'Ocorreu um erro ao fazer a requisição!',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        );
      });
      
    } catch (err) {
      setLoading(false);
      console.log(err);
      Alert.alert(
        'Estamos com um problema no servidor.',
        'Tente mais tarde',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable:false},
      );
    } 

  }


  const handleSubmit = () => {
   
    if(incognito){
        Alert.alert(
          'Enviar com esses dados:',
          'Denuncia Anônima \n' +
          'Endereço: ' + address + '\n' + 
          'Bairro: ' + district + '\n' + 
          'Tipo: ' + selected + '\n' +
          'Descrição: ' + description + '\n' +
          'Quantidade de fotos: ' +  images.length,
          [
            {
              text: 'Não',
            },
            {text: 'OK', onPress: () => {
              sendRequestToApi();
            }},
          ],
          {cancelable: false},
        );
      
    } else {
        Alert.alert(
          'Enviar com esses dados:',
          'Nome:' + name + '\n' +
          'Contato:' + contact + '\n' +
          'Endereço: ' + address + '\n' + 
          'Bairro: ' + district + '\n' + 
          'Tipo: ' + selected + '\n' +
          'Descrição: ' + description + '\n' +
          'Quantidade de fotos: ' +  images.length,
          [
            {
              text: 'Não',
            },
            {text: 'OK', onPress: () => {
              sendRequestToApi();
            }},
          ],
          {cancelable: false},
        );
      
    }
  }

  const setIncognitoMode = () => {
    setIncognito(!incognito);
  }

  useEffect(() => {
    
    //from expo documentation
    (async() => {
                  
       await ImagePicker.requestCameraPermissionsAsync();
       await ImagePicker.requestCameraRollPermissionsAsync();

    })();

  }, []);

  function verifyInputs(){
    if(address.length > 0 && district.length > 0 && selected != 0 && description.length > 0 && incognito){
      return true;
    }else if(name.length > 0 && contact.length > 8 && address.length > 0 && district.length > 0 && selected != 0 && description.length > 0 && !incognito){
      return true;
    }else{
      return false;
    }
  }

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center', paddingStart: 30}}>
          <Title style={{color: 'white', marginLeft:15}}>Denúncias</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.navigate('ComplaintsHelp') }}>
            <Icon name='help' style={styles.whiteButtons} />
          </Button>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Content padder style={styles.content}>
        <View style={{padding: 5}}>
          <Form>
            <H2 style={styles.title}>Dados do Usuário</H2>
            {
              !incognito ? 
                <View>
                  <Item  style={styles.inputs} >
                    <Text style={styles.requiredInputs}>**</Text>
                    <Icon active name='person'/>
                    <Input placeholder='Nome' value={name}
                      onChangeText={(text) => {
                        setName(text);
                      }}
                    />
                  </Item>
                 
                  <Item style={styles.inputs} >
                    <Text style={styles.requiredInputs}>**</Text>
                    <Icon active name='phone-portrait' style={{marginEnd: 4}}/>
                    <TextInputMask style={styles.textInputMask}
                    placeholder="Telefone"
                    keyBoardType={'numeric'}
                    placeholderTextColor = "#555"
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) '
                    }}
                    value={contact}
                    onChangeText={(text) => {
                      setContact(text);
                    }}
                  />
                  </Item>
                </View>
                :
                null
            }
            <ListItem noBorder style={{padding: 0, marginStart: 13}}>
              <CheckBox  checked={incognito} color='#1d814c' onPress={setIncognitoMode}/>
              <Body style={{flex: 0}} onPress={setIncognitoMode}>
                <Text onPress={setIncognitoMode}>Denúncia Anônima</Text>
              </Body>
            </ListItem>
            <H2 style={styles.title}>Dados da Denúncia</H2>
            <Item style={styles.inputs} >
              <Text style={styles.requiredInputs}>*</Text>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número' value={address}
                onChangeText={(text) => {
                  setAddress(text);
                }}
              /> 
            </Item>
            
            <Item  style={styles.inputs} >
              <Text style={styles.requiredInputs}>*</Text>
              <Icon active name='map'/>
              <Input placeholder='Bairro' value={district}
                onChangeText={(text) => {
                  setDistrict(text);
                }}
              /> 
            </Item>
            
            <View style={styles.pickerContainer}>
              <Text style={styles.requiredInputs}>*</Text>
              <Icon name='clipboard' style={{color: 'black'}}/> 
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='arrow-down' />}
                style={styles.internalPickerContainer}
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) => setSelected(itemValue !== 0 ? itemValue : selected)}
                itemStyle={styles.pickerIosListItemContainer}
                itemTextStyle={styles.pickerIosListItemText}
                supportedOrientations='portrait'
                placeholder='Selecione uma opção'
                renderHeader={backAction =>
                  <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
                    <Left style={styles.sideHeaderButtonContainer}>
                      <Button transparent onPress={backAction}>
                        <Icon name='arrow-back' style={styles.whiteButtons} />
                      </Button>
                    </Left>
                    <Body style={{flex: 1, alignItems: 'center', paddingStart: 30}}>
                      <Title style={styles.whiteButtons}>Tipo de Denúncia</Title>
                    </Body>
                    <Right style={styles.sideHeaderButtonContainer}/>
                  </Header>}
              >
                  <Picker.Item label={"Selecione o tipo de denúncia:"} value={0} key={'unselectable'}/>
                  <Picker.Item label={"1 - Lixo e caliças em área irregular"} value={'Lixo e caliças em área irregular'} key={1} />
                  <Picker.Item label={"2 - Caminhão não passou"} value={'Caminhão não passou'} key={2} />
                  <Picker.Item label={"3 - Atraso do caminhão de lixo"} value={'Atraso do caminhão de lixo'} key={3} />
                  <Picker.Item label={"4 - Descarte de volumosos"} value={'Descarte de volumosos'} key={4} />
              </Picker>
            </View>
            
            <Text style={{color:'red',paddingLeft:15,fontSize:22,marginTop:10}}>*</Text>
            <Textarea 
              style={[styles.textarea,{borderColor: '#1d814c'}]} 
              rowSpan={5} bordered placeholder='Descreva a denúncia' 
              value={description} 
              onChangeText={(text) => { 
                setDescription(text) 
              }
            }/>
           
            <ListItem icon noBorder>
              <Left>
                <Icon name='photos' style={{color: 'black'}}/>
              </Left>
              <Body>
                <Text>Fotos:</Text>
              </Body>
              <Right style={{paddingEnd: 0}}>
                <Button transparent >
                  <Icon name='camera' style={styles.greenButtons} onPress={captureImages} />
                </Button>
                <Button transparent >
                  <Icon name='images' style={styles.greenButtons} onPress={pickImages}/>
                </Button>
              </Right>
            </ListItem>
            
            <View style={styles.imageVisualizerView}>
              <View style={{flex: 0, flexDirection: 'row'}}>
                {
                  images.map((image, index) => (
                    <View key={'view' + image.id + 'Id'} style={styles.imagesView}>
                      <Image source={{ uri: image.uri }} key={image.uri} style={styles.imagePreview} />
                      <Icon 
                        onPress={() => {
                          setImages(function arrayRemove() {
                            return images.filter(function(ele){
                                return ele != image;
                            });
                          });
                        }} 
                        style={styles.smallButton}
                        key={'button' + image.id + 'id'}
                        name='remove-circle'
                      />
                    </View>
                  ))   
                }
              </View>
              {
                images.length !== 0 ? <Text note style={[styles.generalTexts, {padding: 10}]}>Obs: as imagens serão enviadas em seu formato original, as miniaturas são apenas uma demonstração.</Text> : null
              }
            </View>

            <Text style={{color:'red',fontSize:16,paddingLeft:15,marginTop:5,marginBottom:5}}>Os campos marcados com (*) são de preenchimento obrigatório.</Text>
            <Text style={{color:'red',fontSize:16,paddingLeft:15,marginTop:5,marginBottom:20}}>Os campos marcados com (**) são de preenchimento obrigatório, somente se a denúncia NÃO for anônima.</Text>

          </Form>
        </View>
      </Content>
      <Footer>
      {
        verifyInputs() ?
        <FooterTab style={styles.anatomy}>
            {
              loading ? 
              <Button full  style={styles.footerButton}>
                <Spinner color="white"/>
              </Button>
              :
              <Button full style={styles.footerButton} onPress={handleSubmit}>
                <Text style={styles.footerButtonText}>
                  <Icon style={styles.footerButtonText} name='megaphone' /> Denuncie
                </Text>
              </Button>
            }   
          
        </FooterTab>
        :
        <FooterTab style={{margin:0,padding:0}}>
          <Button full disabled style={{padding:0}} >
            <Text style={{fontSize:16,padding:10,color:'white'}}>
              <Icon style={{fontSize:16,padding:10,color:'white'}} name='megaphone' /> Denuncie
            </Text>
          </Button>
        </FooterTab>
      }      
      </Footer>
    </Container>
  );
}