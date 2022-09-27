import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import MyCart from "./src/screens/MyCart";
import ProductDetails from "./src/screens/ProductDetails";

export default function App() {
   const Stack = createNativeStackNavigator();
   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
