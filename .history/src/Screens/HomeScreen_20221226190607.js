import * as React from "react";
import { View, TextInput } from "react-native";
import { SearchBar } from "../components/SearchBar";
import styled from "styled-components/native";
import { useState } from "react";

const Title = styled.Text`
fontWeight: bold,
fontSize: 55px`;

const P1 = styled.Text`
  lineheight: 2px;
  fontsize: 25px;
`;

const TextIp = styled.TextInput`
  borderwidth: 1px;
  bordercolor: "#777";
  padding: 8px;
  width: 200px;
`;

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <View style={{ flex: 1 }}>
        <Title>Ready, Set, Summer</Title>
        <P1>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
          sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </P1>
      </View>
    </>
  );
};

export default HomeScreen;
