import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  MobileUser
} from "./authService";

type AuthContextValue = {
  user: MobileUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<MobileUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser(): Promise<void> {
    try {
      const currentUser = await getCurrentUser();

      setUser({
        id: currentUser.id,
        email: currentUser.email,
        role: currentUser.role,
        status: currentUser.status
      });
    } catch {
      setUser(null);
    }
  }

  async function login(email: string, password: string): Promise<void> {
    const authenticatedUser = await loginRequest(email, password);
    setUser(authenticatedUser);
  }

  async function logout(): Promise<void> {
    await logoutRequest();
    setUser(null);
  }

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const currentUser = await getCurrentUser();

        if (!active) {
          return;
        }

        setUser({
          id: currentUser.id,
          email: currentUser.email,
          role: currentUser.role,
          status: currentUser.status
        });
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login,
      logout,
      refreshUser
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}