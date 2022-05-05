import React from "react";
import { useRecoilValue } from "recoil";
import { PaperSelect } from 'react-native-paper-select';
import { childrenByGroupState } from "../store";

interface ChildPickerProps {
  classId: number;
  selectChildren: (text: string, ids: number[]) => void;
}

export const ChildPicker = React.memo(function ChildPicker(props: ChildPickerProps) {
  const children = useRecoilValue(childrenByGroupState(props.classId)).map(x => ({
    _id: x.id.toString(),
    value: x.name,
  }));

  const [state, setState] = React.useState({
    value: '',
    selectedList: [],
    error: '',
  });

  return <PaperSelect
    label="Vyberte děti"
    value={state.value}
    onSelection={(value: any) => {
      setState({
        ...state,
        value: value.text,
        selectedList: value.selectedList,
      });
      props.selectChildren(value.text, value.selectedList);
    }}
    arrayList={children}
    selectedArrayList={state.selectedList}
    errorText=""
    multiEnable={true}
    textInputMode="flat"
  />
});
