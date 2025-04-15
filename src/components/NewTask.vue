<template>
    <div class="new-task"  v-if="cardActive">
        <div class="new-task__card">
            <div class="new-task__card-title">
                <div class="new-task__logo">
                    <font-awesome-icon :icon="['fas', 'list-check']" size="xl" />
                </div>
                <h3>Список задач</h3>
            </div>
            <div class="new-task__title">
                <label for="task-title">Название задачи:</label>
                <input name="task-title" id="taskTitle" type="text" placeholder="Введите название задачи">
            </div>
            <div class="new-task__description">
                <label for="task-description">Описание задачи:</label>
                <textarea name="task-description" id="taskDescription" placeholder="Введите описание задачи"
                    rows="5"></textarea>
            </div>
            <div class="new-task__close">
                <button @click="close">
                    <font-awesome-icon :icon="['fas', 'xmark']" size="xl" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use './../styles/mixins.scss';

.new-task {
    @include mixins.flex;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
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

            & textarea {
                width: 100%;
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

<script setup lang="ts">
import { useNewTask } from './../store/store.ts'

const userStore = useNewTask();
const cardActive = userStore.cardActive;
const close = () => {
    userStore.close();
}

</script>