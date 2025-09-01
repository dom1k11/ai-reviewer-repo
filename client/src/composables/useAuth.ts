import { ref, watch, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { fetchMe as fetchMeService, getUser } from "../services/userService";

export function useAuth() {
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const profile = ref(null);
  const loading = ref(false);

  const login = () => loginWithRedirect();
  const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } });

  async function getToken() {
    return await getAccessTokenSilently();
  }

  async function fetchMe() {
    if (!isAuthenticated.value) {
      console.log("User is not logged in");
      return;
    }

    console.log("User is logged in");

    loading.value = true;
    try {
      const token = await getAccessTokenSilently();
      const data = await fetchMeService(token);
      const userData = await getUser(token);
      console.log("actual user", userData);
      profile.value = data;
      console.log(`${data.auth0_id}: User logged in`);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  console.log("User logged out");

  watch(isAuthenticated, (newVal) => {
    if (newVal) fetchMe();
  });

  onMounted(() => {
    if (isAuthenticated.value) fetchMe();
  });

  return { login, handleLogout, user, isAuthenticated, profile, loading, fetchMe, getToken };
}
