/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const spotifyGreen = "#1ed760";

export const Colors = {
  light: {
    text: "#181818",
    textSecondary: "#4d4d4d",
    background: "#f0f0f0",
    surface: "#fdfdfd",
    surfaceAlt: "#cbcbcb",
    card: "#ffffff",
    tint: spotifyGreen,
    icon: "#4d4d4d",
    border: "#7c7c7c",
    borderLight: "#232323",
    separator: "#b3b3b3",
    tabIconDefault: "#7c7c7c",
    tabIconSelected: spotifyGreen,
    negative: "#f3727f",
    warning: "#ffa42b",
    announcement: "#539df5",
    greenBorder: "#1db954",
    pink: "#fe2fd5",
  },
  dark: {
    text: "#ffffff",
    textSecondary: "#b3b3b3",
    background: "#000",
    surface: "#131313",
    surfaceAlt: "#1f1f1f",
    card: "#252525",
    cardAlt: "#272727",
    tint: spotifyGreen,
    icon: "#b3b3b3",
    border: "#4d4d4d",
    borderLight: "#2a2a2a",
    separator: "#b3b3b3",
    tabIconDefault: "#b3b3b3",
    tabIconSelected: spotifyGreen,
    negative: "#f3727f",
    warning: "#ffa42b",
    announcement: "#539df5",
    greenBorder: "#1db954",
    pink: "#c64bec",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
