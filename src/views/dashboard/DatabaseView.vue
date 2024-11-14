<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <div class="add mb-4">
          <div class="add-btn">
            <el-dropdown>
              <el-button style="background-color: #4caf50; color: white; outline: none; box-shadow: none;">
                <i class="fas fa-plus mr-3"></i>
                Add a data
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <RouterLink to="/addstudent">
                    <el-dropdown-item>Student</el-dropdown-item></RouterLink
                  >

                  <el-dropdown-item>Teacher</el-dropdown-item>
                  <el-dropdown-item>Staff</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <v-card>
          <v-card-text>
            <div class="header flex justify-between end">
              <div class="sort">
                <el-dropdown>
                  <el-button>
                    Sort
                    <i class="fas fa-arrow-down ml-1"></i>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>Date</el-dropdown-item>
                      <el-dropdown-item>Period</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              <div class="filter">
                <el-dropdown>
                  <el-button>
                    Filter
                    <i class="fas fa-filter ml-1"></i>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>Date</el-dropdown-item>
                      <el-dropdown-item>Period</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div class="data"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>

<style scoped>
.ml-1 {
  margin-left: 4px;
}
</style>
