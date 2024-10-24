import React from 'react';
import {Text, View} from 'react-native';

const DetailScreen = ({route}) => {
  const {date} = route.params;

  return (
    <View>
      <Text>{date}</Text>
      <Text>Дата: {date}</Text>
      <Text>Макс. температура: {date.temperature_2m_max}°C</Text>
      <Text>Мін. температура: {date.temperature_2m_min}°C</Text>
      <Text>Опади: {date.precipitation_sum} мм</Text>
    </View>
  );
};

export default DetailScreen;
