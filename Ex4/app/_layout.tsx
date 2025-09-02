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
    <View style={ItemsStyles.container}>
      <Text>Horário de Brasília: {moment().format('HH:mm:ss')}</Text>
      <Text style={ItemsStyles.title}>Lista de Itens</Text>

      <TouchableOpacity style={ItemsStyles.addButton} onPress={controller.openAddModal}>
        <Text>Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList
        data={controller.items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {AddProduct(controller, ItemsStyles)}
    </View>
  );
}