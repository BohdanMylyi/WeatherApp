import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherScreen from './src/components/WeatherScreen';
import DetailScreen from './src/components/DetailsScreen';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './src/theme/ThemeProvider';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Weather" component={WeatherScreen} />
              <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
