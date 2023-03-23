import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

const StaticContent = () => {
  const services = [
    {
      id: 1,
      icon: <Icon name="progress-upload" size={24} />,
      title: "About us",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
    },
    {
      id: 2,
      icon: <FontAwesome5 name="emoji-happy" size={24} />,
      title: "Premium Fabrics",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
    },
    {
      id: 3,
      icon: <Entypo name="emoji-happy" size={24} />,
      title: "What they're saying",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text style={styles.header}>Make The Difference</Text>
        <Text style={styles.header}>All Shapes And Sizes</Text>
      </View>
      <Text style={{ marginTop: 20 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum
        debitis consectetur reprehenderit non aliquam voluptates dolore aut vero
        consequuntur.
      </Text>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 10,
        }}
      >
        {services.map((item) => (
          <View
            key={item.id}
            style={{
              padding: 20,
              alignSelf: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#c5a491",
              marginVertical: 5,
              borderRadius: 20,
            }}
          >
            {item.icon}
            <Text style={{ marginTop: 15 }}>{item.title}</Text>
            <Text style={{ marginTop: 15 }}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StaticContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaddd7",
    padding: 20,
  },
  header: {
    fontSize: 20,
  },
});
