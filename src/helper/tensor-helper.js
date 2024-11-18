import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';

// const modelJson = require('../../src/model/model.json');
// const modelWeights = require('../../src/model/weights.bin');
const modelUrl = "https://teachablemachine.withgoogle.com/models/S2v5ohlha/model.json";
      // const loadedModel = await tf.loadLayersModel(modelUrl);

export const getModel = async () => {
  try {
    await tf.ready();
    return await tf.loadLayersModel(modelUrl);
  } catch (error) {
    console.log('Could not load model', error);
  }
};

export const convertBase64ToTensor = async (base64) => {
  try {
    const uIntArray = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const decodedImage = decodeJpeg(uIntArray, 3);
    return decodedImage.reshape([1, 224, 224, 3]);  // Assuming 224x224 input and 3 channels
  } catch (error) {
    console.log('Could not convert base64 string to tensor', error);
  }
};
