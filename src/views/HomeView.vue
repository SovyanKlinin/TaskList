<template>
  <router-view>
    <div class="body">
      <Aside />
      <div class="main">
        <TaskList />
      </div>
    </div>
    <div class="modal">
      <Modal />
    </div>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'
import Aside from './../components/Aside.vue'
import TaskList from './../components/TaskList.vue'
import Modal from './Modal.vue'

export default {
  name: 'App',
  components: {
    Aside,
    TaskList,
    Modal
  },
}

</script>

<style scoped lang="scss">
@use './../styles/mixins.scss';

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