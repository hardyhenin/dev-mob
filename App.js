import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('Calculatrice');
  const [display, setDisplay] = useState('');
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  const handlePress = (value) => {
    if (value === 'C') {
      setDisplay('');
      setIsResultDisplayed(false);
      return;
    }

    if (value === '=') {
      try {
        const expression = display.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, '.');
        const result = eval(expression);
        setDisplay(result.toString());
        setIsResultDisplayed(true);
      } catch (e) {
        setDisplay('Erreur');
        setIsResultDisplayed(true);
      }
      return;
    }

    if (value === '⌫') {
      setDisplay(display.slice(0, -1));
      setIsResultDisplayed(false);
      return;
    }

    if (value === ',') {
      if (isResultDisplayed || display === '') {
        setDisplay('0.');
      } else if (!display.includes('.')) {
        setDisplay(display + '.');
      }
      setIsResultDisplayed(false);
      return;
    }

    const isOperator = ['+', '-', '×', '÷', '%'].includes(value);

    if (isResultDisplayed) {
      if (isOperator) {
        setDisplay(display + value);
      } else {
        setDisplay(value);
      }
      setIsResultDisplayed(false);
    } else {
      setDisplay(display + value);
    }
  };

  const tabs = ['Calculatrice'];

  const buttons = [
    ['C', '%', '⌫', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['00', '0', ',', '='],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <View style={styles.tabs}>
          {tabs.map(tab => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.display}>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>{display || '0'}</Text>
        </View>

        <View style={styles.keyboard}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((btn, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    btn === '=' && styles.equalButton,
                    ['C', '⌫', '%', '÷', '×', '-', '+'].includes(btn) && styles.operatorButton
                  ]}
                  onPress={() => handlePress(btn)}
                >
                  <Text style={[
                    styles.buttonText,
                    ['C', '⌫', '%', '÷', '×', '-', '+'].includes(btn) && styles.operatorButtonText,
                    btn === '=' && styles.equalButtonText
                  ]}>{btn}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 35,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomColor: '#0ff',
    borderBottomWidth: 1,
  },
  tabText: {
    color: '#aaa',
    fontSize: 16,
  },
  activeTab: {
    color: '#0ff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 60,
    color: '#fff',
    textAlign: 'right',
  },
  keyboard: {
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '500',
  },
  operatorButton: {
    backgroundColor: '#555',
  },
  operatorButtonText: {
    color: '#0ff',
  },
  equalButton: {
    backgroundColor: '#0ff',
    flex: 2,
    minWidth: 150,
  },
  equalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
