import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';
import styles from '../styles';
import googleMapStyle from './MapStyle'

export default function CityMap() {
  const navigation = useNavigation();
  const mapStyle = googleMapStyle.style;
  const markers = [
    {
      latitude: -29.903667,
      longitude: -50.257223
    },
    {
      latitude: -29.8922,
      longitude:-50.2620
    },
    {
      latitude: -29.889351,
      longitude:-50.274193
    },
  ]

  return (
    <Container>
      <Header androidStatusBarColor='#d4c9ae' style={{backgroundColor: '#d4c9ae'}}/>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={styles.map}
          initialRegion={{
            latitude: -29.8922,
            longitude: -50.2620,
            latitudeDelta: 0.0400,
            longitudeDelta: 0.0400,
          }}
        >
          <Marker image={require('../../assets/truck.png')} coordinate={{ latitude:-29.8922, longitude:-50.2620 }}
          />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              image={require('../../assets/truck.png')}
            />
          ))}
        </MapView>
        <Button transparent style={styles.mapBackButton} onPress={() => { navigation.pop() }}>
          <Icon name='arrow-back' style={styles.mapBackButtonIcon}/>
        </Button>
      </View>
    </Container>
  );    
}


