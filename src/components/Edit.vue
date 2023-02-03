<script setup>
import {
  ref,
  watch,
  onMounted,
} from 'vue'
import { useRoute } from 'vue-router';
import {get, del, patch, post} from '../api/api'
const route = useRoute(); 
const id = ref(0)
const todos = ref([])
const todo = ref(null)
const edit_priority = ref(null)
const edit_date = ref('')
const edit_content = ref('')

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {
  deep: true
})

const removeTodo = () => {
  del(id.value)
  todos.value = todos.value.filter((t) => t.id.value !== id.value)
}

const saveTodo = (todo) => {
  if (edit_date.value != null) {
    todo.date = edit_date.value
    todo.short_date = moment(String(edit_date.value)).format('DD/MM/YYYY hh:mm')
  }
  todo.content = edit_content.value
  todo.selected = false
  todo.priority = edit_priority.value
  apiUpdate(todo)
}

const apiUpdate = (todo) => {
  patch(todo.id, todo)
}

onMounted(async () => {
  todos.value = await JSON.parse(localStorage.getItem('todos')) || []
  id.value = route.params.id;
  for (let todo of todos.value) {
    if (todo.id == id.value){
      todo.value = todo
      edit_content.value = todo.content
      edit_priority.value = todo.priority 
      edit_date.value = todo.date
      return
    }
  }
})
</script>

<template>
  <div :class="todo-item"></div>
  <div class="edit">
    <div class="todo-content">
    <input type="text" v-model="edit_content" />
    </div>
    <select class="priority" v-model="edit_priority">
      <option value="none">None</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <Datepicker class="datetime" v-model="edit_date" format="dd/MM/yyyy HH:mm"></Datepicker>
    <div class="actions">
      <button class="save" @click="saveTodo(todo)">{{ $t('save') }}</button>
      <br>
      <button class="delete" @click="removeTodo()">{{ $t('delete') }}</button>
    </div>
  </div>
</template>
<style scoped>

</style>
