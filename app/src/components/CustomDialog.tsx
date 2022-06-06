import React from "react";
import { Dialog, useTheme } from "react-native-paper";

export const CustomDialog: typeof Dialog = ({ style, ...props }) => {
  const theme = useTheme();
  return <Dialog style={{
    backgroundColor: theme.colors.background,
    padding: 4,
    ...(style as object || {}),
  }} {...props} />;
};
CustomDialog.Actions = Dialog.Actions;
CustomDialog.Content = Dialog.Content;
CustomDialog.Title = Dialog.Title;
CustomDialog.ScrollArea = Dialog.ScrollArea;
