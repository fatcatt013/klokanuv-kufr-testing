import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Modal, Text } from "react-native-paper";
import { Components } from "../server";
import { useCoreData } from "../use-core-data";
import { icons } from "./icons";

interface CategoryGridProps {
  open: boolean;
  onSelect: (catId: number) => void;
  onClose: () => void;
}

export const CategoryGrid = ({ onSelect, onClose, open }: CategoryGridProps) => {
  const { data } = useCoreData();
  const categories = [...(data?.categories || [])];
  let ordered: Components.Schemas.Category[] = [];
  Object.keys(icons).forEach(label => {
    const i = categories.findIndex(x => x.label === label);
    if (i > -1) {
      ordered = ordered.concat(categories.splice(i, 1));
    }
  });
  ordered = ordered.concat(categories);

  return <Modal visible={open} onDismiss={onClose}>
    <View style={{
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
    }}>
      {ordered.map(cat => (
        <View key={cat.id} style={{
          flexBasis: '40%',
          flexGrow: 1,
          alignItems: 'center',
          alignContent: 'center',
          marginVertical: 5
        }}>
          <TouchableOpacity onPress={() => { onClose(); onSelect(cat.id!!) }}>
            {React.createElement(icons[cat.label], {
              style: { width: 70, height: 70, marginHorizontal: 'auto' },
            })}
          </TouchableOpacity>
          <Text style={{ alignSelf: 'stretch', textAlign: 'center', marginTop: 5, fontWeight: 'bold', color: 'white' }}>{cat.label}</Text>
        </View>
      ))}
    </View>
  </Modal>
}
