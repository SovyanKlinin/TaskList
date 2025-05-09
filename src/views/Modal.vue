<template>
    <div class="new-task" v-show="cardActive">
        <div class="new-task__card">
            <div class="new-task__card-title">
                <div class="new-task__logo">
                    <font-awesome-icon :icon="['fas', 'list-check']" size="xl" />
                </div>
                <h3>{{ isEdit ? 'Редактировать задачу' : 'Новая задача' }}</h3>
            </div>
            <div class="new-task__title" v-show="!completed">
                <label for="task-title">Название задачи:</label>
                <input v-model="taskTitle" name="task-title" id="taskTitle" type="text"
                    placeholder="Введите название задачи">
            </div>
            <div class="new-task__description" v-show="!completed">
                <label for="task-description">Описание задачи:</label>
                <textarea v-model="taskDescription" name="task-description" id="taskDescription"
                    placeholder="Введите описание задачи" rows="5"></textarea>
            </div>
            <div class="new-task__button" v-show="!completed">
                <div v-show="showError">Заполните форму задачи!</div>
                <button @click="NewOrUpdateTask(taskEdit.taskId, taskEdit.taskTitle, taskEdit.taskDescription)">
                    {{ isEdit ? 'Редактировать' : 'Добавить задачу' }}</button>
            </div>
            <div v-show="completed">{{ isEdit ? 'Задача успешно отредактирована!' : 'Задача успешно добавлена!'}}</div>
            <div class="new-task__close">
                <button @click="close('cardActive')">
                    <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTask } from '../store/tasks';
import { useNewTask } from '../store/store';
import router from '../router';
import { storeToRefs } from 'pinia';

const userStore = useNewTask();
const taskStore = useTask();

const { cardActive } = storeToRefs(userStore);
const { taskEdit } = storeToRefs(taskStore);
const isEdit = computed(() => taskStore.isEdit);

const newTaskTitle = ref('');
const newTaskDescription = ref('');
const taskTitle = ref('');
const taskDescription = ref('');

const completed = ref(false);
const showError = ref(false);

if (isEdit.value && taskEdit.value) {
  taskTitle.value = taskEdit.value.taskTitle;
  taskDescription.value = taskEdit.value.taskDescription;
} else {
  taskTitle.value = '';
  taskDescription.value = '';
}

function NewOrUpdateTask(id: number, title: string, description: string): void {

    if (isEdit.value) {
        if (taskTitle.value && taskDescription.value) {
            taskStore.updateTask(id, title, description)
            completed.value = true;
        } else {
            showError.value = true;
        }
    } else {
        if (taskTitle.value && taskDescription.value) {
            taskStore.addTask(newTaskTitle.value, newTaskDescription.value);
            newTaskTitle.value = '';
            newTaskDescription.value = '';
            completed.value = true;
        } else {
            showError.value = true;
        }
    }
}

const close = (cardState: string) => {
    showError.value = false;
    completed.value = false;
    taskStore.isEdit = false;
    userStore.close(cardState);
    if (taskStore.filter !== 'all') {
        router.push({
            name: 'HomeView',
            query: { filter: taskStore.filter }
        });
    } else {
        router.push({
            name: 'HomeView',
        });
    }
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