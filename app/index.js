import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const router = useRouter();

  const carregarProdutos = async () => {
    const data = await AsyncStorage.getItem('produtos');
    if (data) setProdutos(JSON.parse(data));
    else setProdutos([]);
  };

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  const excluirProduto = async (id) => {
    const novaLista = produtos.filter((p) => p.id !== id);
    setProdutos(novaLista);
    await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
  };

  const limparTodos = () => {
    Alert.alert('Confirmar', 'Deseja apagar todos os produtos?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar Tudo',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('produtos');
          setProdutos([]);
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/cadastro',
          params: {
            id: item.id,
            nome: item.nome || '',
            fabricacao: item.fabricacao || '',
            validade: item.validade || '',
            quantidade: item.quantidade || '',
            lote: item.lote || '',
            estado: item.estado || 'SP',
            codBarras: item.codBarras || ''
          }
        })
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nome || 'Sem nome'}</Text>
        <Text style={styles.info}>Validade: {item.validade || '-'}</Text>
        <Text style={styles.info}>Quantidade: {item.quantidade || '-'}</Text>
        <Text style={styles.info}>Estado: {item.estado || '-'}</Text>
      </View>
      <View style={styles.excluir}>
        <Button title="Excluir" color="#ff4d4d" onPress={() => excluirProduto(item.id)} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📦 Produtos no Estoque</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto cadastrado.</Text>}
        contentContainerStyle={produtos.length === 0 && styles.center}
      />

      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <Button title="➕ Cadastrar Produto" onPress={() => router.push('/cadastro')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="👨‍💻 Desenvolvedores" onPress={() => router.push('/desenvolvedores')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="🗑️ Limpar Todos os Produtos" color="red" onPress={limparTodos} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  info: {
    fontSize: 14,
    color: '#555'
  },
  vazio: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#888'
  },
  buttons: {
    marginTop: 20
  },
  buttonContainer: {
    marginVertical: 6
  },
  excluir: {
    marginLeft: 10
  }
});
