<template>
  <aside class="aside">
    <div class="aside__header">
      <div class="aside__logo">
        <font-awesome-icon :icon="['fas', 'list-check']" size="2xl" />
      </div>
      <h2>Список задач</h2>
    </div>
    <ul class="aside__nav">
      <li class="aside__item" @click="handleClick(item)" v-for="item in navItems" :key="item.title">
        <div class="aside__item-icon">
          <font-awesome-icon :icon="item.icon" />
        </div>
        <div class="aside__item-title">{{ item.title }}</div>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useNewTask } from '../store/store';
import { useTask, type FilterType } from '../store/tasks';

const taskStore = useTask();
const userStore = useNewTask();

interface NavItem {
  icon: [string, string],
  title: string,
  cardState?: string,
  setFilter?: 'all' | 'active' | 'completed'
}

const open = (cardState: string) => {
  userStore.open(cardState);
  taskStore.isEdit = false;
  router.push({
    name: 'Modal',
  });
}

const setFilter = (filter: FilterType) => {
  taskStore.setFilter(filter);
  const query = filter !== 'all' ? { filter: taskStore.filter } : undefined;
  router.push({
    name: 'HomeView',
    ...(query && { query })
  });
}

const handleClick = (item: NavItem) => {
  if (item.cardState) {
    open(item.cardState);
  }
  if (item.setFilter) {
    setFilter(item.setFilter);
  }
};

const navItems = ref<NavItem[]>([
  {
    icon: ['fas', 'plus'],
    title: "Добавить задачу",
    cardState: 'cardActive'
  },

  {
    icon: ['fas', 'clipboard-list'],
    title: "Все задачи",
    setFilter: 'all'
  },

  {
    icon: ['fas', 'bars-progress'],
    title: "Активные",
    setFilter: 'active'
  },

  {
    icon: ['fas', 'clipboard-check'],
    title: "Завершенные",
    setFilter: 'completed'
  },
])

</script>

<style lang="scss">
@use './../styles/mixins.scss';

.aside {
  @include mixins.flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  height: 100%;
  width: 280px;
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
