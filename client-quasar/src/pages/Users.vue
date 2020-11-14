<template>
  <q-page class="flex-col q-pa-md">
    <div>
      <q-list separator>
        <q-item v-for="user in users" :key="user.id" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar :color="user.color" text-color="white">
              {{ user.name.charAt(0) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
            <q-item-label caption lines="1">{{ user.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge :color="user.online ? 'blue-8' : 'grey-5'">
              {{ user.online ? "Online" : "Offline" }}
            </q-badge>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('store',['users'])
  }
};
</script>

