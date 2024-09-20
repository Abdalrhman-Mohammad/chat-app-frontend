import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainButton from '../../../components/MainButton';
type welcomeOptionsProps = {onPress: any};
export default function WelcomeOptions({onPress}: welcomeOptionsProps) {
  return (
    <>
      <Text style={styles.welcomeTxt}>Welcome to Your Chat App?</Text>
      <View style={styles.button}>
        <MainButton onPress={onPress} title={'Get Started'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  welcomeTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    marginTop: 40,
  },
});
