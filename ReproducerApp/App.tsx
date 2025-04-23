/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
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
  const [result, setResult] = useState<string>(
    'Press button to test AbortSignal.throwIfAborted()',
  );

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
    signal.throwIfAborted();

    console.log('Failed: signal.throwIfAborted() did not throw after abort');
    setResult('Failed: signal.throwIfAborted() did not throw after abort');
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
            This app demonstrates that AbortSignal.throwIfAborted() is not
            implemented in React Native.
          </Section>

          <View style={styles.testContainer}>
            <Text style={styles.result}>{result}</Text>
            <Text style={styles.note}>
              When you click the button below, the app will try to use
              AbortSignal.throwIfAborted(). If this method is not implemented,
              you'll see a red error screen or an error in the console.
            </Text>

            <Button
              title="Test AbortSignal.throwIfAborted()"
              onPress={testAbortSignalThrowIfAborted}
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
  result: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  note: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});

export default App;
