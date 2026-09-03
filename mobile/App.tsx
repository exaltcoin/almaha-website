import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider, useAuth } from "./src/auth/AuthContext";
import { AuthScreens } from "./src/screens/AuthScreens";
import {
  HomeScreen,
  NewRequestScreen,
  ProjectDetailScreen,
  ProjectsScreen
} from "./src/screens/ProjectScreens";
import {
  AppButton,
  AppHeader,
  LoadingScreen,
  ScreenContainer,
  SectionCard,
  StatusBadge
} from "./src/components";
import { colors, commonStyles, spacing } from "./src/theme";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function ProfileScreen() {
  const { user, logout } = useAuth();
  const profile = user?.profile as { fullName?: string; phone?: string | null } | undefined;
  const [busy, setBusy] = useState(false);
  return (
    <ScreenContainer>
      <AppHeader title="Profile" />
      <SectionCard>
        <Text style={commonStyles.title}>{profile?.fullName || "Customer account"}</Text>
        <Text style={styles.value}>{user?.email}</Text>
        {profile?.phone ? <Text style={styles.value}>{profile.phone}</Text> : null}
        <StatusBadge status={user?.status || "ACTIVE"} />
      </SectionCard>
      <SectionCard>
        <Text style={styles.label}>Language</Text>
        <Text style={commonStyles.subtitle}>English · Arabic foundation ready</Text>
      </SectionCard>
      <AppButton
        title={busy ? "Signing out..." : "Sign out"}
        loading={busy}
        secondary
        onPress={async () => {
          setBusy(true);
          try {
            await logout();
          } finally {
            setBusy(false);
          }
        }}
      />
    </ScreenContainer>
  );
}
function TabsRoot() {
  const { user } = useAuth();

  if (!user) return <LoadingScreen />;

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarLabelStyle: { fontWeight: "700" }
      }}
    >
      <Tabs.Screen name="Home">
        {({ navigation }) => <HomeScreen navigation={navigation} user={user} />}
      </Tabs.Screen>
      <Tabs.Screen name="Projects">
        {({ navigation }) => <ProjectsScreen navigation={navigation} />}
      </Tabs.Screen>
      <Tabs.Screen name="New Request">
        {({ navigation }) => <NewRequestScreen navigation={navigation} />}
      </Tabs.Screen>
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

function AuthenticatedApp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabsRoot} />
      <Stack.Screen name="NewRequest">
        {({ navigation }) => <NewRequestScreen navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="ProjectDetail">
        {({ navigation, route }) => (
          <ProjectDetailScreen
            navigation={navigation}
            route={route as { params: { projectId: string } }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppRoot() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {user ? <AuthenticatedApp /> : <AuthScreens onAuthenticated={() => undefined} />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoot />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  value: { color: colors.muted, fontSize: 16, marginTop: spacing.sm },
  label: { color: colors.ink, fontWeight: "800", marginBottom: spacing.xs }
});
