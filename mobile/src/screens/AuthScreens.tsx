import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton, AppInput, PasswordInput, ScreenContainer } from "../components";
import { colors, commonStyles, spacing } from "../theme";
import { en } from "../i18n";
import { login, requestPasswordReset, resetPassword, resendVerification } from "../auth/authService";
import { registerCustomer, verifyEmail } from "../auth/registrationService";
import { useAuth } from "../auth/AuthContext";

type AuthMode = "login" | "register" | "verify" | "forgot" | "reset";
type Props = { onAuthenticated: () => void };

function message(error: unknown) {
  return error instanceof Error ? error.message : "We could not complete that request. Please try again.";
}
function validEmail(email: string) { return /^\S+@\S+\.\S+$/.test(email.trim()); }
function validPassword(password: string) {
  return password.length >= 10 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

export function AuthScreens({ onAuthenticated }: Props) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const { login: signIn } = useAuth();

  useEffect(() => {
    if (!cooldown) return;
    const timer = setInterval(() => setCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);
  const resetFeedback = () => { setError(""); setNotice(""); };
  const go = (next: AuthMode) => { resetFeedback(); setMode(next); };
  const submit = async () => {
    resetFeedback();
    if (!validEmail(email)) { setError("Enter a valid email address."); return; }
    if ((mode === "login" || mode === "register") && !password) { setError("Enter your password."); return; }
    if (mode === "register" && (!fullName.trim() || !validPassword(password) || password !== confirmation)) {
      setError(!fullName.trim() ? "Enter your full name." : password !== confirmation ? "Passwords do not match." : "Use at least 10 characters with uppercase, lowercase, and a number.");
      return;
    }
    if (mode === "verify" && !/^\d{6}$/.test(code)) { setError("Enter the six-digit verification code."); return; }
    if (mode === "reset" && (!/^\d{6}$/.test(code) || !validPassword(password) || password !== confirmation)) {
      setError(password !== confirmation ? "Passwords do not match." : !validPassword(password) ? "Use at least 10 characters with uppercase, lowercase, and a number." : "Enter the six-digit reset code.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "login") { await signIn(email, password); onAuthenticated(); }
      else if (mode === "register") { await registerCustomer({ fullName, email, phone, password }); setNotice("Check your email for the verification code."); setMode("verify"); }
      else if (mode === "verify") { await verifyEmail({ email, code }); setNotice("Email verified. You can now sign in."); setMode("login"); setCode(""); }
      else if (mode === "forgot") { await requestPasswordReset(email); setNotice("If an account exists, a reset code will be sent."); setMode("reset"); }
      else { await resetPassword(email, code, password); setNotice("Password updated. You can now sign in."); setMode("login"); setCode(""); setPassword(""); setConfirmation(""); }
    } catch (caught) { setError(message(caught)); } finally { setBusy(false); }
  };
  const title = mode === "login" ? "Welcome back" : mode === "register" ? "Create your account" : mode === "verify" ? "Verify your email" : mode === "forgot" ? "Recover your account" : "Set a new password";
  const buttonTitle = busy ? "Please wait..." : mode === "login" ? en.signIn : mode === "register" ? "Create account" : mode === "verify" ? "Verify email" : mode === "forgot" ? "Send reset code" : "Reset password";

  return (
    <ScreenContainer scroll={false}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Image source={require("../../assets/brand/logo-almaha-full.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.kicker}>AL MAHA ALUMINUM</Text>
          <Text style={commonStyles.title}>{title}</Text>
          <Text style={styles.intro}>{mode === "login" ? "A trusted partner for architectural aluminum solutions in Kuwait." : "Secure access to your projects and requests."}</Text>
          {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
          {notice ? <Text style={styles.notice}>{notice}</Text> : null}
          {mode === "register" ? <><AppInput label={en.fullName} value={fullName} onChangeText={setFullName} placeholder="Your full name" /><AppInput label={en.phone} value={phone} onChangeText={setPhone} placeholder="+965 ..." keyboardType="phone-pad" /></> : null}
          <AppInput label={en.email} value={email} onChangeText={setEmail} placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" />
          {mode === "verify" || mode === "reset" ? <AppInput label={en.code} value={code} onChangeText={setCode} placeholder="123456" keyboardType="number-pad" autoCapitalize="none" /> : null}
          {mode === "login" || mode === "register" ? <PasswordInput label={en.password} value={password} onChangeText={setPassword} placeholder="Your password" autoCapitalize="none" /> : null}
          {mode === "register" || mode === "reset" ? <><Text style={styles.requirements}>10+ characters, uppercase, lowercase, and a number</Text><PasswordInput label="Confirm password" value={confirmation} onChangeText={setConfirmation} placeholder="Repeat your password" autoCapitalize="none" /></> : null}
          <AppButton title={buttonTitle} loading={busy} onPress={() => void submit()} />
          {mode === "verify" ? <AppButton title={cooldown ? `Resend code in ${cooldown}s` : "Resend verification code"} secondary loading={busy || !!cooldown} onPress={async () => { setBusy(true); resetFeedback(); try { await resendVerification(email); setCooldown(60); setNotice("A new code has been sent if the account is pending verification."); } catch (caught) { setError(message(caught)); } finally { setBusy(false); } }} /> : null}
          <View style={styles.links}>{mode === "login" ? <><Text onPress={() => go("forgot")} style={styles.link}>Forgot password?</Text><Text onPress={() => go("register")} style={styles.link}>Create an account</Text></> : <Text onPress={() => go("login")} style={styles.link}>Back to sign in</Text>}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, content: { flexGrow: 1, justifyContent: "center", paddingVertical: spacing.lg }, logo: { width: 220, height: 70, alignSelf: "center", marginBottom: spacing.md }, kicker: { color: colors.green, fontSize: 12, fontWeight: "900", letterSpacing: 1, marginBottom: spacing.sm }, intro: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: spacing.sm, marginBottom: spacing.lg }, error: { color: colors.danger, backgroundColor: "#FCEDEA", padding: spacing.sm, borderRadius: 6, marginBottom: spacing.md }, notice: { color: colors.green, backgroundColor: "#E8F2EC", padding: spacing.sm, borderRadius: 6, marginBottom: spacing.md }, requirements: { color: colors.muted, fontSize: 12, marginTop: -spacing.sm, marginBottom: spacing.md }, links: { alignItems: "center", gap: spacing.xs, marginTop: spacing.md }, link: { color: colors.green, fontWeight: "800", padding: spacing.xs }
});import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton, AppInput, PasswordInput, ScreenContainer } from "../components";
import { colors, commonStyles, spacing } from "../theme";
import { en } from "../i18n";
import { login, requestPasswordReset, resetPassword, resendVerification } from "../auth/authService";
import { registerCustomer, verifyEmail } from "../auth/registrationService";
import { useAuth } from "../auth/AuthContext";

type AuthMode = "login" | "register" | "verify" | "forgot" | "reset";
type Props = { onAuthenticated: () => void };

function message(error: unknown) { return error instanceof Error ? error.message : "We could not complete that request. Please try again."; }
function validEmail(email: string) { return /^\S+@\S+\.\S+$/.test(email.trim()); }
function validPassword(password: string) { return password.length >= 10 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password); }

export function AuthScreens({ onAuthenticated }: Props) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const { login: signIn } = useAuth();

  useEffect(() => { if (!cooldown) return; const timer = setInterval(() => setCooldown((value) => Math.max(0, value - 1)), 1000); return () => clearInterval(timer); }, [cooldown]);
  const resetFeedback = () => { setError(""); setNotice(""); };
  const go = (next: AuthMode) => { resetFeedback(); setMode(next); };
  const submit = async () => {
    resetFeedback();
    if (!validEmail(email)) { setError("Enter a valid email address."); return; }
    if ((mode === "login" || mode === "register") && !password) { setError("Enter your password."); return; }
    if (mode === "register" && (!fullName.trim() || !validPassword(password) || password !== confirmation)) { setError(!fullName.trim() ? "Enter your full name." : password !== confirmation ? "Passwords do not match." : "Use at least 10 characters with uppercase, lowercase, and a number."); return; }
    if (mode === "verify" && !/^\d{6}$/.test(code)) { setError("Enter the six-digit verification code."); return; }
    if (mode === "reset" && (!/^\d{6}$/.test(code) || !validPassword(password) || password !== confirmation)) { setError(password !== confirmation ? "Passwords do not match." : !validPassword(password) ? "Use at least 10 characters with uppercase, lowercase, and a number." : "Enter the six-digit reset code."); return; }
    setBusy(true);
    try {
      if (mode === "login") { await signIn(email, password); onAuthenticated(); }
      else if (mode === "register") { await registerCustomer({ fullName, email, phone, password }); setNotice("Check your email for the verification code."); setMode("verify"); }
      else if (mode === "verify") { await verifyEmail({ email, code }); setNotice("Email verified. You can now sign in."); setMode("login"); setCode(""); }
      else if (mode === "forgot") { await requestPasswordReset(email); setNotice("If an account exists, a reset code will be sent."); setMode("reset"); }
      else { await resetPassword(email, code, password); setNotice("Password updated. You can now sign in."); setMode("login"); setCode(""); setPassword(""); setConfirmation(""); }
    } catch (caught) { setError(message(caught)); } finally { setBusy(false); }
  };
  const title = mode === "login" ? "Welcome back" : mode === "register" ? "Create your account" : mode === "verify" ? "Verify your email" : mode === "forgot" ? "Recover your account" : "Set a new password";
  return <ScreenContainer scroll={false}><KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><Image source={require("../../assets/brand/logo-almaha-full.png")} style={styles.logo} resizeMode="contain" /><Text style={styles.kicker}>AL MAHA ALUMINUM</Text><Text style={commonStyles.title}>{title}</Text><Text style={styles.intro}>{mode === "login" ? "A trusted partner for architectural aluminum solutions in Kuwait." : "Secure access to your projects and requests."}</Text>{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}{notice ? <Text style={styles.notice}>{notice}</Text> : null}{mode === "register" ? <><AppInput label={en.fullName} value={fullName} onChangeText={setFullName} placeholder="Your full name" /><AppInput label={en.phone} value={phone} onChangeText={setPhone} placeholder="+965 ..." keyboardType="phone-pad" /></> : null}{mode !== "login" || mode === "login" ? <AppInput label={en.email} value={email} onChangeText={setEmail} placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" /> : null}{mode === "verify" || mode === "reset" ? <AppInput label={en.code} value={code} onChangeText={setCode} placeholder="123456" keyboardType="number-pad" autoCapitalize="none" /> : null}{mode === "login" || mode === "register" ? <PasswordInput label={en.password} value={password} onChangeText={setPassword} placeholder="Your password" autoCapitalize="none" /> : null}{mode === "register" || mode === "reset" ? <><Text style={styles.requirements}>10+ characters, uppercase, lowercase, and a number</Text><PasswordInput label="Confirm password" value={confirmation} onChangeText={setConfirmation} placeholder="Repeat your password" autoCapitalize="none" /></> : null}<AppButton title={busy ? "Please wait..." : mode === "login" ? en.signIn : mode === "register" ? "Create account" : mode === "verify" ? "Verify email" : mode === "forgot" ? "Send reset code" : "Reset password"} loading={busy} onPress={() => void submit()} />{mode === "verify" ? <AppButton title={cooldown ? `Resend code in ${cooldown}s` : "Resend verification code"} secondary loading={busy || !!cooldown} onPress={async () => { setBusy(true); resetFeedback(); try { await resendVerification(email); setCooldown(60); setNotice("A new code has been sent if the account is pending verification."); } catch (caught) { setError(message(caught)); } finally { setBusy(false); } }} /> : null}<View style={styles.links}>{mode === "login" ? <><Text onPress={() => go("forgot")} style={styles.link}>Forgot password?</Text><Text onPress={() => go("register")} style={styles.link}>Create an account</Text></> : <Text onPress={() => go("login")} style={styles.link}>Back to sign in</Text>}</View></ScrollView></KeyboardAvoidingView></ScreenContainer>;
}
const styles = StyleSheet.create({ flex: { flex: 1 }, content: { flexGrow: 1, justifyContent: "center", paddingVertical: spacing.lg }, logo: { width: 220, height: 70, alignSelf: "center", marginBottom: spacing.md }, kicker: { color: colors.green, fontSize: 12, fontWeight: "900", letterSpacing: 1, marginBottom: spacing.sm }, intro: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: spacing.sm, marginBottom: spacing.lg }, error: { color: colors.danger, backgroundColor: "#FCEDEA", padding: spacing.sm, borderRadius: 6, marginBottom: spacing.md }, notice: { color: colors.green, backgroundColor: "#E8F2EC", padding: spacing.sm, borderRadius: 6, marginBottom: spacing.md }, requirements: { color: colors.muted, fontSize: 12, marginTop: -spacing.sm, marginBottom: spacing.md }, links: { alignItems: "center", gap: spacing.xs, marginTop: spacing.md }, link: { color: colors.green, fontWeight: "800", padding: spacing.xs } });
