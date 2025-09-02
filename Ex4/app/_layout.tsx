import AddProduct from '@/components/AddProduct';
import { useItemController } from '@/controllers/ItemController';
import Item from '@/models/Item';
import { ItemsStyles } from '@/styles/item.style';
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment'
import {Button, PaperProvider} from 'react-native-paper';
export default function App() {
  const controller = useItemController();
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={ItemsStyles.item}
      onPress={() => controller.openEditModal(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
    <View style={ItemsStyles.container}>
      <Text>Horário: {moment().format('HH:mm:ss')}</Text>
      <Text style={ItemsStyles.title}>Lista de Itens</Text>

      <Button mode="contained" onPress={controller.openAddModal} style={{ marginBottom: 16 }}>
        Adicionar Item
      </Button>

      <FlatList
        data={controller.items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {AddProduct(controller, ItemsStyles)}
    </View>
    </PaperProvider>
  );
}