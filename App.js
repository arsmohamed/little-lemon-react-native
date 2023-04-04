import react, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import HomeScreen from './screens/Home'; 

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchName, setFetchName] = useState('');
  const [fetchEmail, setFetchEmail] = useState('');
  useEffect(() => {
    async function fetchIsOnboardingCompleted() {
      const value = await AsyncStorage.getItem('isOnboardingCompleted');
      setIsOnboardingCompleted(value === 'true');
      setIsLoading(false);
    }
    fetchIsOnboardingCompleted();
  }, []);
 

  const handleOnboardingCompleted = (data) => {
    setFetchEmail(data.email);
    setFetchName(data.name);
    setIsOnboardingCompleted(true);
  };
  const changeOnBoardingPressed = () => {
    setIsOnboardingCompleted(false);
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {
        isOnboardingCompleted ? (
          // Onboarding completed, user is signed in
          <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            />
          <Stack.Screen 
            name="Profile" 
            options={{ headerShown: false }}
            >
              {() => <Profile 
                fetchName={fetchName} 
                fetchEmail={fetchEmail} 
                changeOnBoarding={setIsOnboardingCompleted}
                />}
            </Stack.Screen>
          </>
          ) : (<Stack.Screen name="Onboarding"  >
            {(props) => (
              <Onboarding
                {...props}
                handleOnboardingCompleted={data => handleOnboardingCompleted(data)} 
              />
            )}
          </Stack.Screen> )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
