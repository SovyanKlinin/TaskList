<template>
  <router-view>
    <div class="body">
      <Aside />
      <div class="main">
        <TaskList />
      </div>
    </div>
    <div class="new-task">
      <NewTask />
      <TaskEditor />
    </div>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'
import Aside from './components/Aside.vue'
import NewTask from './components/NewTask.vue'
import TaskList from './components/TaskList.vue'
import TaskEditor from './components/TaskEditor.vue'

export default {
  name: 'App',
  components: {
    Aside,
    NewTask,
    TaskList,
    TaskEditor,
  },
}

</script>

<style scoped lang="scss">
@use './styles/mixins.scss';

.body {
  @include mixins.flex;
  justify-content: flex-start;
  height: 100%;

  & .main {
    @include mixins.flex;
    align-items: flex-start;
    height: 100%;
    width: 100%;
  }
}
</style>
