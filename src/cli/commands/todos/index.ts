// Frameworks
import { Command } from "commander";

// Subcommands
import createTodo from "./create-todo";
import deleteTodo from "./delete-todo";
import listTodos from "./list-todos";

const todosCommand = new Command("todos");

todosCommand.addCommand(listTodos)
todosCommand.addCommand(createTodo)
todosCommand.addCommand(deleteTodo)

export default todosCommand;
