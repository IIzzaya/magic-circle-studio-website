import Vue from "vue";
import Router from "vue-router";

function route(path, file, name, children, requireAuth, redirect) {
  return {
    path,
    name,
    children,
    redirect: redirect,
    component: require(`../pages/${file}.vue`),
    meta: {
      requireAuth: requireAuth
    }
  };
}

Vue.use(Router);

const router = new Router({
  base: __dirname,
  mode: "hash",
  routes: [
    route(
      "/",
      "Main",
      "main",
      [
        route("home", "Home/Main", "home", null, false),
        route("dashboard", "Dashboard/Main", "dashboard", [
          route("indicators", "Dashboard/Indicators", null, null, false),
          route("logs", "Dashboard/Logs", null, null, false),
          route("backup", "Dashboard/Backup", null, null, false),
        ], false),
        route("login", "Login", "login", null, false)
      ],
      false,
      "/home"
    ),
    route("*", "Error", "error", null, false)
  ]
});

export default router;
