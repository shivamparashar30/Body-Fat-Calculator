// import React, { useState, useEffect } from 'react';
// import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

// const BodyFatScreen = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   useEffect(() => {
//     // Initialize TensorFlow and load the model
//     const loadModel = async () => {
//       await tf.ready();
//       const modelUrl = "https://teachablemachine.withgoogle.com/models/S2v5ohlha/model.json";
//       const loadedModel = await tf.loadLayersModel(modelUrl);
//       setModel(loadedModel);
//     };
//     loadModel();
//   }, []);

//   const handleImagePicker = () => {
//     ImagePicker.launchImageLibrary(
//       { mediaType: 'photo', includeBase64: true },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorMessage) {
//           Alert.alert('Error', response.errorMessage);
//         } else {
//           // Ensure URI is compatible across platforms
//           const sourceUri = response.assets && response.assets[0].uri;
//           setImageUri(sourceUri);
//         }
//       }
//     );
//   };

//   const predictBodyFat = async () => {
//     if (model && imageUri) {
//       const response = await fetch(imageUri);
//       const imageData = await response.blob();
//       const image = await tf.browser.fromPixelsAsync(imageData);

//       // Preprocess image for model input
//       const resizedImage = tf.image.resizeBilinear(image, [224, 224]); // Assuming model input size is 224x224
//       const batchedImage = resizedImage.expandDims(0).toFloat().div(tf.scalar(255));

//       // Get prediction
//       const result = model.predict(batchedImage);
//       const bodyFatPercentage = result.dataSync()[0];
//       setPrediction(bodyFatPercentage);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image" onPress={handleImagePicker} />
//       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//       <Button title="Predict Body Fat Percentage" onPress={predictBodyFat} disabled={!imageUri || !model} />
//       {prediction !== null && <Text style={styles.predictionText}>Estimated Body Fat Percentage: {prediction.toFixed(2)}%</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
//   image: { width: 200, height: 200, marginVertical: 10 },
//   predictionText: { fontSize: 18, color: '#333', marginTop: 10 },
// });

// export default BodyFatScreen;

// second try


// import React, { useState, useEffect } from 'react';
// import { View, Button, Image, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
// import { getModel, convertBase64ToTensor } from '../src/helper/tensor-helper';

// const BodyFatScreen = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const loadModel = async () => {
//       const loadedModel = await getModel();
//       if (loadedModel) {
//         setModel(loadedModel);
//       } else {
//         Alert.alert('Error', 'Could not load the model');
//       }
//     };
//     loadModel();
//   }, []);

//   const handleImagePicker = () => {
//     ImagePicker.launchImageLibrary(
//       { mediaType: 'photo', includeBase64: true },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorMessage) {
//           Alert.alert('Error', response.errorMessage);
//         } else {
//           const sourceUri = response.assets && response.assets[0].uri;
//           setImageUri(sourceUri);
//         }
//       }
//     );
//   };

//   const predictBodyFat = async () => {
//     if (model && imageUri) {
//       setIsLoading(true);
//       try {
//         const response = await fetch(imageUri);
//         const imageData = await response.blob();
//         const base64 = await imageData.text();

//         // Convert base64 image to tensor
//         const tensor = await convertBase64ToTensor(base64);
//         if (tensor) {
//           // Predict body fat percentage
//           const result = model.predict(tensor);
//           const bodyFatPercentage = result.dataSync()[0];
//           setPrediction(bodyFatPercentage);
//         } else {
//           Alert.alert('Error', 'Failed to convert image to tensor.');
//         }
//       } catch (error) {
//         Alert.alert('Error', error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image" onPress={handleImagePicker} />
//       {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//       <Button title="Predict Body Fat Percentage" onPress={predictBodyFat} disabled={!imageUri || !model} />
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         prediction !== null && <Text style={styles.predictionText}>Estimated Body Fat Percentage: {prediction.toFixed(2)}%</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
//   image: { width: 200, height: 200, marginVertical: 10 },
//   predictionText: { fontSize: 18, color: '#333', marginTop: 10 },
// });

// export default BodyFatScreen;






// animation + styles
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Button, Image, Text, StyleSheet, Alert, Animated, ImageBackground, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
// import { convertBase64ToTensor } from '../helpers/tensor-helper'; // Helper function to convert image to tensor

// const BodyFatScreen = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const lineAnimation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Load the TensorFlow model from local resources
//     const loadModel = async () => {
//       await tf.ready();
//       const model = await tf.loadLayersModel(
//         bundleResourceIO(require('../src/model/model.json'),
//          require('../src/model/metadata.json'))
//       );
//       setModel(model);
//     };
//     loadModel();
//   }, []);

//   const handleImagePicker = () => {
//     ImagePicker.launchImageLibrary(
//       { mediaType: 'photo', includeBase64: true },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorMessage) {
//           Alert.alert('Error', response.errorMessage);
//         } else if (response.assets && response.assets[0].uri) {
//           const sourceUri = response.assets[0].uri;
//           setImageUri(sourceUri);
//           setPrediction(null);
//         }
//       }
//     );
//   };

//   const startAnimation = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(lineAnimation, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(lineAnimation, {
//           toValue: 0,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   const predictBodyFat = async () => {
//     if (model && imageUri) {
//       setIsLoading(true);
//       startAnimation();
//       try {
//         const response = await fetch(imageUri);
//         const imageData = await response.blob();
//         const base64 = await imageData.text();
        
//         // Convert image to tensor for model input
//         const tensor = await convertBase64ToTensor(base64);
        
//         // Get prediction
//         const predictionResult = await model.predict(tensor);
//         const bodyFatPercentage = predictionResult.dataSync()[0];  // Adjust based on your model's output

//         // Display prediction
//         setPrediction(`${(bodyFatPercentage * 100).toFixed(2)}% body fat`);
//       } catch (error) {
//         Alert.alert('Error', error.message);
//       } finally {
//         setIsLoading(false);
//         lineAnimation.stopAnimation();
//       }
//     }
//   };

//   const handleDeleteImage = () => {
//     setImageUri(null);
//     setPrediction(null);
//     lineAnimation.stopAnimation();
//   };

//   const linePosition = lineAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 200],
//   });

//   return (
//     <ImageBackground
//       source={{uri:'https://xmple.com/wallpaper/black-linear-gradient-grey-1080x1920-c2-696969-000000-a-15-f-14.svg'}} 
//       style={styles.background}
//     >
//       <View style={styles.header}>
//         <Text style={styles.title}>Calculate Your Body Fat</Text>
//       </View>
      
//       <View style={styles.container}>
//         <Button title="Pick an image" onPress={handleImagePicker} />
//         {imageUri && (
//           <>
//             <View style={styles.imageContainer}>
//               <Image source={{ uri: imageUri }} style={styles.image} />
//               <Animated.View
//                 style={[
//                   styles.animatedLine,
//                   { transform: [{ translateY: linePosition }] },
//                 ]}
//               />
//             </View>
//             <Button title="Delete Image" onPress={handleDeleteImage} />
//           </>
//         )}
//         <Button
//           title="Predict Body Fat Percentage"
//           onPress={predictBodyFat}
//           disabled={!imageUri || isLoading}
//         />
//         {isLoading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           prediction && (
//             <Text style={styles.predictionText}>
//               Estimated Body Fat Percentage: {prediction}
//             </Text>
//           )
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: { flex: 1, resizeMode: 'cover' },
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     height: 130,
//     paddingVertical: 30,
//     paddingHorizontal: 10,
//   },
//   title: { fontSize: 24, marginTop: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
//   container: { 
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center', 
//     padding: 16, 
//     marginTop: 100,
//   },
//   imageContainer: { position: 'relative', width: 200, height: 200, marginVertical: 10 },
//   image: { width: '100%', height: '100%' },
//   animatedLine: {
//     position: 'absolute',
//     width: '100%',
//     height: 4,
//     backgroundColor: 'green',
//     opacity: 0.7,
//   },
//   predictionText: { fontSize: 18, color: 'white', marginTop: 10 },
// });

// export default BodyFatScreen;
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
      source={require('../assets/bg1.png')} // Path to your background image
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
          disabled={!imageUri} // Disable button if no image is selected
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



