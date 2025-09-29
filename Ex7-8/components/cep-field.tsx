
import { StyleSheet, Text, View } from 'react-native';


interface CepData {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
}

interface HomeScreenProps {
    data?: CepData | null;
}

export default function CEPFields(props: HomeScreenProps) {
    return (
        <View style={styles.container}>
            {props.data && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Resultado:</Text>
                    <Text>CEP: {props.data.cep}</Text>
                    <Text>Estado: {props.data.state}</Text>
                    <Text>Cidade: {props.data.city}</Text>
                    <Text>Bairro: {props.data.neighborhood}</Text>
                    <Text>Rua: {props.data.street}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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