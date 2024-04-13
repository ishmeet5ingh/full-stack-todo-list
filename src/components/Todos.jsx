import React, { useEffect, useState, useCallback } from "react";
import todoService from "../appwrite/todoService";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";

import { toggle } from "../store/statusSlice";


function Todos() {
  const [todos, setTodos] = useState([]);
  const [isEditable, setIsEditable] = useState(false)
  const [loader, setLoader] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const status = useSelector(state => state.status.statu)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoader(true);
    todoService.getTodos().then(
      (response) => {
        const userTodos = response.documents.filter(doc => doc.userId === userData?.$id);
          setTodos(userTodos)
      },
      (error) => {
        console.log(error);
      }
    ).finally(()=>setLoader(false));
    
  }, [status]); 


  const deleteTodo = async (id) => {
    await todoService.deleteTodo(id);
    dispatch(toggle())
  };
  
  const update = async(data, e) => {
    console.log("userDAta.$id",userData.$id)
    console.log("data",data)

  await todoService.updataTodo({...data})

    e.target.reset();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (
        <div>
          
              {todos &&  todos.map(item => (
                <div key={item.$id} >
                <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                  <div>
                    <p>{item.todo}</p>
                    
                  </div>
                  <div>
                  <Button
                   type="button"
                  children="Delete"
                  bgColor="bg-red-600"
                  className="mr-4"
                  onClick={() => {
                        deleteTodo(item.$id)
                    }}
                  />
                  </div>
                </div>
              </div>
              )) }
            
        </div>
      )}
    </div>
  )
}

export default Todos;
