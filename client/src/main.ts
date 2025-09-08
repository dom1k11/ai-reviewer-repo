import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";

import { createAuth0 } from "@auth0/auth0-vue";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from "./config";

const app = createApp(App);

app.use(router);
app.use(
  createAuth0({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin + "/app",
      audience: AUTH0_AUDIENCE,
    },
  })
);

app.mount("#app");
