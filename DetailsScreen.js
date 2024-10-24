import React from 'react';
import {Text, View} from 'react-native';

const DetailScreen = ({route}) => {
  const {day} = route.params;

  return (
    <View>
      <Text>Дата: {day.date}</Text>
      <Text>Макс. температура: {day.temperature_2m_max}°C</Text>
      <Text>Мін. температура: {day.temperature_2m_min}°C</Text>
      <Text>Опади: {day.precipitation_sum} мм</Text>
    </View>
  );
};

export default DetailScreen;
