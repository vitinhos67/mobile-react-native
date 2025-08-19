import { useState } from 'react';
import { Alert, Button, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Item {
  text: string;
  description: string;
  url: string;
}

const items: Item[] = [];

function AddProductPopup({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: (val: boolean) => void }) {

  const [text, onChangeText] = useState('Useless Text');
  const [description, onchangeDescription] = useState('');
  const [url, onChangeUrl] = useState('');


  function addProduct(closeModal: boolean) {
    items.push({
      text: text,
      description: description,
      url: url
    });
    if (closeModal) {
      setModalVisible(false);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText}>Adicionar item</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                onChangeText={onChangeText}
                value={text}
              />
              <TextInput
                style={styles.input}
                onChangeText={onchangeDescription}
                value={description}
                placeholder="Descrição"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeUrl}
                value={url}
                placeholder="Url da imagem"
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => addProduct(true)}>
                <Text style={styles.textStyle}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

function Items() {
  return (
    <View style={styles.listItems}>
      {items.map((item, index) => (
        <View style={styles.card} key={index}>
          {item.url ? (
            <Image
              source={{ uri: item.url }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : null}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.text}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.items}>
        {items.length === 0 && <Text style={styles.notFoundItem}>Nenhum item encontrado</Text>}
        {items.length > 0 && <Items />}
      </View>
      <AddProductPopup modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={styles.btn}>
        <Button
          onPress={() => setModalVisible(true)}
          title="Adicionar produto"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 20,
  },
  items: {
    flex: 1,
  },
  listItems: {
    margin: 20,
  },
  item: {
    backgroundColor: 'red',
    borderColor: 'black',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  notFoundItem: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  }
});
