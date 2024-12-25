const fs = require('fs')
const { Command } = require('commander');
const program = new Command();

const file = './todo.json'


function loadTodos(){
    if (!fs.existsSync(file)){
        fs.writeFileSync(file, JSON.stringify([]));
        return []
    }
    return JSON.parse(fs.readFileSync(file, 'utf8'))
}


function saveTodos(todos){
    fs.writeFileSync(file, JSON.stringify(todos, null, 2), 'utf8')
}


program
   .name('todo')
   .description('made a todo usng cli')
   .version('0.1.0');

program
   .command('add <task> ')
   .description('add items to the todo')
   .action((task) => {
      const todos = loadTodos();
      todos.push({task, done: false})
      saveTodos(todos)
      console.log(`✅Added: ${task}`)
        
    })


program
    .command('list')
    .description('List the all the tasks')
    .action(() => {
        const todos = loadTodos();
        if (todos.length === 0) {
            console.log("😩Kuch to krlo make it productive")
        }
        else {
            console.log("📃Todos: ")
            todos.forEach((todo, index) => {
                const status = todo.done ? "[✔]" : "[ ]";
                console.log(`${index}. ${status} ${todo.task}`);
            })
        }
    })


program
   .command('done <index>')
   .description("mark it as done")
   .action((index) => {
      const todos = loadTodos()
      if (index < 0  || index >= todos.length){
        console.log("❌Todo doesnt exist baby")
        return;
    }
    todos[index].done = true;
    saveTodos(todos)
    console.log(`🌞You completed a task sunshine, ${todos[index].task} `)
   })


program
   .command('delete <index>')
   .description('delete the todo')
   .action((index) => {
    const todos = loadTodos()
    if (index < 0  || index >= todos.length){
        console.log("❌Todo doesnt exist baby")
        return;
    }
    const remove = todos.splice(index, 1)
    saveTodos(todos)
    console.log(`🗑️ Bhaad mei gya ${remove[0].task}`)
   })

   program.parse(process.argv)
