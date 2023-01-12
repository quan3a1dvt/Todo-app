<script setup>

import {ref, onMounted, computed} from 'vue'


const todos = ref([])
const input_content = ref('')
const input_priority = ref(null)
const input_date = ref('')
const input_time = ref('')
const input_datetime = ref('')
const input_createon = ref('')
const todos_asc = computed(() => todos.value.sort((a,b) =>{
  return b.input_createon  - a.input_createon
}))
var options = {month: 'short', day: 'numeric' };

const addTodo = () => {
  if (input_content.value.trim() === "" || input_priority.value === null){
    return
  }
  console.log("addTodo")
  // dates = input_date.split('')
  todos.value.push({
    content: input_content.value,
    priority: input_priority.value,
    done: false,
    selected: false,
    input_createon: new Date()
    // input_datetime: 000
    // date: input_date.value == '' ? new Date().toISOString().slice(0,10) : input_date.value
  })
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}

const selected = (todo) => {
  todo.selected = true
  var len = todos.value.length
  let i
  console.log(len)
  for (i = 0; i < len; i++){
    if (todos.value[i] !== todo){
      todos.value[i].selected = false;
    }
  }
}

onMounted(() => {
  todos.value = []
  input_date.value = new Date().toISOString().slice(0,10)
})

</script>

<template>
  <main class="app">
    <section>
      <h2>TODO-LIST</h2>
    </section>
    <section class="create-todo">
      <form @submit.prevent="addTodo">
        <input 
          type="text"
          placeholder="Enter new To-do"
          v-model="input_content"/>
      <h4>Set priority</h4>
				<div class="options">
					<label>
						<input 
							type="radio" 
							name="priority" 
							id="priority1" 
							value="none"
							v-model="input_priority" />
						<span class="bubble none"></span>
						<div>None</div>
					</label>

          			<label>
						<input 
							type="radio" 
							name="priority" 
							id="priority2" 
							value="low"
							v-model="input_priority" />
						<span class="bubble low"></span>
						<div>Low</div>
					</label>

					<label>
						<input 
							type="radio" 
							name="priority" 
							id="priority3" 
							value="medium"
							v-model="input_priority" />
						<span class="bubble medium"></span>
						<div>Medium</div>
					</label>


					<label>
						<input 
							type="radio" 
							name="priority" 
							id="priority4" 
							value="high"
							v-model="input_priority" />
						<span class="bubble high"></span>
						<div>High</div>
					</label>  
        </div>
        <h4>Set date and time</h4>
        <div class="time">
            <input type="date" style="font-size: 1.2rem" v-model="input_date"/>
            <input type="time" style="font-size: 1.2rem" v-model="input_time"/>
        </div> 
        
        <input type="submit" value="Add todo" />
       
      </form>
    </section>
    <section class="todo-list">
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`" @dblclick="selected(todo)">
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${todo.priority}`"></span>
					</label>

					<div class="todo-content">
						<input type="text" :readonly=!todo.selected v-model="todo.content" />
					</div>

          <!-- <div class="todo-time">
						<input type="text" v-model="todo.date" />
					</div> -->

					<div v-if="todo.selected" class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>
				
			</div>
		</section>
  </main>
</template>

<style scoped>

</style>
