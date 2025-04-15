<template>
  <div class="body">
      <Aside />
    <div class="main">
    </div>
  </div>
  <div class="new-task">
    <NewTask />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Aside from './components/Aside.vue'
import NewTask from './components/NewTask.vue'

export default {
  name: 'App',
  components: {
    Aside,
    NewTask,
  },
}
</script>

<style scoped lang="scss">
  .body {
    display: flex;
  }
</style>

