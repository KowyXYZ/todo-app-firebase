import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

import Cookies from 'universal-cookie';
import {motion} from 'framer-motion'
import { signOut } from 'firebase/auth'
const cookies = new Cookies()

function ToDo({setIsAuth}) {

    const [todoList, setToDoList] = useState([])

    const todoCollectioRef = collection(db, 'todo')

    const [visible, setVisible] = useState(false)

    const [task, setTask] = useState('')
    const [dueTo, setDueTo] = useState('')

    const [updateTask, setUpdateTask] = useState('')


    const getToDoList = async() => {
        const data = await getDocs(todoCollectioRef)
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id
        }))
        console.log(filteredData)
        setToDoList(filteredData)
    }

    useEffect(() => {
      getToDoList()
    }, [])


    const removeToDo = async(id) => {
        const moviedoc = doc(db, 'todo', id)
        await deleteDoc(moviedoc)
        getToDoList()
    }

    const addToDo = async() => {
        setVisible(false)

        await addDoc(todoCollectioRef, {
            task: task,
            dueTo: dueTo,
            id: auth?.currentUser?.uid
        })
        getToDoList()
    }

    const updateToDo = async(id) => {
        if(updateTask === '') {
            return
        }
        const moviedoc = doc(db, 'todo', id)
        await updateDoc(moviedoc, {task: updateTask})
        setUpdateTask('')
        getToDoList()
    }
    
    const SignOut = async() => {
        setIsAuth(false)
        await signOut(auth)
        cookies.remove('auth-token')
        

    }
    
  return (
    
    <div className='flex justify-center items-center container mx-auto flex-col py-12 gap-4'>
      <p className='text-[24px] font-black'>Welcome to:  <span className='text-purple-500'>{auth?.currentUser?.displayName}</span> ToDo List</p>
      <p className='text-lime-500' onClick={() => setVisible(!visible)}>[+] Add New ToDo</p>
      {visible ? 
      <motion.div
      animate={{
        x: [500, 0]
      }}
      className='flex flex-col gap-4 p-5 border-2 rounded-2xl '>
        <input type="text" className='text-center  rounded-2xl p-1 py-2 w-96' placeholder='ToDo Task?' onChange={(e) => setTask(e.target.value)}/>
        <input type="text" className='text-center w-full rounded-2xl p-1 py-2' placeholder='Due To?' onChange={(e) => setDueTo(e.target.value)}/>
        <button className='w-full bg-lime-500 rounded-2xl p-2 font-semibold' onClick={addToDo}>Submit</button>
      </motion.div> 
      
      : console.log(':)')}
      <p className='text-[20px] font-semibold underline mt-12'>ToDo List: </p>
      <div>
        {todoList.length === 0 ? <p>Your ToDo List is Empty, Add New ToDo.</p> : <motion.div  animate={{
          x: [500, 0]
        }} className='flex flex-col gap-8'>{todoList.map((el, index) => {
            return(
                <div key={index} className='text-[20px] border-2 p-6 rounded-2xl gap-4 flex flex-col justify-center items-center'>
                    <p className='font-bold text-purple-500'>Task: <span className='font-medium text-white capitalize'>{el.task}</span></p>
                    <p className='font-bold text-purple-500 '>Due To: <span className='font-medium text-white capitalize'>{el.dueTo}</span></p>
                    <input className='w-full text-center rounded-2xl' type="text" placeholder='Text here...' onChange={(e) => setUpdateTask(e.target.value)}/>
                    <p className='w-full bg-blue-600 text-center rounded-2xl' onClick={() => updateToDo(el.id)}>Edit ToDo</p>
                    <p className='w-full bg-red-600 text-center rounded-2xl' onClick={() => removeToDo(el.id)}>Remove ToDo</p>
                </div>
            )
        })}</motion.div>}
        
   

      </div>
      <button onClick={SignOut} className='bg-purple-600 px-6 py-2 rounded-2xl mt-12'>Sign Out</button>
    </div>
  )
}

export default ToDo
