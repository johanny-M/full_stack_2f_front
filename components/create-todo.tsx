"use client"
import type { FC } from "react";
import {
    Button,
    Flex,
    FormControl,
    Input,
    useToast,
    Spinner,
    Box,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Textarea } from '@chakra-ui/react'
import { useCreateTodoMutation } from "@/redux/api";
  

  
  export const CreateTodo:FC = () => {
    const toast = useToast()
    const [createTodo,{ isLoading }] = useCreateTodoMutation();
    const [title, setTitle] = useState<string>('')
    const [description,setDescription]=useState<string>('')
    const [userId, setUserId] =useState<string>('')
    // const user_id=localStorage.getItem("user_id")
    useEffect(()=>{
        const user_id=localStorage.getItem("user_id")
        if(user_id !== null){
            setUserId(user_id)
        }
    })
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
          // Call the createUser mutation with the username and email
          await createTodo({
              title, 
              description,
              user_id: userId
          }).unwrap(); // unwrap() to handle errors
          toast({
            title: 'Todo created successfully!',
            status: 'success',
            duration: 2000,
            isClosable: false,
            position: 'top',
          })
        } catch (error) {
          console.error("Failed to create todo:", error);
          toast({
            title: 'Error creating Todo',
            status: 'error',
            duration: 2000,
            isClosable: false,
            position: 'top',
          })
        }
      };
    
    return (
      <FormControl>
        <form onSubmit={handleSubmit}>
        <Flex gap="1rem" mt="2rem" justify="center">
        <Box w='100%' p={4} color='white'>
        <Input
            type="text"
            placeholder="title"
            color="black"
            my={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            width="100%"
        />
            <Textarea 
                placeholder='ToDo description'
                value={description}
                color="black"
                onChange={(e) => setDescription(e.target.value)}
                />
        </Box>
            
        <Button type="submit">
            {isLoading ? <Spinner /> : 'Add'}
        </Button>
          </Flex>
        </form>
      </FormControl>
    )
  }
