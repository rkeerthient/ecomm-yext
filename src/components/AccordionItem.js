import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Markdown from "react-native-markdown-display";
const copy = `# h1 Heading 8-)
 
**This is some bold text!**
 
This is normal text
`;

const AccordionItem = ({ answer, title }) => {
  const [expanded, setExpanded] = useState(false);
  function toggleItem() {
    setExpanded(!expanded);
  }

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{title}</Text>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#bbb"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.accordBody}>
          <Markdown>{answer}</Markdown>
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordTitle: {
    fontSize: 20,
    color: "whiredte",
    width: "90%",
  },
  accordBody: {
    padding: 12,
  },

  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});
