import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
  'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
  'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function CadastroScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [produto, setProduto] = useState({
    nome: '',
    fabricacao: '',
    validade: '',
    quantidade: '',
    lote: '',
    estado: 'SP',
    codBarras: ''
  });

  // Corrigido: useEffect roda apenas uma vez
  useEffect(() => {
    if (params?.id) {
      setProduto({
        id: params.id,
        nome: params.nome || '',
        fabricacao: params.fabricacao || '',
        validade: params.validade || '',
        quantidade: params.quantidade || '',
        lote: params.lote || '',
        estado: params.estado || 'SP',
        codBarras: params.codBarras || ''
      });
    }
  }, []); // ← Apenas na primeira renderização

  const salvarProduto = async () => {
    try {
      const produtosSalvos = await AsyncStorage.getItem('produtos');
      const lista = produtosSalvos ? JSON.parse(produtosSalvos) : [];

      let novaLista;

      if (produto.id) {
        novaLista = lista.map(p => p.id === produto.id ? produto : p);
      } else {
        const novoProduto = { ...produto, id: Date.now().toString() };
        novaLista = [...lista, novoProduto];
      }

      await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
      Alert.alert('Sucesso', 'Produto salvo com sucesso!');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar o produto');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Produto</Text>

      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        value={produto.nome}
        onChangeText={(nome) => setProduto({ ...produto, nome })}
      />

      <Text style={styles.label}>Data de Fabricação</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={produto.fabricacao}
        onChangeText={(fabricacao) => setProduto({ ...produto, fabricacao })}
      />

      <Text style={styles.label}>Prazo de Validade</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={produto.validade}
        onChangeText={(validade) => setProduto({ ...produto, validade })}
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={produto.quantidade}
        onChangeText={(quantidade) => setProduto({ ...produto, quantidade })}
      />

      <Text style={styles.label}>Lote</Text>
      <TextInput
        style={styles.input}
        value={produto.lote}
        onChangeText={(lote) => setProduto({ ...produto, lote })}
      />

      <Text style={styles.label}>Estado de Origem</Text>
      <Picker
        selectedValue={produto.estado}
        onValueChange={(estado) => setProduto({ ...produto, estado })}
      >
        {estados.map((uf) => (
          <Picker.Item key={uf} label={uf} value={uf} />
        ))}
      </Picker>

      <Text style={styles.label}>Código de Barras</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o código de barras"
        value={produto.codBarras}
        onChangeText={(codBarras) => setProduto({ ...produto, codBarras })}
      />

      <View style={styles.botao}>
        <Button title="Salvar Produto" onPress={salvarProduto} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  botao: {
    marginTop: 20
  }
});
