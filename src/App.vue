<template>
  <div id="app" :class="{ dark: dark }">
    <b-navbar
      sticky
      toggleable="lg"
      class="mb-4 py-0"
      id="nav"
      :type="dark ? 'dark' : 'light'"
    >
      <div class="container">
        <b-navbar-brand href="/" class="px-2 py-2">
          <img
            class="d-inline-block align-middle"
            :src="logo"
            style="max-height: 30px"
            alt="F&F"
          />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav style="margin-left: auto !important">
            <b-nav-item to="/testdb">Test DB</b-nav-item>
            <b-nav-item to="/list">Liste</b-nav-item>
            <b-nav-item to="/form/users">Users</b-nav-item>
            <b-nav-item to="/form/contributions">Contributions</b-nav-item>
            <b-nav-item to="/testformgenerator">Test Form generator</b-nav-item>
            <b-nav-item href="#" @click="dark = !dark">
              <BIconMoon v-if="dark"></BIconMoon>
              <BIconSun v-else></BIconSun>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <div class="container-sm">
      <router-view />
    </div>
  </div>
</template>

<script>
import { BIconSun, BIconMoon } from "bootstrap-vue";

const THEME_KEY = "theme_key";

export default {
  name: "App",
  data() {
    return {
      logo: require("./assets/logo.png"),
      dark: localStorage.getItem(THEME_KEY, false),
    };
  },
  components: {
    BIconSun,
    BIconMoon,
  },
  watch: {
    dark: function () {
      localStorage.setItem(THEME_KEY, this.dark);
    },
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
html,
body {
  overflow: hidden;
}
#app {
  overflow: auto;
  &.dark {
    background: #222;
    color: white;

    #nav {
      background: transparent;
      .navbar-brand {
        background: #f7f7f7;
        -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
        -o-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
        filter: progid:DXImageTransform.Microsoft.Shadow(color=rgba(0,0,0,0.3), Direction=180, Strength=5);
      }
      .router-link-exact-active {
        font-weight: 600;
      }
    }
  }
  #nav {
    background: #f7f7f7;
    .navbar-brand {
      img {
        max-height: 30px;
      }
      font-weight: 600;
    }
    .router-link-exact-active {
      font-weight: 600;
    }
  }
}
</style>
