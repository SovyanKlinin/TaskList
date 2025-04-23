<template>

    <div class="task-list">
        <h1>{{ title }}</h1>
        <div class="task-list__field">
            <draggable v-model="filteredTask">
                <div class="task-list__item" v-for="task in filteredTask" :key="task.id">
                    <div class="task-list__item-content">
                        <h3 class="task-list__title">Название:</h3>
                        <div class="task-list__task-title">{{ task.title }}</div>
                        <h3 class="task-list__description">Описание:</h3>
                        <div class="task-list__task-description">{{ task.description }}</div>
                    </div>
                    <div class="task-list__task-options">
                        <div class="task-list__option-item">
                            <label for="task-active">Активная задача</label>
                            <input type="checkbox" name="task-active" :checked="!task.completed"
                                @change="toggleTask(task.id)">
                        </div>
                        <div class="task-list__option-item">
                            <label for="task-active">Завершенная задача</label>
                            <input type="checkbox" name="task-active" :checked="task.completed"
                                @change="toggleTask(task.id)">
                        </div>
                        <button @click="open('cardEditor', task.id)">Редактировать задачу</button>
                        <button @click="deleteTask(task.id)">Удалить задачу</button>
                    </div>
                </div>
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

const filteredTask = computed(() => taskStore.filteredTask);

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
</style>