<<<<<<< HEAD
<script>
export default {
  name: 'Vue-i18n',
}
</script>
=======

>>>>>>> 661ab072a023444b7e24e829643349e3299ffcd7
<script setup >

import {ref, onMounted, computed} from 'vue'
// import Datepicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css';
import moment from 'moment'

const todos = ref([])
const input_content = ref('')
const input_priority = ref(null)
const edit_priority = ref(null)
const edit_date = ref('')
const edit_content = ref('')
const input_date = ref('')
const todos_asc = computed(() => todos.value.sort((a,b) =>{
  return a.datetime  - b.datetime
}))

var options = {month: 'short', day: 'numeric' };

const addTodo = () => {
  if (input_content.value.trim() === "" || input_priority.value === null){
    return
  }
  console.log("addTodo")
  let tmp_createon = new Date()
  todos.value.push({
    content: input_content.value,
    priority: input_priority.value,
    done: false,
    selected: false,
    createon: tmp_createon,
    date: input_date.value==null?tmp_createon:input_date.value,
	short_date: moment(String(input_date.value==null?tmp_createon:input_date.value)).format('DD/MM/YYYY hh:mm')
  })
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}

const saveTodo = (todo) => {	
	if (edit_date.value != null){
		todo.date = edit_date.value
		todo.short_date = moment(String(edit_date.value)).format('DD/MM/YYYY hh:mm')
	}
	todo.content = edit_content.value
	todo.selected = false
	todo.priority = edit_priority.value
}

const selected = (todo) => {
  todo.selected = true
  var len = todos.value.length
  let i
  for (i = 0; i < len; i++){
    if (todos.value[i] !== todo){
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
	for (i = 0; i < len; i++){
		todos.value[i].selected = false;
	}
})
onMounted(() => {
  todos.value = []
  input_date.value = new Date()
})
</script>



<template>
  <main class="app" @click="deselectall">
    <section>
      <h2>TODO-LIST {{ $t('name') }}</h2>
    </section>
    <section class="create-todo">
      <form @submit.prevent="addTodo" style="user-select: none;">
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
        <!-- <div class="datetime">
            <input type="date" style="font-size: 1.2rem" v-model="input_date"/>
            <input type="time" style="font-size: 1.2rem" v-model="input_time"/>
        </div>  -->
	
<<<<<<< HEAD
		<Datepicker class="datetime" v-model="input_date" format="dd/MM/yyyy HH:mm"></Datepicker>
=======
		<Datepicker class="datetime" placeholder="Choose a date" v-model="input_date" format="dd/MM/yyyy HH:mm"/>
>>>>>>> 661ab072a023444b7e24e829643349e3299ffcd7
        <input type="submit" value="Add todo" />
       
      </form>
    </section>
    <section class="todo-list">
			<div class="list" id="todo-list" >

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`" @click.stop @dblclick="selected(todo)">
					<div v-if="!todo.selected" class="show">
						<label>
							<input type="checkbox" v-model="todo.done" />
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
							<!-- <option selected disabled>{{ todo.priority.toUpperCase() }}</option> -->
							<option value="none">None</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
						<Datepicker class="datetime" v-model="edit_date" format="dd/MM/yyyy HH:mm"></Datepicker>
						<div class="actions">
							<button class="save" @click="saveTodo(todo)">Save</button>
							<button class="delete" @click="removeTodo(todo)">Delete</button>
						</div>
					</div> 
				</div>
				
			</div>
	</section>
  </main>
</template>

<style scoped>

</style>
