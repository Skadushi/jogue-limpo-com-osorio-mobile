import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Camera from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View, Platform, StatusBar, Linking, Alert, Image } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem, H2, CheckBox } from 'native-base';
import styles from './styles';
import axios from 'axios';
import { resizeImages } from './Helper/images';
import URL_API from './Config/Constants';
import requestsConfigList from './Config/requestsConfig';

export default function Complaints() {
  const navigation = useNavigation();
  const [ sent, setSent ] = useState(false);
  const [ internet, setInternet ] = useState(); 
  const [ incognito, setIncognito ] = useState(false); 
  const [ inputError, setInputError ] = useState(false);
  const [ selected, setSelected ] = useState(0);
  const [ permissionGallery, setPermissionGallery ] = useState("undetermined");
  const [ permissionCamera, setPermissionCamera ] = useState("undetermined");
  const [ images, setImages ] = useState([]);
  const [ imagesID, setImagesID ] = useState(0);
  const [ name, setName ] = useState('');
  const [ contact, setContact ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ district, setDistrict ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ validateName, setValidateName ] = useState(false);
  const [ validateContact, setValidateContact ] = useState(false); 
  const [ validateAddress, setValidateAddress ] = useState(false); 
  const [ validateDistrict, setValidateDistrict ] = useState(false); 
  const [ validateDescription, setValidateDescription ] = useState(false);
  const [ validateType, setValidateType ] = useState(false);
  const [ validatePhotos, setValidatePhotos ] = useState(false);
 
  /*async function getPermissionGallery(){
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setPermissionGallery(permission.status);
  }
  async function getPermissionCamera(){
    const permission = await Permissions.askAsync(Permissions.CAMERA);
    setPermissionCamera(permission.status);
  }*/

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
        mediaTypes: ImagePicker.MediaTypeOptions.All
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });
      
      if (!result.cancelled) {
        result.id = imagesID;
        setImagesID(imagesID + 1);
        setImages([... images, result]);
      }
    }
  }

  async function sendRequestToApi() {    
   
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
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
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
          setValidateName(false);
          setValidateContact(false);
          setValidateAddress(false);
          setValidateDistrict(false);
          setValidateType(false);
          setValidateDescription(false);
          setValidatePhotos(false);

        } else {
          
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

  }

  const checkInternet = () => {
    console.log('4');
    Linking.canOpenURL("https://google.com").then(connection => {
      if (!connection) {
        setInternet(false);
        Alert.alert(
          'Oops!',
          'Conecte-se à internet para mandar a denúncia!',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        );
      } else {
        setInternet(true);
        sendRequestToApi();
      }
    });
  };

  const handleSubmit = () => {
    setSent(true);
    verifyImages();
    console.log('1');
    if(incognito){
      console.log('2');
      if(validateAddress && validateDistrict && validateDescription && selected !== 0 && validatePhotos){
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
              checkInternet();
              setSent(false);
            }},
          ],
          {cancelable: false},
        );
      } 
    } else {
      console.log('3');
      if(validateName && validateContact && validateAddress && validateDistrict && validateDescription && selected !== 0 && validatePhotos){
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
              checkInternet();
              setSent(false);
            }},
          ],
          {cancelable: false},
        );
      }
    }
  }

  const setIncognitoMode = () => {
    setIncognito(!incognito);
  }

  const verifyImages = () => {
    if(selected === 2 || selected === 4){
      setValidatePhotos(true);
    } else {
      if(images.length === 0){
        setValidatePhotos(false);
      } else {
        setValidatePhotos(true);
      }
    }
  }

  /*useEffect(() => {
    getPermissionGallery();
    getPermissionCamera();
  }, []);*/

  useEffect(() => {
    
    //from expo documentation
    (async() => {
                  
       await ImagePicker.requestCameraPermissionsAsync();
       await ImagePicker.requestCameraRollPermissionsAsync();

    })();

  }, []);


  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center', paddingStart: 30}}>
          <Title style={styles.whiteButtons}>Denúncias</Title>
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
        <View style={{padding: 10}}>
          <Form>
            <H2 style={styles.title}>Dados do Usuário</H2>
            {
              !incognito ? 
                <View>
                  <Item error={inputError} style={styles.inputs} error={sent && !validateName ? true : false}>
                    <Icon active name='person'/>
                    <Input placeholder='Nome' value={name}
                      onChangeText={(text) => {
                        if(text.length < 5) setValidateName(false); else setValidateName(true);
                        setName(text);
                      }}
                    />
                  </Item>
                  <Item error={inputError} style={styles.inputs} error={sent && !validateContact ? true : false}>
                    <Icon active name='phone-portrait' style={{marginEnd: 4}}/>
                    <Input placeholder='Telefone' keyboardType='phone-pad' maxLength={11} value={contact}
                      onChangeText={(text) => {
                        if(text.length < 8) setValidateContact(false); else setValidateContact(true);
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
            <Item error={inputError} style={styles.inputs} error={sent && !validateAddress ? true : false}>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número' value={address}
                onChangeText={(text) => {
                  if(text.length < 12) setValidateAddress(false); else setValidateAddress(true);
                  setAddress(text);
                }}
              /> 
            </Item>
            <Item error={true} style={styles.inputs}  error={sent && !validateDistrict ? true : false}>
              <Icon active name='map'/>
              <Input placeholder='Bairro' value={district}
                onChangeText={(text) => {
                  if(text.length < 8) setValidateDistrict(false); else setValidateDistrict(true);
                  setDistrict(text);
                }}
              /> 
            </Item>
            <View style={styles.pickerContainer}>
              <Icon name='clipboard' style={sent && selected === 0 ? {color: 'red'} : {color: 'black'}}/> 
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
                  <Picker.Item label={"1 - Lixo e caliças em área irregular"} value={1} key={1} />
                  <Picker.Item label={"2 - Caminhão não passou"} value={2} key={2} />
                  <Picker.Item label={"3 - Atraso do caminhão de lixo"} value={3} key={3} />
                  <Picker.Item label={"4 - Descarte de volumosos"} value={4} key={4} />
              </Picker>
            </View>
            <Textarea 
              style={[styles.textarea, sent && !validateDescription ? {borderColor: 'red'} : {borderColor: '#1d814c'}]} 
              rowSpan={5} bordered placeholder='Descreva a denúncia' 
              value={description} 
              onChangeText={(text) => { 
                if(text.length < 20) setValidateDescription(false); else setValidateDescription(true);
                setDescription(text) 
              }
            }/>
            {
              sent && !validateDescription ?
                <Text style={[styles.generalTexts, {color: 'red', marginStart: 15}]}>Por favor, informe mais dados sobre a denúncia.</Text>
                :
                null
            }
            <ListItem icon noBorder>
              <Left>
                <Icon name='photos' style={!validatePhotos && sent ? {color: 'red'} : {color: 'black'}}/>
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
          </Form>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.footerButton} onPress={handleSubmit}>
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='megaphone' /> Denuncie
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}