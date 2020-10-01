<template>
  <div class="session-wrapper">
    <div class="session-left">
      <session-slider-widget></session-slider-widget>
    </div>
    <div class="session-right text-center">
      <div class="session-table-cell">
        <div class="session-content">
          <img :src="appLogo" class="img-responsive mb-4" width="78" height="78" />
          <h2 class="mb-4">{{$t('message.loginToGatewayAdmin')}}</h2>
          <p
            class="fs-14"
          >{{$t('message.enterUsernameAndPasswordToAccessControlPanelOf')}} {{brand}}.</p>
          <v-form v-model="valid" class="mb-5">
            <v-text-field label="E-mail ID" v-model="username" required />
            <v-text-field label="Password" v-model="password" type="password" required />
            <v-checkbox color="primary" label="Remember me" v-model="checkbox" />
            <div>
              <v-btn
                large
                @click="login"
                block
                color="primary"
                class="mb-2"
              >{{$t('message.loginNow')}}</v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SessionSliderWidget from "Components/fr-admin/LoginSlider";
import AppConfig from "Constants/AppConfig";

import AuthService from "../../auth/AuthService";

const auth = new AuthService();

const { login } = auth;
// import User from '../models/user';
import Vue from "vue";

export default {
  components: {
    SessionSliderWidget,
  },
  data() {
    return {
      checkbox: false,
      valid: false,
      username: "admin",
      password: "admin",
      appLogo: AppConfig.appFRLogo2,
      brand: AppConfig.brand,
    };
  },
  methods: {
    async login() {
      const user = {
        username: this.username,
        password: this.password,
      };
      const loginResult = await this.$axios.post("login", user);

      if (loginResult.status === 200) {
        const { data } = loginResult;
        localStorage.setItem("jwt", data);
        localStorage.setItem("user", JSON.stringify(user));
        this.$axios.defaults.headers.common["Authorization"] = "Bearer " + data;
        // this.$router.push("/default/dashboard/detection-logs.html");
        // this.$router.push("/default/dashboard/visitors-report.html");
        this.$router.push("/default/dashboard/general-dashboard.html");
        // this.$router.push("/default/dashboard/ecommerce");

        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Login successful!",
        });
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Login fail. Please check your username and password!",
        });
      }
    },
    created() {
      // POST request using fetch with set headers
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        body: JSON.stringify({ title: "Vue POST Request Example" }),
      };
      fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
        .then((response) => response.json())
        .then((data) => (this.postId = data.id));
    },
    submit() {
      const user = {
        username: this.username,
        password: this.password,
      };

      this.$store.dispatch("signinUserInFirebase", {
        user,
      });
    },
    signInWithFacebook() {
      this.$store.dispatch("signinUserWithFacebook");
    },
    signInWithGoogle() {
      this.$store.dispatch("signinUserWithGoogle");
    },
    signInWithTwitter() {
      this.$store.dispatch("signinUserWithTwitter");
    },
    signInWithGithub() {
      this.$store.dispatch("signinUserWithGithub");
    },
    onCreateAccount() {
      this.$router.push("/session/sign-up");
    },
    signinWithAuth0() {
      login();
    },
  },
};
</script>
