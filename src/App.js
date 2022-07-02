import {
  Button,
  ChakraProvider,
  Input,
  Flex,
  VStack,
  Heading,
  HStack,
  Text,
  IconButton,
  StackDivider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { theme } from "./theme/theme";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

export const App = () => {
  const [todos, setTodos] = useState([
    // { title: "筋トレをする", status: "done" },
    // { title: "子供のお迎え", status: "notStarted" },
    // { title: "企画書の提出", status: "inProgress" },
  ]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoId, setTodoId] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("notStarted");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value);
  };

  const resetFormInput = () => {
    setTodoTitle("");
  };

  const handleAddTodo = () => {
    setTodos([
      ...todos,
      { id: todoId, title: todoTitle, status: "notStarted" },
    ]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  const handleOpenEditForm = (todo) => {
    setIsEditable(true);
    setEditId(todo.id);
    setNewTitle(todo.title);
  };

  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditId("");
  };

  const handleEditTodo = () => {
    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newTitle } : todo
    );
    setTodos(newArray);
    setNewTitle("");
    setEditId();
    handleCloseEditForm();
  };

  const handleStatusChange = (targetTodo, e) => {
    console.log(targetTodo);
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newArray);
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "notStarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notStarted")
          );
          break;
        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;
        // ここまで
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <ChakraProvider theme={theme}>
      <VStack p={8}>
        <Heading p={8}>TODOアプリ</Heading>
        {isEditable ? (
          <Flex>
            <Input
              variant="filled"
              type="text"
              label="新しいタイトル"
              placeholder="TODOを入力"
              onChange={handleEditFormChange}
            />
            <Button onClick={handleEditTodo}>編集を保存</Button>
            <Button onClick={handleCloseEditForm}>キャンセル</Button>
          </Flex>
        ) : (
          <Flex>
            <Input
              variant="filled"
              type="text"
              label="新しいタイトル"
              placeholder="TODOを入力"
              value={todoTitle}
              onChange={handleAddFormChanges}
            />
            <Button onClick={handleAddTodo}>作成</Button>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">すべて</option>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
          </Flex>
        )}
        <ul>
          {filteredTodos.map((todo) => (
            <VStack divider={<StackDivider />}>
              <HStack>
                <Text>
                  <li key={todo.id}>{todo.title}</li>
                </Text>
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo, e)}
                >
                  <option value="notStarted">未着手</option>
                  <option value="inProgress">作業中</option>
                  <option value="done">完了</option>
                </select>
                <IconButton
                  icon={<MdModeEdit />}
                  onClick={() => handleOpenEditForm(todo)}
                  isRound="true"
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTodo(todo)}
                  isRound="true"
                />
              </HStack>
            </VStack>
          ))}
        </ul>
      </VStack>
    </ChakraProvider>
  );
};
