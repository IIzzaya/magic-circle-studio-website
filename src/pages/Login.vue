<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="signIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="userName" label="用户名" id="userName" v-model="userName" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="userPassword" label="密码" id="userPassword" v-model="userPassword" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">登录</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {AUTHENTICATION_SUCCESS} from "../modules/statusCode";
import post from "../modules/apiClient";
export default {
  data() {
    return {
      userName: "",
      userPassword: ""
    };
  },
  methods: {
    signIn() {
      post("/", {userName: this.userName, userPassword: this.userPassword}, "JSON")
        .then(({data}) => {
          console.log("AAAA");
          if (data.code === AUTHENTICATION_SUCCESS) {
            this.$store.dispatch("setAuth", this.userName);
            this.$router.push({path: "/"});
            return;
          }
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
