import React from 'react';
import {Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';

interface WeatherDay {
  date: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_sum: number;
}

interface DetailScreenProps {
  route: RouteProp<{params: {day: WeatherDay}}, 'params'>;
}

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const {day} = route.params;

  return (
    <View>
      <Text>{day.date}</Text>
      <Text>Дата: {day.date}</Text>
      <Text>Макс. температура: {day.temperature_2m_max}°C</Text>
      <Text>Мін. температура: {day.temperature_2m_min}°C</Text>
      <Text>Опади: {day.precipitation_sum} мм</Text>
    </View>
  );
};

export default DetailScreen;
