import ThemedScrollViewProps from "@/@types/props/themedScrollView.props";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ScrollView, type ViewStyle } from "react-native";

export default function ThemedScrollView({
  children,
  style,
  contentContainerStyle,
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle as ViewStyle}
      style={[{ backgroundColor } as ViewStyle, (style || {}) as ViewStyle]}
    >
      {children}
    </ScrollView>
  );
}
