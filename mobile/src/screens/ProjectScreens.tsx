import { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  AppButton,
  AppHeader,
  EmptyState,
  ErrorState,
  LoadingScreen,
  ScreenContainer,
  SectionCard,
  StatusBadge
} from "../components";
import { colors, commonStyles, spacing } from "../theme";
import {
  createProject,
  deleteProjectMedia,
  getProject,
  listProjects,
  Project,
  ProjectMedia,
  uploadProjectMedia
} from "../services/projectService";
import { en } from "../i18n";

type Nav = {
  navigate: (screen: string, params?: { projectId?: string }) => void;
  goBack: () => void;
};

const friendly = (error: unknown) =>
  error instanceof Error ? error.message : "We could not load your projects.";
const dateLabel = (value: string) => new Date(value).toLocaleDateString();

type UserSummary = { email: string; profile?: unknown; status: string };

export function HomeScreen({ navigation, user }: { navigation: Nav; user: UserSummary }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const profile = user.profile as { fullName?: string } | undefined;

  useEffect(() => {
    void listProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kicker}>CUSTOMER SPACE</Text>
        <Text style={commonStyles.title}>
          Hello{profile?.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}
        </Text>
        <Text style={commonStyles.subtitle}>{user.email}</Text>
        <View style={styles.statusLine}>
          <Text style={styles.statusLabel}>Account</Text>
          <StatusBadge status={user.status} />
        </View>
        <View style={styles.actions}>
          <AppButton title={en.newProject} onPress={() => navigation.navigate("NewRequest")} />
          <AppButton title={en.projects} secondary onPress={() => navigation.navigate("Projects")} />
        </View>
        <SectionCard>
          <Text style={styles.cardTitle}>Recent projects</Text>
          {projects.length ? projects.slice(0, 3).map((project) => (
            <Text
              key={project.id}
              onPress={() => navigation.navigate("ProjectDetail", { projectId: project.id })}
              style={styles.project}
            >
              {project.projectNumber || project.title}{"  "}
              <Text style={styles.projectStatus}>{project.status.replaceAll("_", " ")}</Text>
            </Text>
          )) : <Text style={commonStyles.subtitle}>{en.noProjectsText}</Text>}
        </SectionCard>
      </ScrollView>
    </ScreenContainer>
  );
}

export function ProjectsScreen({ navigation }: { navigation: Nav }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const load = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      setProjects(await listProjects());
    } catch (caught) {
      setError(friendly(caught));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { void load(); }, []);
  if (loading) return <LoadingScreen />;

  return (
    <ScreenContainer>
      <AppHeader title={en.projects} />
      {error ? <ErrorState message={error} onRetry={() => void load()} /> : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void load(true)} />}
          contentContainerStyle={styles.content}
        >
          {projects.length ? projects.map((project) => (
            <SectionCard key={project.id}>
              <Text onPress={() => navigation.navigate("ProjectDetail", { projectId: project.id })} style={styles.cardTitle}>
                {project.title}
              </Text>
              <Text style={styles.meta}>{project.projectNumber || "Project request"}  ·  {dateLabel(project.createdAt)}</Text>
              <StatusBadge status={project.status} />
            </SectionCard>
          )) : <EmptyState title={en.noProjects} message={en.noProjectsText} />}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}

export function NewRequestScreen({ navigation }: { navigation: Nav }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!title.trim()) { setError("Enter a project title."); return; }
    setBusy(true);
    setError("");
    try {
      const project = await createProject({ title, projectType: type, description });
      navigation.navigate("ProjectDetail", { projectId: project.id });
    } catch (caught) {
      setError(friendly(caught));
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title={en.newProject} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Field label={en.projectTitle} value={title} onChange={setTitle} placeholder="Villa windows" />
        <Field label={en.projectType} value={type} onChange={setType} placeholder="Windows, doors, facade" />
        <Field label={en.description} value={description} onChange={setDescription} placeholder="Tell us about your project" multiline />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton title="Send request" loading={busy} onPress={() => void submit()} />
      </ScrollView>
    </ScreenContainer>
  );
}

function Field({ label, value, onChange, placeholder, multiline = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; multiline?: boolean }) {
  return <View style={styles.field}><Text style={commonStyles.label}>{label}</Text><TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={colors.muted} multiline={multiline} style={[styles.input, multiline && styles.multiline]} /></View>;
}

export function ProjectDetailScreen({ navigation, route }: { navigation: Nav; route: { params: { projectId: string } } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const value = await getProject(route.params.projectId);
      setProject(value);
      setMedia(value.media || []);
    } catch (caught) {
      setError(friendly(caught));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, [route.params.projectId]);

  const chooseMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) { setError("Allow photo access in Settings to upload site media."); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images", "videos"], quality: 0.85, allowsMultipleSelection: true, selectionLimit: 10 });
    if (result.canceled) return;
    setBusy(true);
    setError("");
    try {
      const assets = result.assets.map((asset, index) => ({
        uri: asset.uri,
        name: `site-media-${index}`,
        type: asset.mimeType || (asset.type === "video" ? "video/mp4" : "image/jpeg")
      }));
      await uploadProjectMedia(route.params.projectId, assets);
      await load();
    } catch (caught) {
      setError(friendly(caught));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error && !project) return <ScreenContainer><ErrorState message={error} onRetry={() => void load()} /></ScreenContainer>;
  if (!project) return null;

  return (
    <ScreenContainer>
      <AppHeader title="Project details" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={commonStyles.title}>{project.title}</Text>
        <Text style={styles.meta}>{project.projectNumber || "Project request"}  ·  {dateLabel(project.createdAt)}</Text>
        <StatusBadge status={project.status} />
        {project.projectType ? <Detail label="Type" value={project.projectType} /> : null}
        {project.description ? <Detail label="Description" value={project.description} /> : null}
        <SectionCard>
          <Text style={styles.cardTitle}>Site media</Text>
          {media.length ? media.map((item) => (
            <View key={item.id} style={styles.mediaRow}>
              <View><Text style={styles.mediaName}>{item.originalName}</Text><Text style={styles.meta}>{item.mimeType} · {Math.round(item.sizeBytes / 1024)} KB</Text></View>
              <AppButton title="Delete" secondary onPress={() => Alert.alert("Delete media?", "This securely removes the file from this project.", [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => { void deleteProjectMedia(route.params.projectId, item.id).then(load).catch((caught) => setError(friendly(caught))); } }])} />
            </View>
          )) : <Text style={commonStyles.subtitle}>No site media uploaded yet.</Text>}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <AppButton title="Upload site photos or videos" loading={busy} onPress={() => void chooseMedia()} />
        </SectionCard>
      </ScrollView>
    </ScreenContainer>
  );
}

function Detail({ label, value }: { label: string; value: string }) { return <View style={styles.detail}><Text style={commonStyles.label}>{label}</Text><Text style={commonStyles.subtitle}>{value}</Text></View>; }

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xl },
  kicker: { color: colors.green, fontSize: 12, fontWeight: "900", letterSpacing: 1, marginBottom: spacing.sm },
  statusLine: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg },
  statusLabel: { color: colors.muted, fontWeight: "700" },
  actions: { marginVertical: spacing.lg },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: spacing.sm },
  project: { color: colors.green, paddingVertical: spacing.sm, fontWeight: "700" },
  projectStatus: { color: colors.muted, fontWeight: "500" },
  meta: { color: colors.muted, fontSize: 13, marginBottom: spacing.sm },
  field: { marginBottom: spacing.md },
  input: { minHeight: 52, borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: spacing.md, backgroundColor: colors.white, color: colors.ink, fontSize: 16 },
  multiline: { minHeight: 120, textAlignVertical: "top" },
  error: { color: colors.danger, marginVertical: spacing.sm },
  detail: { marginTop: spacing.md },
  mediaRow: { borderTopWidth: 1, borderTopColor: colors.line, paddingVertical: spacing.sm, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm },
  mediaName: { color: colors.ink, fontWeight: "700", maxWidth: 190 }
});
