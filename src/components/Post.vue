<script setup>
import {
  ref,
  onMounted,
} from 'vue'
import { RouterLink } from 'vue-router';
const todos = ref([])

const edit = (id) => {

  // for (let todo of todos.value){
  //   if (todo.id == id) {
  //     console.log(todo)
  //     return
  //   }
  // }
}
onMounted(async () => {
  todos.value = await JSON.parse(localStorage.getItem('todos')) || []
})

</script>

<template>

  <!-- {{ todos.value }} -->
  <div v-for="todo in todos">
    <router-link :to="{name: 'Edit', params: {id: todo.id}}" custom v-slot="{ navigate }">
      <button class="btn-edit" @click="navigate(); edit(todo.edit);" role="link">
        <div v-for="(value, key, index) in todo">
          {{ key }}: {{ value }}
        </div>
        <br>
      </button>
    </router-link>     
  </div>

</template>
<style scoped>
.btn-edit {
  display: block;
  width: 100%;
  font-size: 15pt;
  text-align: left;
  background-color: rgba(219, 218, 218, 0.874);
}
.btn-edit:hover {
  background-color:rgb(58, 123, 253);
  color: white;
}
</style>
