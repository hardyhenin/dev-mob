import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native'; // Importez StatusBar

export default function App() {
  const [activeTab, setActiveTab] = useState('Calculatrice');
  const [display, setDisplay] = useState('');

  const handlePress = (value) => {
    if (value === 'C') return setDisplay('');
    if (value === '=') {
      try {
        const result = eval(display.replace('×', '*').replace('÷', '/'));
        setDisplay(result.toString());
      } catch (e) {
        setDisplay('Erreur');
      }
    } else if (value === '⌫') {
      setDisplay(display.slice(0, -1));
    } else if (value === ',') {
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
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
    <SafeAreaView style={styles.safeArea}> {/* Appliquez un style à SafeAreaView si nécessaire */}
      <StatusBar barStyle="light-content" backgroundColor="#000" /> {/* Personnalisez la barre de statut */}
      <View style={styles.container}> {/* Encapsulez le contenu principal dans un nouveau View */}
        <View style={styles.tabs}>
          {tabs.map(tab => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.display}>
          <Text style={styles.displayText}>{display}</Text>
        </View>

        <View style={styles.keyboard}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((btn, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, btn === '=' && styles.equalButton]}
                  onPress={() => handlePress(btn)}
                >
                  <Text style={styles.buttonText}>{btn}</Text>
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
    flex: 1, // La SafeAreaView prend toujours tout l'écran pour bien gérer les encoches
    backgroundColor: '#000', // Le fond de la SafeAreaView
  },
  container: {
    flex: 1, // Le conteneur interne peut prendre tout l'espace disponible ou une hauteur fixe
    // Vous pouvez ajouter un padding si vous souhaitez des marges latérales en plus de la barre de statut
    paddingHorizontal: 15, // Exemple de marge latérale
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
    fontSize: 36,
    color: '#fff',
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
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  equalButton: {
    backgroundColor: '#0ff',
  },
});