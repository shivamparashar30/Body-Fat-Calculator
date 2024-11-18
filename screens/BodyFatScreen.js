
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  Animated,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { getModel, convertBase64ToTensor } from '../src/helper/tensor-helper';

const BodyFatScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const animationValue = useRef(new Animated.Value(1)).current; // Initial scale value

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await getModel();
      if (loadedModel) {
        setModel(loadedModel);
      } else {
        Alert.alert('Error', 'Could not load the model');
      }
    };
    loadModel();
  }, []);

  const startImageAnimation = () => {
    return new Promise((resolve) => {
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => resolve()); // Ensure the promise resolves after the animation ends
    });
  };

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const sourceUri = response.assets && response.assets[0].uri;
          setImageUri(sourceUri);
          setPrediction(null); // Reset previous predictions
        }
      }
    );
  };

  const deleteImage = () => {
    setImageUri(null);
    setPrediction(null);
    setIsLoading(false);
  };

  const predictBodyFat = async () => {
    setIsLoading(true);
    setPrediction(null);

    if (!imageUri) {
      await startImageAnimation();
      Alert.alert('Failed', 'No image selected for analysis');
      setIsLoading(false);
      return;
    }

    try {
      await startImageAnimation();

      const response = await fetch(imageUri);
      const imageData = await response.blob();
      const base64 = await imageData.text();

      // Convert base64 image to tensor
      const tensor = await convertBase64ToTensor(base64);
      if (tensor) {
        // Predict body fat percentage
        const result = model.predict(tensor);
        const bodyFatPercentage = result.dataSync()[0];
        setPrediction(bodyFatPercentage);
      } else {
        Alert.alert('Failed', 'Failed to convert image to tensor');
      }
    } catch (error) {
      Alert.alert('Failed', 'Failed to analyze image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg1.png')} 
      style={styles.background}
    >
      <View style={{ marginTop: 110, marginHorizontal: 80, width: 250 }}>
        <Text style={styles.heading}>Body Fat Calculator</Text>
      </View>
      <View style={styles.container}>
        <Button title="Pick an image" onPress={handleImagePicker} />
        {imageUri && (
          <>
            <Animated.Image
              source={{ uri: imageUri }}
              style={[styles.image, { transform: [{ scale: animationValue }] }]}
            />
            <Button title="Delete Image" onPress={deleteImage} />
          </>
        )}
        <Button
          title="Predict Body Fat Percentage"
          onPress={predictBodyFat}
          disabled={!imageUri} 
        />
        {isLoading && <Text style={styles.analyzingText}>Analyzing image...</Text>}
        {!isLoading && prediction !== null && (
          <Text style={styles.predictionText}>
            Estimated Body Fat Percentage: {prediction.toFixed(2)}%
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: -100 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  image: { width: 200, height: 200, marginVertical: 10, borderRadius: 10 },
  analyzingText: { fontSize: 18, color: '#fff', marginTop: 10 },
  predictionText: { fontSize: 20, color: '#fff', marginTop: 10 },
});

export default BodyFatScreen;



