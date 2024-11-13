<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    // BaseCard,
  },
  setup() {}
})
</script>

<template>
  <div class="dashboard">
    <div class="search">
      <v-text-field
        label="Search for a student, teacher, parent, document, e.t.c..."
        variant="outlined"
        rounded
        class="styled-text-field w-82"
      ></v-text-field>
    </div>
    <div>
      <!-- <v-btn color="#50DC90" size="large" rounded="lg" class="mb-4 pr-4 custom-btn">
        <v-icon left class="text-white">fa-solid fa-plus</v-icon>
        <span class="menu-item ml-4">Add a user</span>
      </v-btn> -->
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji';
  font-style: normal;
}
.custom-btn .v-icon {
  margin-right: 8px; /* Adjusts spacing between icon and text */
}
.custom-btn .menu-item {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji';
  font-style: normal;
  font-weight: 500;
  color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 28px;
}
</style>
