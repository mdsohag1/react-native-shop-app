import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLOURS } from "../database/database";
import { FontAwesome } from "react-native-vector-icons";

const ProductCart = ({ data, navigation }) => {
   return (
      <TouchableOpacity
         style={styles.productcartTouch}
         onPress={() =>
            navigation.navigate("ProductDetails", { productId: data.id })
         }
      >
         <View style={styles.productCart}>
            {data.isOff ? (
               <Text style={styles.off}>{data.offPercentage}%</Text>
            ) : null}
            <Image style={styles.image} source={data.productImage} />
         </View>
         <Text style={styles.name}>{data.productName}</Text>
         {data.category === "accessory" ? (
            <View style={styles.Abailable}>
               <FontAwesome
                  name="circle"
                  style={{
                     color: data.isAvailable ? COLOURS.green : COLOURS.red,
                     fontSize: 10,
                  }}
               />
               <Text
                  style={{
                     color: data.isAvailable ? COLOURS.green : COLOURS.red,
                     marginLeft: 5,
                     fontSize: 10,
                  }}
               >
                  {data.isAvailable ? "Available" : "unAvailable"}
               </Text>
            </View>
         ) : null}
         <Text style={styles.price}>&#8377; {data.productPrice}</Text>
      </TouchableOpacity>
   );
};

export default ProductCart;

const styles = StyleSheet.create({
   productcartTouch: {
      width: "48%",
      marginVertical: 14,
   },
   productCart: {
      width: "100%",
      height: 100,
      backgroundColor: COLOURS.backgroundLight,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      borderRadius: 10,
      marginBottom: 8,
   },
   image: {
      width: "80%",
      height: "80%",
      resizeMode: "contain",
   },
   off: {
      backgroundColor: COLOURS.green,
      color: COLOURS.white,
      position: "absolute",
      top: 0,
      left: 0,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      width: "20%",
      height: "24%",
      fontSize: 12,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontWeight: "bold",
   },
   name: {
      fontSize: 12,
      color: COLOURS.black,
      marginBottom: 5,
   },
   price: {
      fontSize: 12,
      color: COLOURS.black,
      marginBottom: 10,
      color: COLOURS.backgroundDark,
   },
   Abailable: {
      flexDirection: "row",
      alignItems: "center",
   },
});
