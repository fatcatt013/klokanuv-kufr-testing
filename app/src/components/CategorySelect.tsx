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
  console.log(categories.map(cat => ([cat.label, icons[cat.label]])));

  return <SafeAreaView style={{
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  }}>
    {categories.map(cat => (
      <TouchableOpacity key={cat.id} onPress={() => selectCategory(cat.id)} style={{
        flexBasis: '33%',
        flexGrow: 1,
        alignItems: 'flex-start',
        alignContent: 'center',
        padding: 5
      }}>
        {React.createElement(icons[cat.label], {
          style: { width: 75, height: 75, marginHorizontal: 'auto' },
        })}
        <Caption style={{ alignSelf: 'stretch', textAlign: 'center' }}>{cat.label}</Caption>
      </TouchableOpacity>
    ))}
  </SafeAreaView>
}
