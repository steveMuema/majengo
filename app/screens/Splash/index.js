import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
// import FastImage from 'react-native-fast-image';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./movr-smile.gif')} />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('./logo.png')} />
      </View>
    </View>
  );
}
