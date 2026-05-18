import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

interface ThemedScrollViewProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<TextStyle>;
}
export default ThemedScrollViewProps;
