"use client"
import { CreateTodo } from "@/components/create-todo";
import { CreateUser } from "@/components/create-user";
import TodoList from "@/components/todo-list";
import { Flex, Grid, GridItem } from '@chakra-ui/react'

export default function Home() {

  return (
    <>
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      padding={4}
    >
      <Grid
        h='auto'  // Use auto to fit content height
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        maxW='1200px' // Adjust as needed to fit your design
        width="100%"  // Full width of the parent container
      >
        <GridItem rowSpan={2} colSpan={1}>
          <CreateUser />  
        </GridItem>
        <GridItem colSpan={2}>
          <TodoList />
        </GridItem>
        <GridItem colSpan={2}>
          <CreateTodo />
        </GridItem>
      </Grid>
      </Flex>
    </>
    
  );
}
    
