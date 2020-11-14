<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          to="/login"
          class="absolute-right q-px-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login"
          />

        <q-btn
          v-else
          @click="signOutUser"
          class="absolute-right q-px-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Logout"
          />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="bg-secondary text-grey-1"
          style="height:50px"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { mapState, mapActions } from 'vuex'

const linksData = [
  {
    title: 'Home',
    caption: '/home',
    icon: 'home',
    link: '/#/home'
  },
  {
    title: 'Login',
    caption: '/login',
    icon: 'vpn_key',
    link: '/#/login'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  computed: {
    ...mapState('store', ['userDetails']),
    title() {
      let currentPath = this.$route.fullPath
      if (currentPath == '/login') {
        return 'Login'
      } else {
        return 'Home'
      }
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    ...mapActions('store', ['signOutUser'])
  }
}
</script>
