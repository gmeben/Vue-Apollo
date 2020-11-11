<template>
  <q-page class="flex-col q-pa-md">
    <div>
      <q-list separator>
        <q-item v-for="user in users" :key="user.id" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ user.letter }}
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
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john@gmail.com",
          online: true,
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "jane@gmail.com",
          online: false,
        },
      ],
    };
  },
};
</script>

