import { useAppStore } from '../store/appStore';

// Custom Hook: useAuth
export function useAuth() {
  const user = useAppStore((state) => state.user);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const loginUser = useAppStore((state) => state.loginUser);
  const logoutUser = useAppStore((state) => state.logoutUser);
  const updateProfile = useAppStore((state) => state.updateProfile);

  return {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    updateProfile
  };
}
