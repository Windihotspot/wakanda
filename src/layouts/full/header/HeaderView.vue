<script lang="ts">
import { defineComponent, ref } from 'vue'
import { profile } from './data.ts'
import { contacts } from './contact.ts'
import { notifications } from './notification.ts'
import { add } from './add.ts'
export default defineComponent({
  setup() {
    const userprofile = ref(profile)
    const usernotification = ref(notifications)
    const usercontacts = ref(contacts)
    const addDetails = ref(add)

    return {
      userprofile,
      usernotification,
      usercontacts,
      addDetails
    }
  }
})
</script>

<template>
  <div class="header items-center px-4 py-2 shadow-md bg-white">

    <!-- Icons (Right) -->
    <div class="space-x-4">
      <!-- Add Details Icon -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <i class="fa-solid fa-plus fa-lg"></i>
          </v-btn>
        </template>
        <v-list class="pa-6" elevation="10" rounded="lg">
          <v-list-item
            v-for="(item, i) in addDetails"
            :key="i"
            :title="item.title"
            :subtitle="item.desc"
            rounded="lg"
            class="pa-3 mb-2"
          />
        </v-list>
      </v-menu>

      <!-- Notifications Icon -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <i class="fa-regular fa-bell fa-lg"></i>
          </v-btn>
        </template>
        <v-list class="pa-6" elevation="10" rounded="lg">
          <v-list-item
            v-for="(item, i) in usernotification"
            :key="i"
            :title="item.title"
            :subtitle="item.desc"
            rounded="lg"
            class="pa-3 mb-2"
          />
        </v-list>
      </v-menu>

      <!-- Contacts Icon -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <i class="fa-regular fa-address-book fa-lg"></i>
          </v-btn>
        </template>
        <v-list class="pa-6" elevation="10" rounded="lg">
          <v-list-item
            v-for="(contact, i) in usercontacts"
            :key="i"
            :title="contact.name"
            :subtitle="contact.status"
            rounded="lg"
            class="pa-3 mb-2"
          />
        </v-list>
      </v-menu>

      <!-- User Profile -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="p-0" elevation="0" color="transparent" plain :ripple="false">
            <v-avatar size="35">
              <img src="@/assets/images/users/black-user.jpg" alt="User Avatar" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="pa-6" elevation="10" rounded="lg">
          <v-list-item
            class="pa-3 mb-2"
            v-for="(item, i) in userprofile"
            :key="i"
            :value="item"
            :title="item.title"
            :subtitle="item.desc"
            rounded="lg"
          />
          <v-btn block color="secondary" variant="contained" class="mt-4 py-4">Logout</v-btn>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons-container {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

.search {
  flex-grow: 0;
}
</style>
