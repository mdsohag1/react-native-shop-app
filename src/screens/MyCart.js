import {
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS, Items } from "../database/database";
import { Entypo, MaterialCommunityIcons } from "react-native-vector-icons";
import DelivaryInfo from "../components/DelivaryInfo";

const MyCart = ({ navigation }) => {
   const [allItems, setAllItems] = useState([]);

   useEffect(() => {
      const unSubscribe = navigation.addListener("focus", () => {
         getDataFromDB();
      });
      return unSubscribe;
   }, [navigation]);

   const getDataFromDB = async () => {
      const productData = [];
      let cartItems = await AsyncStorage.getItem("cartItems");
      cartItems = JSON.parse(cartItems);
      Items.map(
         (data) => cartItems.includes(data.id) && productData.push(data)
      );
      setAllItems(productData);
   };
   const removeItemCart = async (id) => {
      let itemArray = await AsyncStorage.getItem("cartItems");
      itemArray = JSON.parse(itemArray);
      if (itemArray) {
         let array = itemArray;
         for (let i = 0; i < array.length; i++) {
            if (array[i] === id) {
               array.splice(i, 1);
            }
            await AsyncStorage.setItem("cartItems", JSON.stringify(array));
            getDataFromDB();
         }
      }
   };

   const renderProduct = (id) => {
      navigation.navigate("ProductDetails", { productId: id });
   };

   return (
      <View>
         <StatusBar
            style={{ backgroundColor: COLOURS.white }}
            barStyle="dark-content"
         ></StatusBar>
         <ScrollView
            style={{
               backgroundColor: COLOURS.white,
               width: "100%",
            }}
         >
            <View style={styles.header}>
               <View style={styles.subHeader}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                     <Entypo style={styles.entypo} name="chevron-left" />
                  </TouchableOpacity>
               </View>
               <View style={styles.textBody}>
                  <Text style={styles.orderText}>Order Details</Text>
               </View>
            </View>
            <Text style={styles.mycart}>My Cart</Text>
            <View style={{ padding: 16, position: "relative" }}>
               {allItems.map((pd, index) => {
                  return (
                     <View
                        key={pd.key}
                        style={{ marginBottom: 12, flexDirection: "row" }}
                     >
                        <TouchableOpacity
                           style={styles.imageBox}
                           onPress={() => renderProduct(pd.id)}
                        >
                           <Image
                              style={styles.image}
                              source={pd.productImage}
                           />
                        </TouchableOpacity>
                        <View style={{ marginHorizontal: 20, width: "65%" }}>
                           <Text style={styles.pdname}>{pd.productName}</Text>
                           <Text style={styles.price}>
                              &#8377;{pd.productPrice} (&#8377;
                              {pd.productPrice + pd.productPrice / 20})
                           </Text>
                           <View
                              style={{
                                 flexDirection: "row",
                                 justifyContent: "space-between",
                              }}
                           >
                              <View style={{ flexDirection: "row" }}>
                                 <TouchableOpacity style={styles.plus}>
                                    <MaterialCommunityIcons name="plus" />
                                 </TouchableOpacity>
                                 <Text style={styles.quantity}>1</Text>
                                 <TouchableOpacity style={styles.plus}>
                                    <MaterialCommunityIcons name="minus" />
                                 </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                 style={styles.deleteBox}
                                 onPress={() => removeItemCart(pd.id)}
                              >
                                 <MaterialCommunityIcons
                                    style={{
                                       fontSize: 15,
                                       color: COLOURS.backgroundDark,
                                    }}
                                    name="delete-outline"
                                 />
                              </TouchableOpacity>
                           </View>
                        </View>
                     </View>
                  );
               })}
            </View>
            <DelivaryInfo />
         </ScrollView>
      </View>
   );
};

export default MyCart;

const styles = StyleSheet.create({
   entypo: {
      fontSize: 18,
      padding: 12,
      backgroundColor: COLOURS.backgroundLight,
      borderRadius: 10,
   },
   subHeader: {
      paddingLeft: 16,
      paddingTop: 16,
      flexDirection: "row",
   },
   header: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      backgroundColor: COLOURS.white,
      marginBottom: 10,
   },
   textBody: {
      width: "100%",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingRight: 70,
   },
   orderText: {
      fontSize: 14,
      color: COLOURS.black,
      fontWeight: "400",
   },
   mycart: {
      color: COLOURS.black,
      fontSize: 24,
      fontWeight: "500",
      padding: 16,
   },
   imageBox: {
      width: 90,
      height: 90,
      position: "relative",
      backgroundColor: COLOURS.backgroundLight,
      borderRadius: 10,
      padding: 15,
   },
   image: {
      width: "100%",
      height: "100%",
   },
   plus: {
      borderWidth: 1,
      borderRadius: 100,
      borderColor: COLOURS.backgroundMedium,
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      width: 25,
      height: 25,
   },
   pdname: {
      Width: "80%",
      fontSize: 15,
      fontWeight: "500",
   },
   price: {
      color: COLOURS.backgroundMedium,
      marginVertical: 4,
   },
   quantity: {
      marginHorizontal: 15,
      color: COLOURS.backgroundMedium,
   },
   deleteBox: {
      backgroundColor: COLOURS.backgroundLight,
      padding: 5,
      borderRadius: 100,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
   },
});
