import { Button, ChakraProvider, Input, Flex, VStack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "./theme/theme";

export const App = () => {
  const [todos,setTodos] = useState([
    {title: "筋トレをする", status: "done"},
    {title: "子供のお迎え", status: "notStarted"},
    {title: "企画書の提出", status: "inProgress"},
  ])
  const [todoTitle, setTodoTitle] = useState("")
  const [todoId, setTodoId] = useState(0) 
  return (
      <ChakraProvider theme={theme}>
        <VStack p={8}>
        <Heading p={8}>TODOアプリ</Heading>
            <Flex>
            <Input variant='filled' type="text" label="新しいタイトル" placeholder="TODOを入力" />
            <Button>編集を保存</Button>
            <Button>キャンセル</Button>
            </Flex>
          <Flex>
            <Input variant='filled' type="text" label="新しいタイトル" placeholder="TODOを入力" />
            <Button>作成</Button>
          </Flex>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
        </VStack>
        </ChakraProvider>
        
  );
}
