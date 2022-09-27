import {
   ScrollView,
   StatusBar,
   Text,
   TouchableOpacity,
   View,
   StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOURS, Items } from "./../database/database";
import { Entypo, MaterialCommunityIcons } from "react-native-vector-icons";
import ProductCart from "../components/ProductCart";

const Home = ({ navigation }) => {
   const [products, setProducts] = useState([]);
   const [accessories, setAccessories] = useState([]);

   useEffect(() => {
      const unSubscribe = navigation.addListener("focus", () => {
         getDataFromDB();
      });
      return unSubscribe;
   }, [navigation]);

   const getDataFromDB = () => {
      const ProductsAll = [];
      const AccessoriesAll = [];

      for (let i = 0; i < Items.length; i++) {
         if (Items[i].category === "product") {
            ProductsAll.push(Items[i]);
         }
         if (Items[i].category === "accessory") {
            AccessoriesAll.push(Items[i]);
         }
      }
      setProducts(ProductsAll);
      setAccessories(AccessoriesAll);
   };

   return (
      <View
         style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLOURS.white,
         }}
      >
         <StatusBar
            backgroundColor={COLOURS.white}
            barStyle="dark-content"
         ></StatusBar>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.view1}>
               <TouchableOpacity>
                  <Entypo name="shopping-bag" style={styles.shoppingBag} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
                  <MaterialCommunityIcons
                     name="cart"
                     style={styles.shoppingCart}
                  />
               </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 10, padding: 16 }}>
               <Text style={styles.headName}>Hi-Fi Shop & Services</Text>
               <Text style={styles.subHeadName}>
                  Our shop is very Fantastic {"\n"}and we are services very
                  fast. Carry on.
               </Text>
            </View>
            <View
               style={{
                  padding: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                  }}
               >
                  <Text style={styles.Products}>Products</Text>
                  <Text style={styles.ProductsNumber}>41</Text>
               </View>
               <TouchableOpacity>
                  <Text style={styles.seeAll}>See All</Text>
               </TouchableOpacity>
            </View>
            <View
               style={{
                  padding: 16,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
               }}
            >
               {products.map((data) => {
                  return (
                     <ProductCart
                        navigation={navigation}
                        data={data}
                        key={data.id}
                     />
                  );
               })}
            </View>
            <View
               style={{
                  padding: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                  }}
               >
                  <Text style={styles.Products}>Accessories</Text>
                  <Text style={styles.ProductsNumber}>74</Text>
               </View>
               <TouchableOpacity>
                  <Text style={styles.seeAll}>See All</Text>
               </TouchableOpacity>
            </View>
            <View
               style={{
                  padding: 16,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
               }}
            >
               {accessories.map((data) => {
                  return (
                     <ProductCart
                        navigation={navigation}
                        data={data}
                        key={data.id}
                     />
                  );
               })}
            </View>
         </ScrollView>
      </View>
   );
};
export default Home;

const styles = StyleSheet.create({
   view1: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
   },
   shoppingBag: {
      fontSize: 18,
      padding: 12,
      color: COLOURS.backgroundMedium,
      borderRadius: 10,
      backgroundColor: COLOURS.backgroundLight,
   },
   shoppingCart: {
      fontSize: 18,
      padding: 12,
      color: COLOURS.backgroundMedium,
      borderRadius: 10,
      borderColor: COLOURS.backgroundLight,
      borderWidth: 1,
   },
   headName: {
      fontSize: 26,
      color: COLOURS.black,
      marginBottom: 10,
      fontWeight: "500",
      letterSpacing: 1,
   },
   subHeadName: {
      fontSize: 14,
      color: COLOURS.black,
      marginBottom: 10,
      fontWeight: "400",
      letterSpacing: 1,
      lineHeight: 24,
   },
   Products: {
      fontSize: 18,
      color: COLOURS.black,
      fontWeight: "500",
      letterSpacing: 1,
   },
   ProductsNumber: {
      fontSize: 14,
      color: COLOURS.black,
      opacity: 0.5,
      marginLeft: 10,
      fontWeight: "400",
   },
   seeAll: {
      color: COLOURS.blue,
      fontSize: 14,
      fontWeight: "400",
   },
});
