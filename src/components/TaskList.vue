<template>

    <div class="task-list">
        <h1>{{ title }}</h1>
        <div class="task-list__field">
            <draggable v-model="filteredTask" class="task-list__draggable">
                <template #item="{ element }" class="task-list__template">
                    <div class="task-list__item" :key="element.id">
                        <div class="task-list__item-content">
                            <h3 class="task-list__title">Название:</h3>
                            <div class="task-list__task-title">{{ element.title }}</div>
                            <h3 class="task-list__description">Описание:</h3>
                            <div class="task-list__task-description">{{ element.description }}</div>
                        </div>
                        <div class="task-list__task-options">
                            <div class="task-list__option-item">
                                <label for="task-active">Активная задача</label>
                                <input type="checkbox" name="task-active" :checked="!element.completed"
                                    @change="toggleTask(element.id)">
                            </div>
                            <div class="task-list__option-item">
                                <label for="task-active">Завершенная задача</label>
                                <input type="checkbox" name="task-active" :checked="element.completed"
                                    @change="toggleTask(element.id)">
                            </div>
                            <button @click="open('cardEditor', element.id)">Редактировать задачу</button>
                            <button @click="deleteTask(element.id)">Удалить задачу</button>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>

</template>

<script setup lang="ts">
import router from '../router';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTask } from './../store/tasks';
import { useNewTask } from './../store/store';
import draggable from 'vuedraggable';

const taskStore = useTask();
const userStore = useNewTask();

const { title } = storeToRefs(taskStore);

const filteredTask = computed({
    get: () => taskStore.filteredTask,
    set: (newOrder) => {
        taskStore.updateTaskOrder(newOrder);
    } 
});

const toggleTask = (id: number) => {
    taskStore.toggleTask(id);
};

const deleteTask = (id: number) => {
    taskStore.deleteTask(id);
};

const open = (cardState: string, id: number) => {
    router.push(`/edit/${id}`)
    userStore.open(cardState);
    taskStore.taskEditor(id);
}
</script>

<style scoped lang="scss">
@use './../styles/mixins.scss';

.task-list {
    @include mixins.flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;

    & h1 {
        margin-bottom: 50px;
    }

    & .task-list__field {
        @include mixins.flex;

        & .task-list__draggable {
            width: 100%;
            @include mixins.flex;
            flex-direction: column;
            gap: 40px;
            width: 780px;
            padding: 30px;
            background-color: #222222;
            border-radius: 10px;

            & .task-list__item {
                @include mixins.flex;
                width: 100%;
                padding: 20px 20px 10px 20px;
                background-color: #1f1f1f;
                border: 1px solid transparent;
                cursor: pointer;
                border-radius: 10px;

                &:hover {
                    border-color: #646cff;
                }

                &.sortable-drag {
                    opacity: 0.5;
                    background-color: #1f1f1f;
                    border: 2px dashed #666;
                }

                & .task-list__item-content {
                    @include mixins.flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;

                    & h3 {
                        margin-bottom: 5px;
                    }

                    & .task-list__task-title {
                        margin-bottom: 10px;
                    }

                    & .task-list__task-description {
                        margin-bottom: 10px;
                    }
                }

                & .task-list__task-options {
                    @include mixins.flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 5px;
                    width: 300px;

                    & .task-list__option-item {
                        @include mixins.flex;
                        gap: 5px;
                    }

                    & button {
                        width: 220px;
                    }
                }
            }

        }
    }
}
</style>