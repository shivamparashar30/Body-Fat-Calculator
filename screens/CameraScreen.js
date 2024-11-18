// import React, { useState } from 'react';
// import { View, Button, Image, StyleSheet } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const CameraScreen = ({ navigation }) => {
//   const [photoUri, setPhotoUri] = useState(null);

//   const openCamera = () => {
//     launchCamera({ mediaType: 'photo' }, (response) => {
//       if (response.assets) {
//         setPhotoUri(response.assets[0].uri);
//         navigation.navigate('Analysis', { imageUri: response.assets[0].uri });
//       }
//     });
//   };

//   const openGallery = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.assets) {
//         setPhotoUri(response.assets[0].uri);
//         navigation.navigate('Analysis', { imageUri: response.assets[0].uri });
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Take Photo" onPress={openCamera} />
//       <Button title="Choose from Gallery" onPress={openGallery} />
//       {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   image: { width: 200, height: 200, marginTop: 20 },
// });

// export default CameraScreen;

import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CameraScreen = ({ navigation }) => {
  const [photoUri, setPhotoUri] = useState(null);

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setPhotoUri(response.assets[0].uri);
        navigation.navigate('Analysis', { imageUri: response.assets[0].uri });
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setPhotoUri(response.assets[0].uri);
        navigation.navigate('Analysis', { imageUri: response.assets[0].uri });
      }
    });
  };

  const deleteImage = () => {
    setPhotoUri(null);
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={openCamera} />
      <Button title="Choose from Gallery" onPress={openGallery} />
      {photoUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: photoUri }} style={styles.image} />
          <Button title="Delete Photo" onPress={deleteImage} color="red" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageContainer: { alignItems: 'center', marginTop: 20 },
  image: { width: 200, height: 200, marginBottom: 10 },
});

export default CameraScreen;
