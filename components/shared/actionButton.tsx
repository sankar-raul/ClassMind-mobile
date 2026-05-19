import { useThemeColor } from "@/hooks/use-theme-color";
import { ReactNode, useCallback, useMemo } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../themed-text";

type ButtonType = "primary" | "secondery";
type ButtonTheme = "default" | "negative" | "warning" | "info";
export interface ActionButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  theme?: ButtonTheme;
  onClick?: () => void;
}
export default function ActionButton({
  children,
  icon,
  type = "primary",
  style,
  theme = "default",
  contentStyle,
  onClick,
}: ActionButtonProps) {
  const primaryColor = useThemeColor({}, "tint");
  const negativeColor = useThemeColor({}, "negative");
  const warningColor = useThemeColor({}, "warning");
  const infoColor = useThemeColor({}, "announcement");
  const textColor = useThemeColor({}, "text");
  const surfaceColor = useThemeColor({}, "surface");
  const buttonTheme = useMemo<Record<ButtonTheme, string>>(
    () => ({
      default: primaryColor,
      negative: negativeColor,
      warning: warningColor,
      info: infoColor,
    }),
    [infoColor, negativeColor, primaryColor, warningColor],
  );
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);
  return (
    <View style={[styles["contentContainer"], contentStyle]}>
      <Pressable
        onPress={handleClick}
        android_ripple={{ foreground: true, borderless: false }}
        style={[
          {
            backgroundColor:
              type === "primary" ? buttonTheme[theme] : surfaceColor,
            ...(type === "secondery"
              ? { borderWidth: 2, borderColor: "#fff0" }
              : {}),
          },
          styles["container"],
          style as ViewStyle,
        ]}
      >
        {icon || ""}
      </Pressable>
      <ThemedText type="default" style={[{ color: textColor }, styles["text"]]}>
        {children}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    gap: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 72,
    aspectRatio: "1/1",
    // gap: 4,
    borderRadius: "50%",
  },
  text: {
    // color: "#ffffff",
    fontWeight: 500,
    // fontSize: 16,
  },
});
