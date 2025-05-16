import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function DesenvolvedoresScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Desenvolvedores</Text>

      <View style={styles.card}>
        <Text style={styles.dev}>Arthur Fenili - RM 552752</Text>
        <Text style={styles.dev}>Enzo Antunes Oliveira - RM 553185</Text>
        <Text style={styles.dev}>Vinicio Raphael Santana - RM 553813</Text>
      </View>

      <View style={styles.button}>
        <Button title="Voltar para o Início" onPress={() => router.replace('/')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20
  },
  dev: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    width: '100%'
  }
});
