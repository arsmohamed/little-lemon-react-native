import react, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIsOnboardingCompleted() {
      const value = await AsyncStorage.getItem('isOnboardingCompleted');
      setIsOnboardingCompleted(value === 'true');
      setIsLoading(false);
    }
    fetchIsOnboardingCompleted();
  }, []);

  if (isLoading) {
     // We haven't finished reading from AsyncStorage yet
    // return <SplashScreen />;
  }

  return (
    <NavigationContainer  >
      <Stack.Navigator>
        {
          isOnboardingCompleted ? 
            (<Stack.Screen name="Profile" component={Profile} />
            ): (<Stack.Screen name="Onboarding" component={Onboarding} /> )
        }
        {/* <Stack.Screen name="Onboarding" component={Onboarding} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
