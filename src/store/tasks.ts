import { defineStore } from "pinia";

interface Task {
    id: number,
    title: string,
    description: string,
    completed: boolean,
}

export type FilterType = 'all' | 'active' | 'completed';

export const useTask = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
        filter: 'all',
        title: 'Все задачи',
        taskId: 0,
        taskEdit: {
            taskId: 0,
            taskTitle: '',
            taskDescription: '',
        },

    isEdit: false,

    }),

    actions: {

        setFilter(newFilter: 'all' | 'active' | 'completed') {
            this.filter = newFilter;
        },

        addTask(title: string, description: string): void {
            const newTask: Task = {
                id: Date.now(),
                title,
                description,
                completed: false
            };
            this.tasks.push(newTask);
            this.saveTaskToLocalStorage();
        },

        toggleTask(id: number) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed;
                this.saveTaskToLocalStorage();
            }
        },

        deleteTask(id: number) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTaskToLocalStorage();
        },

        saveTaskToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },

        loadTaskToLocalStorage() {
            const storedTask = localStorage.getItem('tasks');
            if (storedTask) {
                this.tasks = JSON.parse(storedTask);
            }
        },

        taskEditor(id: number) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                this.taskEdit.taskId = task.id;
                this.taskEdit.taskTitle = task.title;
                this.taskEdit.taskDescription = task.description;
            }
        },

        updateTask(id: number, title: string, description: string) {
            const task = this.tasks.find(task => task.id === id)
            if (task) {
                task.id = id;
                task.title = title;
                task.description = description;
                this.saveTaskToLocalStorage();
            }
        },

        updateTaskOrder(newOrder: { id: number; title: string; description: string; completed: boolean }[]) {
            this.tasks = newOrder;
        }

    },

    getters: {
        filteredTask(state) {
            switch (state.filter) {
                case 'active':
                    state.title = 'Активные задачи';
                    return state.tasks.filter(task => !task.completed);
                case 'completed':
                    state.title = 'Выполненые задачи';
                    return state.tasks.filter(task => task.completed);
                default:
                    state.title = 'Все задачи';
                    return state.tasks;
            }
        }
    }
});