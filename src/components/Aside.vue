<template>
  <aside class="aside">
    <div class="aside__header">
      <div class="aside__logo">
        <font-awesome-icon :icon="['fas', 'list-check']" size="2xl" />
      </div>
      <h2>Список задач</h2>
    </div>

    <ul class="aside__nav">
      <li class="aside__item" @click="open">
        <div class="aside__item-icon">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
        <div class="side__item-title">Добавить задачу</div>
      </li>
      <li class="aside__item">
        <div class="aside__item-icon">
          <font-awesome-icon :icon="['fas', 'clipboard-list']" />
        </div>
        <div class="side__item-title">Все задачи</div>
      </li>
      <li class="aside__item">
        <div class="aside__item-icon">
          <font-awesome-icon :icon="['fas', 'bars-progress']" />
        </div>
        <div class="side__item-title">Активные</div>
      </li>
      <li class="aside__item">
        <div class="aside__item-icon">
          <font-awesome-icon :icon="['fas', 'clipboard-check']" />
        </div>
        <div class="side__item-title">Завершенные</div>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss">
@use './../styles/mixins.scss';

.aside {
  @include mixins.flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  height: 100vh;
  width: 240px;
  padding: 20px;
  background-color: #222222;

  .aside &__header {
    @include mixins.flex;
    gap: 7px;

  }

  .aside &__nav {
    @include mixins.flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    & .aside__item {
      @include mixins.flex;
      justify-content: flex-start;
      gap: 7px;
      width: 100%;
      padding: 5px 7px;
      border: 1px solid #222222;
      border-radius: 4px;
      cursor: pointer;
      list-style: none;

      &:hover {
        border: 1px solid #646cff;
      }

      &:focus,
      &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      & .aside__item-icon {
        width: 20px;
      }
    }
  }

}
</style>

<script setup lang="ts">
import { useNewTask } from './../store/store.ts'

const userStore = useNewTask();
const open = () => {
    userStore.open();
}
</script>
