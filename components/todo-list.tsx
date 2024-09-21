import React, { useState } from 'react';
// import { useGetTodosQuery } from '@/services/todosApi';
import { Stack, Box, Heading, Text, Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useGetTodosQuery } from '@/redux/api';


const TodoList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading } = useGetTodosQuery(page);

  if (isLoading) return <Spinner size="lg" />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      There was an error loading the todos.
    </Alert>
  );

  return (
    <Stack spacing={4} p={4}>
      {data?.todos.length === 0 ? (
        <Box>No todos available</Box>
      ) : (
        data && data.todos.map(todo => (
          <Box
            key={todo.id}
            borderWidth={1}
            borderRadius="md"
            p={4}
            shadow="md"
          >
            <Heading size="md">{todo.title}</Heading>
            <Text mt={2}>{todo.description}</Text>
            <Text mt={2} color={todo.status === 'Pending' ? 'gray.600' : 'green.600'}>
              Status: {todo.status}
            </Text>
          </Box>
        ))
      )}

      <Stack direction="row" spacing={4} mt={4}>
        <Button 
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
          isDisabled={page === 1}
        >
          Previous
        </Button>
        <Button 
          onClick={() => setPage(prevPage => prevPage + 1)}
          isDisabled={!data || data.todos.length === 0}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default TodoList;
