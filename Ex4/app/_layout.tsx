import AddProduct from '@/components/AddProduct';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, PaperProvider } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home</Text>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('AddProduct')}
    >
      Ir para produtos
    </Button>
  </View>
);

export default function App() {
  return (
      <PaperProvider>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="AddProduct" component={AddProduct} />
        </Drawer.Navigator>
      </PaperProvider>
  );
}
