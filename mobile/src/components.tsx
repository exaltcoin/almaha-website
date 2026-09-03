import { ReactNode, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles, spacing } from "./theme";

export function ScreenContainer({
  children,
  scroll = true
}: {
  children: ReactNode;
  scroll?: boolean;
}) {
  const content = <View style={styles.screen}>{children}</View>;
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safe}>
      {scroll ? <View style={styles.flex}>{content}</View> : content}
    </SafeAreaView>
  );
}
export function AppButton({
  title,
  onPress,
  secondary = false,
  loading = false
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  loading?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondaryButton,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.buttonText, secondary && styles.secondaryText]}>
        {loading ? "Please wait..." : title}
      </Text>
    </Pressable>
  );
}
export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = "sentences",
  secureTextEntry = false
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "number-pad";
  autoCapitalize?: "none" | "sentences";
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={commonStyles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9AA39C"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}
export function PasswordInput(
  props: Omit<React.ComponentProps<typeof AppInput>, "secureTextEntry">
) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <AppInput {...props} secureTextEntry={!visible} />
      <Pressable onPress={() => setVisible(!visible)} style={styles.show}>
        <Text style={styles.showText}>{visible ? "Hide" : "Show"}</Text>
      </Pressable>
    </View>
  );
}
export function LoadingScreen() {
  return (
    <ScreenContainer scroll={false}>
      <View style={styles.center}>
        <ActivityIndicator color={colors.green} size="large" />
        <Text style={commonStyles.subtitle}>Loading your account...</Text>
      </View>
    </ScreenContainer>
  );
}
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.error}>{message}</Text>
      {onRetry && <AppButton title="Try again" onPress={onRetry} secondary />}
    </View>
  );
}
export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={commonStyles.subtitle}>{message}</Text>
    </View>
  );
}
export function StatusBadge({ status }: { status: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{status.replaceAll("_", " ")}</Text>
    </View>
  );
}
export function SectionCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}
export function AppHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      {onBack && (
        <Pressable accessibilityRole="button" onPress={onBack}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
      )}
      <Image
        source={require("../assets/brand/icon-512-transparent.png")}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  flex: { flex: 1 },
  screen: { flex: 1, padding: spacing.lg },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.sm },
  button: { minHeight: 52, borderRadius: 8, backgroundColor: colors.green, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.md, marginTop: spacing.sm },
  secondaryButton: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  pressed: { opacity: 0.78 },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  secondaryText: { color: colors.green },
  field: { marginBottom: spacing.md },
  input: { minHeight: 52, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 8, paddingHorizontal: spacing.md, color: colors.ink, fontSize: 16 },
  show: { position: "absolute", right: 14, bottom: 17 },
  showText: { color: colors.green, fontWeight: "700" },
  header: { flexDirection: "row", alignItems: "center", minHeight: 44, marginBottom: spacing.md, gap: spacing.md },
  headerLogo: { width: 24, height: 24 },
  headerTitle: { ...commonStyles.title, fontSize: 22 },
  back: { color: colors.green, fontWeight: "700" },
  error: { color: colors.danger, textAlign: "center", fontSize: 15 },
  empty: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: spacing.lg, backgroundColor: colors.white, marginTop: spacing.sm },
  emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: spacing.xs },
  card: { backgroundColor: colors.white, borderRadius: 8, borderWidth: 1, borderColor: colors.line, padding: spacing.md, marginBottom: spacing.md },
  badge: { alignSelf: "flex-start", backgroundColor: colors.lime, borderRadius: 5, paddingHorizontal: 9, paddingVertical: 5 },
  badgeText: { color: colors.ink, fontSize: 11, fontWeight: "800", textTransform: "uppercase" }
});