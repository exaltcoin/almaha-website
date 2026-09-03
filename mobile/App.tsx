import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import {
  AuthProvider,
  useAuth
} from "./src/auth/AuthContext";
import {
  registerCustomer,
  verifyEmail
} from "./src/auth/registrationService";

type ScreenMode = "login" | "register" | "verify";

function AuthTestScreen() {
  const {
    user,
    loading,
    login,
    logout
  } = useAuth();

  const [mode, setMode] = useState<ScreenMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Restoring session...</Text>
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Al Maha Aluminum</Text>
        <Text style={styles.success}>Authenticated</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{user.role}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{user.status}</Text>

        <Button
          title={submitting ? "Logging out..." : "Logout"}
          disabled={submitting}
          onPress={async () => {
            try {
              setSubmitting(true);
              await logout();
            } catch (error) {
              Alert.alert(
                "Logout",
                error instanceof Error
                  ? error.message
                  : "Logout failed"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        />
      </View>
    );
  }

  if (mode === "verify") {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>
          Enter the verification code sent to {email}
        </Text>

        <TextInput
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="Verification code"
          keyboardType="number-pad"
          style={styles.input}
        />

        <Button
          title={submitting ? "Verifying..." : "Verify Email"}
          disabled={submitting}
          onPress={async () => {
            try {
              setSubmitting(true);

              await verifyEmail({
                email,
                code: verificationCode
              });

              Alert.alert(
                "Verified",
                "Your email has been verified. You can now sign in."
              );

              setVerificationCode("");
              setMode("login");
            } catch (error) {
              Alert.alert(
                "Verification failed",
                error instanceof Error
                  ? error.message
                  : "Unable to verify email"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        />

        <View style={styles.spaceTop}>
          <Button
            title="Back to Login"
            onPress={() => setMode("login")}
          />
        </View>
      </View>
    );
  }

  if (mode === "register") {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Al Maha Aluminum Customer Account
        </Text>

        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
          style={styles.input}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number (optional)"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <Button
          title={submitting ? "Creating account..." : "Create Account"}
          disabled={submitting}
          onPress={async () => {
            try {
              setSubmitting(true);

              await registerCustomer({
                fullName,
                email,
                phone,
                password
              });

              Alert.alert(
                "Account created",
                "Check your email for the verification code."
              );

              setMode("verify");
            } catch (error) {
              Alert.alert(
                "Registration failed",
                error instanceof Error
                  ? error.message
                  : "Unable to create account"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        />

        <View style={styles.spaceTop}>
          <Button
            title="Already have an account? Login"
            onPress={() => setMode("login")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Al Maha Aluminum</Text>
      <Text style={styles.subtitle}>Secure Mobile Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={submitting ? "Signing in..." : "Login"}
        disabled={submitting}
        onPress={async () => {
          try {
            setSubmitting(true);
            await login(email, password);
          } catch (error) {
            Alert.alert(
              "Login failed",
              error instanceof Error
                ? error.message
                : "Unable to sign in"
            );
          } finally {
            setSubmitting(false);
          }
        }}
      />

      <View style={styles.spaceTop}>
        <Button
          title="Create Account"
          onPress={() => setMode("register")}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <AuthTestScreen />
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8"
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24
  },
  success: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 24
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8
  },
  value: {
    fontSize: 16,
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14
  },
  spaceTop: {
    marginTop: 12
  }
});