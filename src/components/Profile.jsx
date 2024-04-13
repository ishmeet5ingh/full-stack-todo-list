import React, { useEffect, useState } from "react";
import service from "../appwrite/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import  Todos  from "./Todos";
import conf from "../conf/conf";
import {useDispatch} from 'react-redux'
import { toggle } from "../store/statusSlice";


function Profile() {
  console.log("database",conf.appwriteDatabaseId)
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(toggle())
    service.getCurrentUser().then(
      (response) => {
        setUserDetails(response)
        console.log("response", response)
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleLogout = async () => {
      await service.logout()
      navigate('/')
  };

  return (
    <>
      {userDetails ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">Hello {userDetails.name}</p>
            </div>
            <div>
              <button
                className="bg-red-400 text-white p-1 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          {/* TODO FORM */}
          <TodoForm />
          {/* TODOS BOX */}
          <Todos/>
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  );
}

export default Profile;
