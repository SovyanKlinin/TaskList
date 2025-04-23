<template>
    <div class="new-task" v-show="cardEditor">
        <div class="new-task__card">
            <div class="new-task__card-title">
                <div class="new-task__logo">
                    <font-awesome-icon :icon="['fas', 'list-check']" size="xl" />
                </div>
                <h3>Список задач</h3>
            </div>
            <div class="new-task__title" v-show="!taskEditCompleted">
                <label for="task-title">Название задачи:</label>
                <input name="task-title" id="taskTitle" type="text" placeholder="Введите название задачи"
                    v-model="taskEdit.taskTitle">
            </div>
            <div class="new-task__description" v-show="!taskEditCompleted">
                <label for="task-description">Описание задачи:</label>
                <textarea name="task-description" id="taskDescription" placeholder="Введите описание задачи" rows="5"
                    v-model="taskEdit.taskDescription"></textarea>
            </div>
            <div class="new-task__button" v-show="!taskEditCompleted">
                <button
                    @click="newTaskValue(taskEdit.taskId, taskEdit.taskTitle, taskEdit.taskDescription)">Редактировать</button>
            </div>
            <div v-show="taskEditCompleted">Задача успешно отредактирована!</div>
            <div class="new-task__close">
                <button @click="close('cardEditor')">
                    <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '../router';
import { storeToRefs } from 'pinia';
import { useNewTask } from './../store/store';
import { useTask } from './../store/tasks'
import { ref } from 'vue';

const userStore = useNewTask();
const taskStore = useTask();

const { cardEditor } = storeToRefs(userStore);
const { taskEdit } = storeToRefs(taskStore);

let taskEditCompleted = ref(false);

const newTaskValue = (id: number, title: string, description: string) => {
    taskStore.newTaskValue(id, title, description)
    taskEditCompleted.value = true;
}

const close = (cardState: string) => {
    taskEditCompleted.value = false;
    userStore.close(cardState);
    router.push(`/${taskStore.filter}`);
}

</script>

<style scoped lang="scss">
@use './../styles/mixins.scss';

.new-task {
    @include mixins.flex;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;

    & .new-task__card {
        @include mixins.flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        width: 480px;
        padding: 30px;
        border-radius: 10px;
        background-color: #1a1919;

        & .new-task__card-title {
            @include mixins.flex;
            gap: 7px;
            margin-bottom: 30px;
        }

        & .new-task__title {
            @include mixins.flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 3px;
            width: 100%;
            margin-bottom: 10px;

            & input {
                width: 100%;
            }
        }

        & .new-task__description {
            @include mixins.flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 3px;
            width: 100%;
            margin-bottom: 30px;

            & textarea {
                width: 100%;
            }
        }

        & .new-task__button {
            @include mixins.flex;
            justify-content: flex-end;
            gap: 60px;
            width: 100%;

            & button {
                background-color: #222222;
            }
        }

        & .new-task__close {
            position: absolute;
            top: 10px;
            right: 20px;

            & button {
                padding: 5px;
            }
        }
    }

}
</style>