import { useLocation } from "wouter";

export function useNavigation() {
  const [location, setLocation] = useLocation();

  const navigateTo = (path: string) => {
    setLocation(path);
  };

  const currentRoute = location;

  return {
    currentRoute,
    navigateTo,
  };
}
