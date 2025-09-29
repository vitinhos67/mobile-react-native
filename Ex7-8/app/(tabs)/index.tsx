import CEPFields from '@/components/cep-field';
import { useReducer, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface CepData {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

interface State {
  data: CepData | null;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: CepData }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' };

export default function HomeScreen() {
  const [cep, setCep] = useState('');

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'FETCH_START':
        return { ...state, loading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, data: action.payload, error: null };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: action.payload };
      case 'RESET':
        return { data: null, loading: false, error: null };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    data: null,
    loading: false,
    error: null,
  });

  const search = async () => {
    if (!cep || cep.length < 8) {
      dispatch({ type: 'FETCH_ERROR', payload: 'CEP deve ter 8 dígitos' });
      return;
    }

    dispatch({ type: 'FETCH_START' });

    try {
      const cleanCep = cep.replace(/\D/g, '');
      const url = `https://brasilapi.com.br/api/cep/v1/${cleanCep}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }

      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Erro ao buscar CEP',
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Consulta de CEP</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o CEP (ex: 01310-100)"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            maxLength={9}
          />

          <Button title="Buscar" onPress={search} disabled={state.loading} />

          {state.loading && <ActivityIndicator size="large" style={styles.loader} />}

          {state.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.error}</Text>
            </View>
          )}
          <CEPFields data={state.data}></CEPFields>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});