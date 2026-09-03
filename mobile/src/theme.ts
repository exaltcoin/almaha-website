import { StyleSheet } from "react-native";

export const colors = {
  ink: "#17211B",
  muted: "#68736C",
  paper: "#F7F8F4",
  white: "#FFFFFF",
  green: "#1D614A",
  lime: "#C8E36B",
  line: "#DEE5DD",
  danger: "#B4493E"
} as const;
export const spacing = { xs: 6, sm: 12, md: 18, lg: 28, xl: 40 } as const;
export const commonStyles = StyleSheet.create({
  title: { color: colors.ink, fontSize: 30, fontWeight: "800", letterSpacing: 0 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  label: { color: colors.ink, fontSize: 13, fontWeight: "700", marginBottom: 8 }
});