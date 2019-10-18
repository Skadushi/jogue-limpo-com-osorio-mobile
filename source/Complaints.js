import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Camera from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View, Platform, StatusBar, Linking, Alert, Image } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem, H1, H2, CheckBox } from 'native-base';
import styles from './styles';

export default function Complaints() {
  const navigation = useNavigation();
  const [ text, setText ] = useState('');
  const [ incognito, setIncognito ] = useState(false); 
  const [ inputError, setInputError ] = useState(false);
  const [ selected, setSelected ] = useState(0);
  const [ permissionGallery, setPermissionGallery ] = useState("undetermined");
  const [ permissionCamera, setPermissionCamera ] = useState("undetermined");
  const [ images, setImages ] = useState([]);
  const [ imagesID, setImagesID ] = useState(0);

  async function getPermissionGallery(){
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setPermissionGallery(permission.status);
  }
  async function getPermissionCamera(){
    const permission = await Permissions.askAsync(Permissions.CAMERA);
    setPermissionCamera(permission.status);
  }

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
        mediaTypes: ImagePicker.MediaTypeOptions.All
      });
      
      if (!result.cancelled) {
        result.id = imagesID;
        setImagesID(imagesID + 1);
        setImages([... images, result]);
      }
    }
  }

  const incognitoMode = () => {
    setIncognito(!incognito);
    //clear fields
  }

  useEffect(() => {
    getPermissionGallery();
    getPermissionCamera();
  }, []);

  useEffect(() => {
    console.log(selected);
  })

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
                  <Item error={inputError} style={styles.inputs}>
                    <Icon active name='person'/>
                    <Input placeholder='Nome'/>
                  </Item>
                  <Item error={inputError} style={styles.inputs}>
                    <Icon active name='phone-portrait' style={{marginEnd: 4}}/>
                    <Input placeholder='Telefone' keyboardType='phone-pad' maxLength={11} />
                  </Item>
                </View>
                :
                null
            }
            <ListItem noBorder style={{padding: 0, marginStart: 13}}>
              <CheckBox  checked={incognito} color='#1d814c' onPress={incognitoMode}/>
              <Body style={{flex: 0}}>
                <Text onPress={incognitoMode}>Denúncia Anônima</Text>
              </Body>
            </ListItem>
            <H2 style={styles.title}>Dados da Denúncia</H2>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número'/>
            </Item>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='map'/>
              <Input placeholder='Bairro'/>
            </Item>
            <View style={styles.pickerContainer}>
              <Icon name='clipboard'/> 
              <Text style={{ paddingBottom: 1.5, paddingStart: 2, marginEnd: 10 }}> Tipo de denúncia:</Text>
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
                      <Title style={styles.whiteButtons}>Tipo de denúncia</Title>
                    </Body>
                    <Right style={styles.sideHeaderButtonContainer}/>
                  </Header>}
              >
                  <Picker.Item label={"Selecione uma opção:"} value={0} key={'unselectable'}/>
                  <Picker.Item label={"Lixo irregular"} value={1} key={1} />
                  <Picker.Item label={"Descarte de materiais incorreto"} value={2} key={2} />
                  <Picker.Item label={"Lâmpadas de mercúrio"} value={3} key={3} />
              </Picker>
            </View>
            <Textarea style={styles.textarea} rowSpan={3} bordered placeholder='Descreva sua denúncia' />
            <ListItem icon noBorder>
              <Left>
                <Icon name='photos'/>
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
          <Button full style={styles.footerButton}>
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='megaphone' /> Denuncie
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}


