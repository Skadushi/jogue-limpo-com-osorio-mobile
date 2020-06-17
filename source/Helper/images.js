import * as ImageManipulator from "expo-image-manipulator";

const filenameFromPath = path => {
    return path.replace(/^.*(\\|\/|\:)/, '');
  }

export const resizeImages = async (images) => {

    const resizedImgs = [];

    for (let i = 0; i < images.length; i++) {
        let newImg = await ImageManipulator.manipulateAsync(images[i].uri, [ {resize: {width: 800}}])
        resizedImgs.push({
            uri: newImg.uri,
            name: 'userimage-' + filenameFromPath(newImg.uri),
            type: 'image/jpg'
          });
    }

    return resizedImgs;
}