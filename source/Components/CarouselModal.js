import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Button, Icon } from 'native-base';

const {width: screenWidth} = Dimensions.get('window');

export default function CarouselModal ({imagesCarousel}) {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    
    setEntries(imagesCarousel);
    console.log('entries');
    console.log(entries);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
      console.log('item');
      console.log(item);
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
     
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
      {
          entries.length > 1 ?
          <View style={{alignItems:'center',flex:1,alignSelf:'center'}}>
            <Button light rounded iconLeft onPress={goForward} style={{padding:10}}>
                <Text style={{fontSize:20}}>Próxima foto</Text>
                <Icon name="arrow-forward" style={{color:'black'}} />
            </Button>
          </View>
          :
          null
      }
      
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
  },
  item: {
    width: screenWidth ,
    height: screenWidth ,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    //backgroundColor: 'white',
    //borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});