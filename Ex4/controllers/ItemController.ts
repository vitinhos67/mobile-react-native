
import Item from '@/models/Item';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useItemController = () => {
    const [items, setItems] = useState<Item[]>([
        { id: '1', title: 'Item Exemplo 1' },
        { id: '2', title: 'Item Exemplo 2' },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [inputText, setInputText] = useState('');

    const generateId = () => Date.now().toString();

    const addItem = () => {
        if (!inputText.trim()) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        const newItem: Item = {
            id: generateId(),
            title: inputText.trim(),
        };

        setItems([...items, newItem]);
        closeModal();
    };

    const updateItem = () => {
        if (!inputText.trim() || !editingItem) {
            Alert.alert('Erro', 'Digite um título');
            return;
        }

        setItems(items.map(item =>
            item.id === editingItem.id
                ? { ...item, title: inputText.trim() }
                : item
        ));
        closeModal();
    };

    const deleteItem = () => {
        if (!editingItem) return;

        setItems(items.filter(item => item.id !== editingItem.id));
        closeModal();
    };

    const closeModal = () => {
        setInputText('');
        setEditingItem(null);
        setModalVisible(false);
    };

    const openAddModal = () => {
        setInputText('');
        setEditingItem(null);
        setModalVisible(true);
    };

    const openEditModal = (item: Item) => {
        setInputText(item.title);
        setEditingItem(item);
        setModalVisible(true);
    };
    return {
        openEditModal,
        openAddModal,
        closeModal,
        deleteItem,
        updateItem,
        addItem,
        setInputText,
        inputText,
        editingItem,
        modalVisible,
        items
    };
};
