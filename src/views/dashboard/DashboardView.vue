<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const stats = [
      {
        title: 'Total Students',
        value: 1200,
        icon: 'fa-users',
        gradient: 'linear-gradient(45deg, #42a5f5, #478ed1)',
      },
      {
        title: 'Total Teachers',
        value: 75,
        icon: 'fa-chalkboard-teacher',
        gradient: 'linear-gradient(45deg, #66bb6a, #57a663)',
      },
      {
        title: 'Total Employees',
        value: 150,
        icon: 'fa-user-tie',
        gradient: 'linear-gradient(45deg, #ffa726, #ff9800)',
      },
      {
        title: 'Total Earnings',
        value: '$250,000',
        icon: 'fa-naira-sign',
        gradient: 'linear-gradient(45deg, #ab47bc, #8e44ad)',
      },
    ];

    return { stats };
  },
});
</script>

<template>
  <div class="dashboard">
    <v-row justify="space-between" class="mb-6">
      <v-col
        v-for="(stat, index) in stats"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card :style="{ background: stat.gradient }" class="pa-4 d-flex align-center text-white">
          <div class="icon-container">
            <i :class="['fas', stat.icon]"></i>
          </div>
          <div class="ml-3">
            <h3 class="text-h6 font-weight-bold mb-1">{{ stat.title }}</h3>
            <p class="text-h5 font-weight-bold">{{ stat.value }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.icon-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dashboard {
  padding: 16px;
}

.v-card {
  border-radius: 12px;
}
</style>
