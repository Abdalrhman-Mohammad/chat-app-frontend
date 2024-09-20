import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function KeyboardAvoidingViewComponent({children}: any) {
  const [keyboardshown, setkeyboardshown] = useState<boolean>(false);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setkeyboardshown(false);
      },
    );

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setkeyboardshown(true);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{flex: 1}}
      keyboardVerticalOffset={keyboardshown ? 50 : 0}>
        {children}
      </KeyboardAvoidingView>
  )
}
