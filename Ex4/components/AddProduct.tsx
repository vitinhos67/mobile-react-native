
import { useItemController } from '@/controllers/ItemController';
import Item from '@/models/Item';
import { ItemsStyles } from '@/styles/item.style';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Button } from 'react-native-paper';

type RootDrawerParamsList = {
  AddProduct: undefined;
  Home: undefined;
};

type NavigationProps = DrawerNavigationProp<RootDrawerParamsList>;

const AddProduct: React.FC = () => {
    const controller = useItemController();
    const navigation = useNavigation<NavigationProps>();
    const renderItem = ({ item }: { item: Item }) => (
        <TouchableOpacity
            style={ItemsStyles.item}
            onPress={() => controller.openEditModal(item)}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={ItemsStyles.container}>
            <Text>Horário: {moment().format('HH:mm:ss')}</Text>
            <Text style={ItemsStyles.title}>Lista de Itens</Text>

            <Button
                mode="contained"
                onPress={controller.openAddModal}
                style={{ marginBottom: 16 }}
            >
                Adicionar Item
            </Button>
            <ScrollView>
                <FlatList
                    data={controller.items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

            </ScrollView>

            <Modal
                visible={controller.modalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={ItemsStyles.modalOverlay}>
                    <View style={ItemsStyles.dialog}>
                        <Text style={ItemsStyles.modalTitle}>
                            {controller.editingItem ? 'Editar Item' : 'Novo Item'}
                        </Text>

                        <TextInput
                            style={ItemsStyles.input}
                            placeholder="Digite o título"
                            value={controller.inputText}
                            onChangeText={controller.setInputText}
                        />

                        <View style={ItemsStyles.buttons}>
                            <TouchableOpacity
                                style={ItemsStyles.button}
                                onPress={controller.closeModal}
                            >
                                <Text style={ItemsStyles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>

                            {controller.editingItem && (
                                <TouchableOpacity
                                    style={[ItemsStyles.button, ItemsStyles.deleteButton]}
                                    onPress={controller.deleteItem}
                                >
                                    <Text
                                        style={[ItemsStyles.buttonText, ItemsStyles.deleteButtonText]}
                                    >
                                        Excluir
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={ItemsStyles.button}
                                onPress={
                                    controller.editingItem ? controller.updateItem : controller.addItem
                                }
                            >
                                <Text style={ItemsStyles.buttonText}>
                                    {controller.editingItem ? 'Salvar' : 'Adicionar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default AddProduct;
