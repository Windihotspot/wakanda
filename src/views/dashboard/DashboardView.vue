<script lang="ts">
import { defineComponent } from 'vue'
import StudentsGender from './dashboardComponents/students-gender/StudentsGender.vue'
import StudentsAttendance from './dashboardComponents/attendance/StudentsAttendance.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    StudentsGender,
    StudentsAttendance
  },
  setup() {
    const stats = [
      {
        title: 'Total Students',
        value: 1200,
        icon: 'fa-users'
      },
      {
        title: 'Total Teachers',
        value: 75,
        icon: 'fa-chalkboard-teacher'
      },
      {
        title: 'Total Employees',
        value: 150,
        icon: 'fa-user-tie'
      },
      {
        title: 'Total Earnings',
        value: '$250,000',
        icon: 'fa-naira-sign'
      }
    ]

    return { stats }
  }
})
</script>

<template>
  <div class="dashboard">
    <v-row justify="space-between" class="mb-6">
      <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="6" md="3">
        <v-card :style="{ background: stat.gradient }" class="pa-4 d-flex align-center">
          <div class="icon-container">
            <i :class="['fas', stat.icon]"></i>
          </div>
          <div class="ml-3">
            <h6 class="text-h6 mb-1">{{ stat.title }}</h6>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Student -->
    <v-row justify="" class="mb-6">
      <v-col cols="12" sm="12" md="12">
        <StudentsAttendance />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <StudentsGender />
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
