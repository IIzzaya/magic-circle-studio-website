<template>
  <v-app standalone="standalone">

    <v-toolbar app flat dense color="primary" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up" :class="searching ? 'hidden-xs-only' : ''" />

      <v-toolbar-title class="white--text">Magic Circle Studio</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-btn icon @click.stop="rightDrawer = !rightDrawer" slot="activator">
          <v-badge color="red" overlap>
            <span slot="badge">2</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
        <span>2 unread notifications</span>
      </v-tooltip>

      <v-menu bottom left>
        <v-btn icon slot="activator">
          <v-avatar class="white" size="32">
            <v-icon color="primary">person</v-icon>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar class="primary" size="48px">
                <v-icon dark>person</v-icon>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Doe</v-list-tile-title>
              <v-list-tile-sub-title>Administrator</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>

          <v-list-tile key="profile">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>

          <v-list-tile key="lock_open">
            <v-list-tile-action>
              <v-icon>lock_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-navigation-drawer width="250" class="blue-grey darken-4" dark persistent :mini-variant="miniVariant" v-model="drawer" fixed app>

      <v-toolbar flat class="transparent" dense>
        <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
          <v-list-tile>
            <v-list-tile-content v-if="!miniVariant">
              <v-list-tile-title>
                <h3>Magic Circle Studio</h3>
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-tooltip right :disabled="!miniVariant">
        <v-toolbar flat class="transparent" dense slot="activator">
          <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
            <v-list-tile to="/" exact>
              <v-list-tile-action>
                <v-icon>home</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Studio Overview</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <span>Studio Overview</span>
      </v-tooltip>

      <v-divider></v-divider>

      <v-list subheader :class="{'list-border-bottom' : miniVariant}">
        <v-subheader>ANALYTICS</v-subheader>
        <template v-for="item in analyticsItems">
          <v-tooltip right :key="item.icon" :disabled="!miniVariant">
            <v-list-tile :to="item.link" exact slot="activator">
              <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <span v-text="item.title"></span>
          </v-tooltip>
        </template>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>DEVELOP</v-subheader>
        <template v-for="item in developItems">
          <v-tooltip right :key="item.icon" :disabled="!miniVariant">
            <v-list-tile :to="item.link" exact slot="activator">
              <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <span v-text="item.title"></span>
          </v-tooltip>
        </template>
      </v-list>

    </v-navigation-drawer>

    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-toolbar flat prominent dark class="primary" dense>
        <v-toolbar-title>Notifications</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="rightDrawer = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list subheader dense>
        <v-subheader>All notifications</v-subheader>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            12 new users registered
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>data_usage</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            DB overloaded 80%
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </v-app>
</template>

<script>
import {mapState} from "vuex";
import menu from "../modules/menu";
import post from "../modules/apiClient";
export default {
  data() {
    return {
      theme: "primary",
      mini: false,
      drawer: true,
      logoutDialogMessage: {
        body: null,
        show: false
      },
      drawer: true,
      fixed: false,
      analyticsItems: [
        {
          icon: "dashboard",
          title: "Dashboard",
          link: "/dashboard/indicators"
        },
        {
          icon: "event",
          title: "Events",
          link: ""
        },
        {
          icon: "comment",
          title: "Notifications",
          link: ""
        }
      ],
      developItems: [
        {
          icon: "supervisor_account",
          title: "Authentification",
          link: ""
        },
        {
          icon: "storage",
          title: "Database",
          link: ""
        },
        {
          icon: "perm_media",
          title: "Storage",
          link: ""
        },
        {
          icon: "public",
          title: "Hosting",
          link: ""
        },
        {
          icon: "functions",
          title: "Functions",
          link: ""
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      tabs: null,
      tabsItems: [
        {id: 1, title: "Indicators", link: "indicators"},
        {id: 2, title: "Backup", link: "backup"},
        {id: 3, title: "Logs", link: "logs"}
      ],
      menuItems: ["Vue", "NodeJS", "Laravel"],
      searching: false,
      search: ""
    };
  },
  computed: {
    ...mapState([
      "menu",
      "pageTitle",
      "userName",
      "category",
      "toastMessage",
      "dialogMessage",
      "superBackFlag",
      "showArrFlag",
      "showArr",
      "addFormData",
      "editFormData",
      "tempEditFormData",
      "detailFormData",
      "deleteFormData"
    ]),
    isAdd() {
      return this.$route.path.search("add") > -1;
    },
    isEdit() {
      return this.$route.path.search("edit") > -1;
    },
    isDetail() {
      return this.$route.path.search(/[0-9]/) > -1 && !this.isEdit;
    },
    isLevelOne() {
      if (!this.isAdd && !this.isEdit && !this.isDetail) {
        return true;
      }
      return false;
    },
    isLevelTwo() {
      if ((this.isAdd || this.isDetail) && !this.isEdit) {
        return true;
      }
      return false;
    },
    isLevelThree() {
      return this.isEdit;
    }
  },
  methods: {
    onBlur() {
      this.searching = false;
      this.search = "";
    },

    searchBegin() {
      this.searching = true;
      setTimeout(() => document.querySelector("#search").focus(), 50);
    },

    searchEnd() {
      this.searching = false;
      this.search = "";
      document.querySelector("#search").blur();
    },
    logoutButtonPressed() {
      this.logoutDialogMessage.show = true;
      this.logoutDialogMessage.body = "确定注销？";
    },
    logout() {
      this.$store.dispatch("clearAuth");
    },
    backButtonPressed() {
      this.$store.dispatch("clearFormData");
      if (this.superBackFlag) {
        this.$store.dispatch("setSuperBackFlag", false);
        this.$router.go(-2);
      } else {
        this.$router.go(-1);
      }
    },
    addButtonPressed() {
      let toPath = this.$route.path + "/add";
      this.$store.dispatch("setCategory", this.$route.name);
      this.$router.push({path: toPath});
    },
    // editButtonPressed() {
    //   let toPath = this.$route.path + "/edit";
    //   this.$store.dispatch("setSuperBackFlag", true);
    //   this.$router.push({ path: toPath });
    // },
    deleteButtonPressed() {
      let deleteFormData = {
        id: this.detailFormData.id,
        _id: this.detailFormData._id,
        url: this.$route.path.match(/\/[a-zA-Z]+(?=\/\d+)/g)[0]
      };
      this.$store.dispatch("setDeleteFormData", deleteFormData);
      this.$store.dispatch("setDialogMessageOn", "确定删除？");
      this.$store.dispatch("setDialogMessageType", "Delete");
    },
    confirmAddButtonPressed() {
      this.$store.dispatch("setDialogMessageOn", "确定添加？");
      this.$store.dispatch("setDialogMessageType", "Add");
    },
    confirmEditButtonPressed() {
      this.$store.dispatch("setDialogMessageOn", "确定更改？");
      this.$store.dispatch("setDialogMessageType", "Edit");
    },
    confirmDeleteButtonPressed() {
      this.$store.dispatch("setDialogMessageOn", "确定删除？");
      this.$store.dispatch("setDialogMessageType", "Delete");
    },
    confirmShowButtonPressed() {
      this.$store.dispatch("setDialogMessageOn", "确定更改？");
      this.$store.dispatch("setDialogMessageType", "ShowArr");
    },
    addHandler() {
      let addFormData = this.addFormData;
      let data = new FormData();
      data.append("object", JSON.stringify(addFormData.object));
      for (let i in addFormData.Banner) {
        data.append("Banner", addFormData.Banner[i]);
      }
      for (let i in addFormData.Detail) {
        data.append("Detail", addFormData.Detail[i]);
      }
      for (let i in addFormData.Thumbnail) {
        data.append("Thumbnail", addFormData.Thumbnail[i]);
      }

      post("/add", data, "FORM")
        .then(({data}) => {
          global.utils.postHandler(data);
          this.backButtonPressed();
        })
        .catch(err => {
          console.log(err);
        });
    },
    editHandler() {
      if (this.editFormData.category == "Lipstick") {
        return post("/update", {object: this.editFormData}, "JSON")
          .then(({data}) => {
            global.utils.postHandler(data);
          })
          .catch(err => console.log(err));
      }

      let editFormData = this.tempEditFormData;
      let data = new FormData();
      data.append("object", JSON.stringify(editFormData.object));

      for (let i in editFormData.Banner) {
        data.append("Banner", editFormData.Banner[i]);
      }

      for (let i in editFormData.Detail) {
        data.append("Detail", editFormData.Detail[i]);
      }

      for (let i in editFormData.Thumbnail) {
        data.append("Thumbnail", editFormData.Thumbnail[i]);
      }

      post("/update", data, "FORM")
        .then(({data}) => {
          global.utils.postHandler(data);
          this.backButtonPressed();
        })
        .catch(err => console.log(err));
    },
    deleteHandler() {
      post("/delete", this.deleteFormData, "JSON")
        .then(({data}) => {
          global.utils.postHandler(data);
          if (this.$route.path.search(/[0-9]/) !== -1) {
            this.backButtonPressed();
          }
        })
        .catch(err => console.log(err));
    },
    showArrHandler() {
      let data = {
        category: this.category,
        showArr: this.showArr
      };
      post("/showArr", data, "JSON")
        .then(({data}) => {
          global.utils.postHandler(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    dialogHandler() {
      switch (this.dialogMessage.type) {
        case "Add":
          this.addHandler();
          break;
        case "Edit":
          this.editHandler();
          break;
        case "Delete":
          this.deleteHandler();
          break;
        case "ShowArr":
          this.showArrHandler();
          break;
      }
    }
  },
  created() {
    this.$store.dispatch("checkAuth");
    this.$store.commit("setMenu", menu);
  }
};
</script>

<style scoped lang="stylus">
@import '../../node_modules/vuetify/src/stylus/settings/_variables.styl';

.bottom-menu {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.searching {
  overflow: hidden;
  width: 208px;
  padding-left: 8px;
  transition: $primary-transition;
}

.searching--closed {
  padding-left: 0;
  width: 0;
}

.searching > * {
  right: 8px;
}

.searching--closed > * {
  display: none;
}

.hidden-searching {
  @media $display-breakpoints.sm-and-down {
    display: none !important;
  }
}

.list-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
