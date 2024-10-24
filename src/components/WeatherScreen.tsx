import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeather} from '../slices/weatherSlice';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {toggleTheme} from '../slices/themeSlice';
import {RootState} from '../store/store';
import {AppDispatch} from '../store/store';

interface WeatherItem {
  date: string;
  maxTemperature: number;
  minTemperature: number;
}

interface WeatherState {
  today: number[];
  weekly: WeatherItem[];
}

const WeatherScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const dispatch: AppDispatch = useDispatch();
  const weather = useSelector(
    (state: RootState) => state.weather,
  ) as WeatherState;
  const theme = useTheme();

  const [latitude, setLatitude] = useState<string>('50.4501');
  const [longitude, setLongitude] = useState<string>('30.5234');

  useEffect(() => {
    dispatch(
      fetchWeather({lat: parseFloat(latitude), lon: parseFloat(longitude)}),
    );
  }, [dispatch, latitude, longitude]);

  function getAverageToday(): string {
    if (!weather.today || weather.today.length === 0) return '0';
    const total = weather.today.reduce((acc, temp) => acc + temp, 0);
    const averageToday = total / weather.today.length;
    return averageToday.toFixed(2);
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.averageText, {color: theme.text}]}>
        Average Today: {getAverageToday()}°C
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {borderColor: theme.text}]}
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, {borderColor: theme.text}]}
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />
      </View>

      <Button title="Switch Theme" onPress={() => dispatch(toggleTheme())} />

      <FlatList
        data={weather.weekly}
        keyExtractor={item => item.date}
        renderItem={({item}) => (
          <View
            style={[styles.weatherItem, {backgroundColor: theme.background}]}>
            <Text style={[styles.weatherText, {color: theme.text}]}>
              {item.date}: Max {item.maxTemperature}°C, Min{' '}
              {item.minTemperature}°C
            </Text>
            <Button
              title="Деталі"
              color={theme.button}
              onPress={() => navigation.navigate('Detail', {day: item})}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  averageText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  weatherItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherText: {
    fontSize: 18,
  },
});

export default WeatherScreen;
