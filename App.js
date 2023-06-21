import React, { useState } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Function to send the selected image for inference
const sendForInference = async (imageUri) => {
  // Implement your skin cancer detection model inference logic here
  // You can use a network request to send the image to a server-side API
  // that runs the model and returns the prediction
  // Alternatively, if your model is small enough, you can use an on-device inference library like TensorFlow.js or tflite

  // Placeholder logic for demonstration
  // Replace this with your actual implementation
  Alert.alert('Inference Result', 'Cancerous');
};

const App = () => {
  const [imageUri, setImageUri] = useState(null);

  // Function to handle image selection from the device's gallery
  const selectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant permission to access the gallery');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Skin Cancer Detector</Text>
      
      {imageUri ? (
        <View>
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginBottom: 20 }} />
          <Button title="Detect" onPress={() => sendForInference(imageUri)} />
        </View>
      ) : (
        <Button title="Select Image" onPress={selectImage} />
      )}
    </View>
  );
};

export default App;
