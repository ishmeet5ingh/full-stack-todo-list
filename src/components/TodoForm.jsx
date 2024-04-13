import React, {Children, useEffect, useState} from 'react'
import todoService from '../appwrite/todoService'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useActionData } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import { toggle } from '../store/statusSlice'
import {useDispatch} from 'react-redux'


function TodoForm() {

    const {register, handleSubmit} = useForm()
    const authuserData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()
    const status1 = useSelector(state => state.status.statu)
    console.log("authuserData", authuserData?.$id)
    const onSubmit = async(data, e) => {
      // Using optional chaining to safely access $id
      const userId = authuserData?.$id;
      if (userId) {
        await todoService.createTodo({
          ...data, userId: userId
        });
        e.target.reset();
        dispatch(toggle())
      } else {
        console.log("User data is not available.");
      }

    }



  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form
    onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center mb-10"
      >
        <Input
          type="text"
          className="border-2"
          placeholder="Enter Todo"
          {...register('todo', {
            required: true,
          })}
        />
        <Button
          type="submit"
          children="Add Todo"
          bgColor="bg-blue-600"
        />
      </form>
    </div>
  )
}

export default TodoForm