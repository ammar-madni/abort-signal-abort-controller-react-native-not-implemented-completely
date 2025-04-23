/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const testAbortSignalThrowIfAborted = () => {
    const controller = new AbortController();
    const signal = controller.signal;

    console.log('Creating AbortController and signal...');
    controller.abort();
    console.log('Controller aborted');

    console.log('Attempting to call signal.throwIfAborted()...');
    // @ts-ignore - Testing if method exists at runtime
    signal.throwIfAborted();

    console.log('Failed: signal.throwIfAborted() did not throw after abort');
  };

  const testAbortSignalAny = () => {
    console.log('Testing AbortSignal.any...');

    const controller1 = new AbortController();
    const controller2 = new AbortController();

    // @ts-ignore - Testing if method exists at runtime
    const anySignal = AbortSignal.any([controller1.signal, controller2.signal]);
    console.log('Signal aborted:', anySignal.aborted);

    console.log('AbortSignal.any seems to work');
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 24,
          }}>
          <Section title="React Native AbortSignal Test">
            This app demonstrates that certain AbortSignal methods are not
            implemented in React Native.
          </Section>

          <View style={styles.testContainer}>
            <Text style={styles.note}>
              When you click the buttons below, the app will try to use
              AbortSignal methods. If these methods are not implemented, you'll
              see a red error screen or an error in the console.
            </Text>

            <Button
              title="Test signal.throwIfAborted()"
              onPress={testAbortSignalThrowIfAborted}
            />

            <View style={styles.buttonSpacer} />

            <Button
              title="Test AbortSignal.any()"
              onPress={testAbortSignalAny}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  testContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 24,
  },
  note: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  buttonSpacer: {
    height: 16,
  },
});

export default App;
