const url = 'https://jsonplaceholder.typicode.com/todos/'

const get = async () => {
  const res = await fetch(url)
  const json = await res.json()
  let todos = []
  for (let todo of json) {
    todos.push({
      'content': todo['title'],
      'priority': 'low',
      'id': todo['id'],
      'done': todo['completed'],
      'createon': new Date(),
      'date': null
    })
  }
  return todos
}

const del = async(id) => {
  await fetch(url + id.toString(), {
    method: 'DELETE'
  })
}

const patch = async(id, todo) => {
  await fetch(url + id.toString(), {
      method: 'PATCH',
      body: JSON.stringify({
        title: todo.content,
        completed: todo.done
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
  })
}

const post = async(todo) => {
  await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        userId: 1,
        id: todo.id,
        title: todo.content,
        completed: todo.done
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
  })
}

export {get, del, patch, post}