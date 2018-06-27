<template>
  <div>
    <section>
      <v-parallax src="static/section.jpeg" height="400">
        <v-layout column align-center justify-center class="white--text">
          <img src="" height="50">
          <h1 class="white--text mb-2 display-1 text-xs-center">Magic Circle Studio</h1>
          <div class="subheading mb-3 text-xs-center">Powered by SJTU</div>
        </v-layout>
      </v-parallax>
    </section>

    <v-toolbar dense color="primary" dark extended extension-height="300" flat>

      <v-toolbar-title class="mx-auto" slot="extension">
        <span>Welcome to Magic Circle Studio</span>
        <h2>Everything starts here.</h2>
        <v-layout row>
          <v-flex wrap>
            <v-btn outline large fab color="white" class="outine-2">
              <i class="fab fa-github fa-3x"></i>
            </v-btn>
          </v-flex>
          <v-flex wrap>
            <v-btn outline large fab color="white" class="outine-2">
              <v-icon lagre>book</v-icon>
            </v-btn>
          </v-flex>
          <v-flex wrap>
            <v-btn outline large fab color="white" class="outine-2">
              <v-icon lagre>school</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card flat class="card--flex-toolbar" color="transparent">
            <v-container fluid grid-list-lg>
              <v-layout row wrap >
                <v-flex xs12>
                  <h2 class="white--text">Discover Studio</h2>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6 lg4 v-for="item in links" :key="item.id">
                  <v-card>
                    <v-card-media src="" height="125px" :class="item.color">
                    </v-card-media>
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">{{item.title}}</h3>
                        <div>
                          {{item.description}}
                        </div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat color="primary" class="learn-more-btn">Learn more</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary">Get started</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          id: "1",
          title: "Dashboard",
          description: "Get detailed anlytics to measure and analyze how users engage with your app",
          color: "orange"
        },
        {
          id: "2",
          title: "Storage",
          description:
            "Store and retrieve user-generated content, such as images, audio, and videos, without server-side code.",
          color: "teal"
        },
        {
          id: "3",
          title: "Notifications",
          description:
            "Manage your notification campaigns and send messages to reach the right users at the right time",
          color: "blue"
        },
        {
          id: "4",
          title: "Authentification",
          description: "Authenticate and manage users from a variety of providers without server-side-code",
          color: "purple"
        }
      ]
    };
  }
};
</script>

<style scoped>
.outine-2 {
  border: 2px solid white;
}

.card--flex-toolbar {
  margin-top: -104px;
}

.learn-more-btn {
  text-transform: initial;
  text-decoration: underline;
}
</style>
