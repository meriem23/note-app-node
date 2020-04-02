const fs = require('fs')
Help = () => {
    console.log("add \t\t\t\t To add new todo")
    console.log("remove \t\t\t\t To remove a  todo")
    console.log("list \t\t\t\t To list all todos")
    console.log("read \t\t\t\t To add new todo")
    return
}
Add = () => {
    let newTodo = {}
    let titleIndex = process.argv.findIndex(el => el === "--title")
    if (titleIndex === -1 || process.argv[titleIndex + 1] === undefined) {
        console.log("Options")
        console.log("--title \t\t\t\t Title of note ")
        console.log("--body \t\t\t\t Body of note \n")
        console.log("\n Missing required arguments : --title, --body")
        return
    } else {
        newTodo.Title = process.argv[titleIndex + 1]
    }
    let bodyIndex = process.argv.findIndex(el => el === "--body")
    if (bodyIndex === -1 || process.argv[bodyIndex + 1] === undefined) {
        console.log("Options")
        console.log("--title \t\t\t\t Title of note ")
        console.log("--body \t\t\t\t Body of note \n")
        console.log("\n Missing required arguments : --title, --body")
        return
    } else {
        newTodo.Body = process.argv[bodyIndex + 1]
    }
    // read the todos.json file
    let todosJSON = fs.readFileSync('todos.json', 'utf8')
    //convert todos.json to js
    let todos = JSON.parse(todosJSON)
    // concat newtodo with the new todos
    let allTodos = todos.concat(newTodo)
    // convert back to json
    let allTodosJSON = JSON.stringify(allTodos)
    // write it back in json
    fs.writeFileSync('todos.json', allTodosJSON)
    console.log('Note created!!')
    console.log(`Title: ${newTodo.Title}`)
    console.log(`Body: ${newTodo.Body}`)
}
Remove = () => {
    let titleIndex = process.argv.findIndex(el => el === '--title')
    if (titleIndex === -1 || process.argv[titleIndex + 1] === undefined) {
        console.log("Options")
        console.log("--title \t\t\t\t Title of note ")
        console.log("help \t\t\t\t To show help \n")
        console.log("\n Missing required arguments : --title, --body")
        return
    } else {
        // read the todos.json file
        let todosJSON = fs.readFileSync('todos.json', 'utf8')
        //convert todos.json to js
        let todos = JSON.parse(todosJSON)
        // filter newtodo with the new todos
        let filtredTodos = todos.filter(el => el.Title !== process.argv[titleIndex + 1])
        if (filtredTodos.length === todos.length) {
            console.log('Note not found!')
            return
        }
        // convert back to json
        let filtredTodosJSON = JSON.stringify(filtredTodos)
        // write it back in json
        fs.writeFileSync('todos.json', filtredTodosJSON)
        console.log('Note was removed!!')
    }
}
List = () => {
    // read the todos.json file
    let todosJSON = fs.readFileSync('todos.json', 'utf8')
    //convert todos.json to js
    let todos = JSON.parse(todosJSON)
    // display array's length
    console.log(`Printing: ${todos.length} note(s)`)
    // loop into in and console log every note
    console.log('----')
    todos.forEach(element => {
        console.log(`Title: ${element.Title}`)
        console.log(`Body: ${element.Body}`)
    });
}
Read = () => {
    let titleIndex = process.argv.findIndex(el => el === '--title')
    if (titleIndex === -1 || process.argv[titleIndex + 1] === undefined) {
        console.log("Options")
        console.log("--title \t\t\t\t Title of note ")
        console.log("help \t\t\t\t\t To show help \n")
        console.log("\n Missing required arguments : --title, --body")
        return
    } else {
        // read the todos.js file
        let todosJSON = fs.readFileSync('todos.json', 'utf8')
        //convert todos.json to js
        let todos = JSON.parse(todosJSON)
        // find the todo with title
        let todo =todos.find(el => el.Title === process.argv[titleIndex + 1])
        if (todo) {
            // display it
            console.log('Note Found:\n-----')
            console.log(`Title: ${todo.Title}`)
            console.log(`Body: ${todo.Body}`)
        } else {
            console.log('Note not found!')
        }
    }
}
switch (process.argv[2]) {
    case 'help':
        return Help()
        break;
    case 'add':
        return Add()
        break;
    case 'remove':
        return Remove()
        break;
    case 'list':
        return List()
        break;
    case 'read':
        return Read()
        break;
    default:
        return Help()
}