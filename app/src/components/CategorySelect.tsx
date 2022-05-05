import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Caption } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../store";
import { icons } from "./icons";

interface CategorySelectProps {
  selectCategory: (catId: number) => void;
}

export const CategorySelect = ({ selectCategory }: CategorySelectProps) => {
  const categories = useRecoilValue(categoriesState);

  return <SafeAreaView style={{}}>
    {categories.map(cat => (
      <TouchableOpacity onPress={() => selectCategory(cat.id)} style={{}}>
        {React.createElement(icons[cat.label], {
          style: { width: 75, height: 75 },
        })}
        <Caption>{cat.label}</Caption>
      </TouchableOpacity>
    ))}
  </SafeAreaView>
}
