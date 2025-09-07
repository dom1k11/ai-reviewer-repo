import { ref, watch, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { fetchMe as fetchMeService, getAverageScore, getUser } from "../services/userService";

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
      const Auth0UserData = await fetchMeService(token); // syncs data between auth0 and db
      const userData = await getUser(token); //gets an actual data of user
      const averageReviewScore = await getAverageScore(token);

      profile.value = {
        ...userData,
        averageScore: Math.round(Number(averageReviewScore.averageScore)),
      };
      console.log("profile", profile.value);
      console.log(`${Auth0UserData.auth0_id}: User logged in`);
      console.log(averageReviewScore);
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
