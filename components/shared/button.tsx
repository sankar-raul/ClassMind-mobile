import { useThemeColor } from "@/hooks/use-theme-color";
import { ReactNode, useMemo } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type ButtonType = "primary" | "secondery";
type ButtonTheme = "default" | "negative" | "warning" | "info";
export interface PrimaryButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  theme?: ButtonTheme;
}
export default function Button({
  children,
  icon,
  type = "primary",
  style,
  theme = "default",
}: PrimaryButtonProps) {
  const primaryColor = useThemeColor({}, "tint");
  const negativeColor = useThemeColor({}, "negative");
  const warningColor = useThemeColor({}, "warning");
  const infoColor = useThemeColor({}, "announcement");
  const buttonTheme = useMemo<Record<ButtonTheme, string>>(
    () => ({
      default: primaryColor,
      negative: negativeColor,
      warning: warningColor,
      info: infoColor,
    }),
    [infoColor, negativeColor, primaryColor, warningColor],
  );
  const ripple = useMemo(() => {
    return {
      foreground: true,
      borderless: false,
      // ...(type === "secondery" ? { color: primaryColor } : {}),
    };
  }, []);

  return (
    <Pressable
      android_ripple={ripple}
      style={[
        {
          backgroundColor:
            type === "primary" ? buttonTheme[theme] : "transparent",
        },
        styles["container"],
        style as ViewStyle,
      ]}
    >
      {icon || ""}
      <Text
        style={[
          { color: type === "secondery" ? buttonTheme[theme] : "#fff" },
          styles["text"],
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    paddingBlock: 12,
    paddingInline: 12,
    gap: 4,
    borderRadius: 30,
  },
  text: {
    // color: "#ffffff",
    fontWeight: 600,
    fontSize: 16,
  },
});
