import {
   FlatList,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   Image,
   Dimensions,
   Animated,
   ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Items, COLOURS } from "../database/database";
import { Entypo, Ionicons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetails = ({ route, navigation }) => {
   const { productId } = route.params;

   const [product, setProduct] = useState({});

   const width = Dimensions.get("window").width;

   const schrollx = new Animated.Value(0);
   let position = Animated.divide(schrollx, width);

   useEffect(() => {
      const unSubscribe = navigation.addListener("focus", () => {
         getDataFromDB();
      });
      return unSubscribe;
   }, [navigation]);

   const getDataFromDB = async () => {
      await Items.map((item) => item.id === productId && setProduct(item));
   };

   const addToCart = async (id) => {
      let itemArray = await AsyncStorage.getItem("cartItems");
      itemArray = JSON.parse(itemArray);
      if (itemArray) {
         let array = itemArray;
         array.push(id);
         // if (!array.includes(id)) {
         //    array.push(id);
         // } else {
         //    ToastAndroid.show(
         //       "item already have your cart",
         //       ToastAndroid.SHORT
         //    );
         // }
         try {
            await AsyncStorage.setItem("cartItems", JSON.stringify(array));
            ToastAndroid.show(
               "item added successfully to cart",
               ToastAndroid.SHORT
            );
            navigation.navigate("Home");
         } catch (error) {
            return error;
         }
      } else {
         let array = [];
         array.push(id);
         try {
            await AsyncStorage.setItem("cartItems", JSON.stringify(array));
            ToastAndroid.show(
               "item added successfully to cart",
               ToastAndroid.SHORT
            );
            navigation.navigate("Home");
         } catch (error) {
            console.log(error);
         }
      }
   };

   const renderProduct = ({ item, index }) => {
      return (
         <View
            style={{
               width: width,
               height: 240,
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <Image
               source={item}
               style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
         </View>
      );
   };

   return (
      <View style={styles.main}>
         <StatusBar
            style={{ backgroundColor: COLOURS.backgroundLight }}
            barStyle="dark-content"
         ></StatusBar>
         <ScrollView>
            <View style={styles.headerCart}>
               <View style={styles.subHeader}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                     <Entypo style={styles.entypo} name="chevron-left" />
                  </TouchableOpacity>
               </View>
               <FlatList
                  data={
                     product.productImageList ? product.productImageList : null
                  }
                  horizontal
                  renderItem={renderProduct}
                  showsHorizontalScrollIndicator={false}
                  decelerationRate={0.8}
                  snapToInterval={width}
                  bounces={false}
                  onScroll={Animated.event(
                     [{ nativeEvent: { contentOffset: { x: schrollx } } }],
                     { useNativeDriver: false }
                  )}
               />
               <View style={styles.tab}>
                  {product.productImageList
                     ? product.productImageList.map((data, index) => {
                          let opacity = position.interpolate({
                             inputRange: [index - 1, index, index + 1],
                             outputRange: [0.2, 1, 0.2],
                             extrapolate: "clamp",
                          });
                          return (
                             <Animated.View
                                key={index}
                                style={{
                                   width: "16%",
                                   height: 3,
                                   backgroundColor: COLOURS.black,
                                   opacity: opacity,
                                   marginHorizontal: 4,
                                   borderRadius: 100,
                                }}
                             ></Animated.View>
                          );
                       })
                     : null}
               </View>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                     marginVertical: 14,
                  }}
               >
                  <Entypo name="shopping-cart" style={styles.icon} />
                  <Text style={{ color: COLOURS.black, fontSize: 12 }}>
                     Shopping
                  </Text>
               </View>
               <View
                  style={{
                     marginVertical: 4,
                     flexDirection: "row",
                     alignItems: "center",
                     justifyContent: "space-between",
                  }}
               >
                  <Text style={styles.productname}>{product.productName}</Text>
                  <Ionicons style={styles.linkIcon} name="link-outline" />
               </View>
               <Text style={styles.desc}>{product.description}</Text>
               <View style={styles.locationBox}>
                  <View
                     style={{
                        width: "80%",
                        flexDirection: "row",
                        alignItems: "center",
                     }}
                  >
                     <View style={styles.locationBody}>
                        <Entypo style={styles.location} name="location-pin" />
                     </View>
                     <Text style={{ fontSize: 13, fontWeight: "300" }}>
                        Sylhet 125/78 Road,{"\n"} Silam - Rustompur
                     </Text>
                  </View>
                  <TouchableOpacity>
                     <Entypo
                        style={{ color: COLOURS.backgroundDark, fontSize: 22 }}
                        name="chevron-right"
                     />
                  </TouchableOpacity>
               </View>
               <View style={{ paddingHorizontal: 16 }}>
                  <Text style={styles.price}>
                     &#8377; {product.productPrice}
                  </Text>
                  <Text>
                     Tex Rate: 2%~ &#8377; {product.productPrice / 20} (&#8377;{" "}
                     {product.productPrice + product.productPrice / 20})
                  </Text>
               </View>
            </View>
         </ScrollView>
         <View style={styles.btnBox}>
            <TouchableOpacity
               style={{
                  backgroundColor: product.isAvailable
                     ? COLOURS.blue
                     : COLOURS.backgroundLight,
                  width: "86%",
                  height: "90%",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
               }}
               onPress={() =>
                  product.isAvailable ? addToCart(product.id) : null
               }
            >
               <Text
                  style={{
                     fontSize: 12,
                     fontWeight: "500",
                     color: product.isAvailable ? COLOURS.white : COLOURS.black,
                     letterSpacing: 1,
                     textTransform: "uppercase",
                  }}
               >
                  {product.isAvailable ? "ADD to cart" : "Not Available"}
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default ProductDetails;

const styles = StyleSheet.create({
   main: {
      width: "100%",
      height: "100%",
      backgroundColor: COLOURS.white,
      position: "relative",
   },
   entypo: {
      fontSize: 18,
      padding: 12,
      backgroundColor: COLOURS.white,
      borderRadius: 10,
   },
   headerCart: {
      width: "100%",
      backgroundColor: COLOURS.backgroundLight,
      borderRadius: 20,
      marginBottom: 4,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
   },
   subHeader: {
      width: "100%",
      paddingLeft: 16,
      paddingTop: 16,
      flexDirection: "row",
   },
   tab: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      marginTop: 32,
   },
   icon: {
      fontSize: 18,
      color: COLOURS.blue,
      marginRight: 6,
   },
   productname: {
      fontSize: 24,
      fontWeight: "600",
      letterSpacing: 0.5,
      marginVertical: 4,
      color: COLOURS.black,
      maxWidth: "84%",
   },
   linkIcon: {
      color: COLOURS.blue,
      fontSize: 24,
      backgroundColor: COLOURS.blue + 10,
      padding: 8,
      borderRadius: 100,
   },
   desc: {
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 1,
      color: COLOURS.black,
      lineHeight: 20,
      opacity: 0.5,
      maxWidth: "85%",
      maxHeight: 44,
      marginBottom: 18,
   },
   location: {
      fontSize: 16,
      color: COLOURS.blue,
   },
   locationBody: {
      backgroundColor: COLOURS.backgroundLight,
      color: COLOURS.blue,
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      marginRight: 10,
      borderRadius: 100,
   },
   locationBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomColor: COLOURS.backgroundLight,
      borderBottomWidth: 1,
      paddingBottom: 20,
   },
   price: {
      fontSize: 18,
      fontWeight: "500",
      maxWidth: "85%",
      color: COLOURS.black,
      marginBottom: 4,
   },
   btnBox: {
      position: "absolute",
      bottom: 10,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "8%",
      backgroundColor: COLOURS.white,
   },
});
