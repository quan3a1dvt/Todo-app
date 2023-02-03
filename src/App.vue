<script setup>
import {
  ref,
  onMounted,
  computed,
  watch
} from 'vue'

import moment from 'moment'
import {get, del, patch, post} from './api/api'
const todos = ref([])
let ID = ref(200)
const input_content = ref(null)
const input_priority = ref(null)
const edit_priority = ref(null)
const edit_date = ref('')
const edit_content = ref('')
const input_date = ref('')
const isInputInvalid = ref(false)
const todos_asc = computed(() => todos.value.sort((a, b) => {
  return a.date - b.date
}))

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {
  deep: true
})

watch(ID, (newVal) => {
  localStorage.setItem('ID', newVal)
})

const addTodo = (content, piority, id, done, createon, date) => {
  todos.value.push({
    content: content,
    priority: piority,
    id: id,
    done: done,
    selected: false,
    createon: createon,
    date: date == null ? createon : date,
    short_date: moment(String(date == null ? createon : date)).format('DD/MM/YYYY hh:mm')
  })
}
const submitTodo = () => {
  if (input_content.value === null || input_content.value.trim() === "") {
    isInputInvalid.value = true
    return
  } else {
    isInputInvalid.value = false
  }
  if (input_priority.value === null) {
    return
  }
  ID = ID + 1
  addTodo(input_content.value, input_priority.value, ID, false, new Date(), input_date.value)
  post(todos.value.slice(-1))
}

const removeTodo = (todo) => {
  del(todo.id)
  todos.value = todos.value.filter((t) => t !== todo)
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

const selected = (todo) => {
  todo.selected = true
  var len = todos.value.length
  let i
  for (i = 0; i < len; i++) {
    if (todos.value[i] !== todo) {
      todos.value[i].selected = false;
    }
  }
  edit_content.value = todo.content
  edit_priority.value = todo.priority
  edit_date.value = todo.date
}

const deselectall = (() => {
  var len = todos.value.length
  let i
  for (i = 0; i < len; i++) {
    todos.value[i].selected = false;
  }
})

onMounted(async () => {
  // todos.value = JSON.parse(localStorage.getItem('todos')) || []
  input_date.value = new Date()
  todos.value = []
  get().then( function(result) {
    for (let i in result) {
      let todo = result[i]
      addTodo(todo['content'], todo['priority'], todo['id'], todo['done'], todo['createon'], todo['date'])
    }
  })
})
</script>

<template>
<main class="app" @click="deselectall">

  <select v-model="$i18n.locale">
    <option value="vi">vi</option>
    <option value="en">en</option>
  </select>
  <section>
    <h2>TODO-LIST </h2>
  </section>
  <section class="create-todo">
    <form @submit.prevent="submitTodo" style="user-select: none;">
      <input type="text" :placeholder="$t('content')" v-model="input_content" :class="{'error-boarder':isInputInvalid}" />
      <h4>{{ $t('priority.set') }}</h4>
      <div class="options">
        <label>
          <input type="radio" name="priority" id="priority1" value="none" v-model="input_priority" />
          <span class="bubble none"></span>
          <div>{{ $t('priority.none') }}</div>
        </label>

        <label>
          <input type="radio" name="priority" id="priority2" value="low" v-model="input_priority" />
          <span class="bubble low"></span>
          <div>{{ $t('priority.low') }}</div>
        </label>

        <label>
          <input type="radio" name="priority" id="priority3" value="medium" v-model="input_priority" />
          <span class="bubble medium"></span>
          <div>{{ $t('priority.medium') }}</div>
        </label>

        <label>
          <input type="radio" name="priority" id="priority4" value="high" v-model="input_priority" />
          <span class="bubble high"></span>
          <div>{{ $t('priority.high') }}</div>
        </label>
      </div>
      <h4>{{ $t('pickdate') }}</h4>

      <Datepicker class="datetime" v-model="input_date" format="dd/MM/yyyy HH:mm" :locale="$t('common.lang')" :cancelText="$t('datepicker.cancel')" :selectText="$t('datepicker.select')"></Datepicker>

      <input type="submit" value="Add todo" />

    </form>
  </section>
  <section class="todo-list">
    <div class="list" id="todo-list">

      <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`" @click.stop @dblclick="selected(todo)">
        <div v-if="!todo.selected" class="show">
          <label>
            <input type="checkbox" v-model="todo.done" @click="apiUpdate(todo)" />
            <span :class="`bubble ${todo.priority}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" :readonly=true v-model="todo.content" />
          </div>

          <div class="todo-datetime">
            <input type="text" :readonly=true d v-model="todo.short_date" />
          </div>

        </div>
        <div v-if="todo.selected" class="edit">
          <div class="todo-content">
            <input type="text" v-model="edit_content" />
          </div>
          <select class="priority" v-model="edit_priority">
            <option value="none">{{ $t('priority.none') }}</option>
            <option value="low">{{ $t('priority.low') }}</option>
            <option value="medium">{{ $t('priority.medium') }}</option>
            <option value="high">{{ $t('priority.high') }}</option>
          </select>
          <Datepicker class="datetime" v-model="edit_date" format="dd/MM/yyyy HH:mm" :locale="$t('common.lang')" :cancelText="$t('datepicker.cancel')" :selectText="$t('datepicker.select')"></Datepicker>
          <div class="actions">
            <button class="save" @click="saveTodo(todo)">{{ $t('save') }}</button>
            <button class="delete" @click="removeTodo(todo)">{{ $t('delete') }}</button>
          </div>
        </div>
      </div>

    </div>
  </section>
</main>
</template>

<style scoped>

</style>
