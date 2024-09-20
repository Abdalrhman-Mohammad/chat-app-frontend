import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
type Props = {
  onPress: () => void;
  title: string;
};
export default function MainButton({onPress, title}: Props) {
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.Txt}>{title}</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#20A090',
    borderRadius: 20,
  },
  Txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
});
