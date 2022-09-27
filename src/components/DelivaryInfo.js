import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { COLOURS } from "../database/database";

const DelivaryInfo = () => {
   return (
      <View style={{ paddingHorizontal: 16 }}>
         <Text style={styles.text}>Delivary Location</Text>
         <View
            style={{
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
               marginBottom: 15,
            }}
         >
            <View style={{ flexDirection: "row" }}>
               <MaterialCommunityIcons
                  style={{
                     padding: 10,
                     backgroundColor: COLOURS.backgroundLight,
                     borderRadius: 10,
                     fontSize: 20,
                     color: COLOURS.blue,
                     marginRight: 20,
                  }}
                  name="truck-delivery-outline"
               />
               <View>
                  <Text style={{ color: COLOURS.black, fontWeight: "500" }}>
                     Sylhet, Bangladesh
                  </Text>
                  <Text
                     style={{
                        color: COLOURS.black,
                        fontWeight: "300",
                        marginTop: 5,
                     }}
                  >
                     01744****77
                  </Text>
               </View>
            </View>
            <MaterialCommunityIcons
               style={{ fontSize: 20, padding: 10 }}
               name="chevron-left"
            />
         </View>
         <Text
            style={{
               fontSize: 18,
               marginBottom: 20,
               fontWeight: "500",
               color: COLOURS.black,
               marginTop: 10,
            }}
         >
            Payment Method
         </Text>
         <View
            style={{
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
               marginBottom: 20,
            }}
         >
            <View style={{ flexDirection: "row" }}>
               <Text
                  style={{
                     padding: 10,
                     backgroundColor: COLOURS.backgroundLight,
                     borderRadius: 10,
                     fontSize: 15,
                     color: COLOURS.blue,
                     marginRight: 20,
                     fontWeight: "bold",
                  }}
                  name="truck-delivery-outline"
               >
                  VISA
               </Text>
               <View>
                  <Text style={{ color: COLOURS.black, fontWeight: "500" }}>
                     Brack Bank LTD
                  </Text>
                  <Text
                     style={{
                        color: COLOURS.black,
                        fontWeight: "300",
                        marginTop: 5,
                        color: COLOURS.backgroundDark,
                     }}
                  >
                     47787***************45
                  </Text>
               </View>
            </View>
            <MaterialCommunityIcons
               style={{ fontSize: 20, padding: 10 }}
               name="chevron-left"
            />
         </View>
      </View>
   );
};

export default DelivaryInfo;

const styles = StyleSheet.create({
   text: {
      fontSize: 18,
      marginBottom: 20,
      fontWeight: "500",
      color: COLOURS.black,
   },
});
