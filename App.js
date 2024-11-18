import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BodyFatScreen from './screens/BodyFatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BodyFatScreen" >
        <Stack.Screen name="BodyFatScreen" options={{
          headerShown:false
        }} component={BodyFatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
