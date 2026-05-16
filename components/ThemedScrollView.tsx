import ThemedScrollViewProps from "@/@types/props/themedScrollView.props";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ScrollView } from "react-native";

export default function ThemedScrollView({ children }: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      {children}
    </ScrollView>
  );
}
