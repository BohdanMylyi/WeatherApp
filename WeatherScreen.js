import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeather} from './weatherSlice';
import {Button, FlatList, Text, View} from 'react-native';

const WeatherScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather);

  useEffect(() => {
    dispatch(fetchWeather({lat: 50.4501, lon: 30.5234}));
  }, [dispatch]);

  function getAverageToday() {
    if (!weather.today || weather.today.length === 0) return 0;

    const total = weather.today.reduce((acc, temp) => acc + temp, 0);
    const averageToday = total / weather.today.length;
    return averageToday.toFixed(2); // returns average rounded to 2 decimal places
  }

  return (
    <View>
      <Text>Average Today: {getAverageToday()}°C</Text>
      {console.log(weather)}
      <FlatList
        data={weather.weekly}
        keyExtractor={item => item.date}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.date}: {item.temperature_2m_max}°C
            </Text>
            <Button
              title="Деталі"
              onPress={() => navigation.navigate('Detail', {day: item})}
            />
          </View>
        )}
      />
    </View>
  );
};

export default WeatherScreen;
