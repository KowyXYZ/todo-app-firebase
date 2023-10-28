import React from 'react'
import logo from '../assets/logo.webp'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase-config'


import Cookies from 'universal-cookie'
const cookies = new Cookies()


function Authentication({setIsAuth}) {

    const signInWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider)
        try {
            cookies.set('auth-token', result?.user?.refreshToken)
            setIsAuth(true)
        } catch (error) {
            console.log(error)
        }
    }
    

  return (
    <div className='flex justify-center items-center container mx-auto flex-col py-12 gap-4'>
       <p className='text-[34px] font-black'>Welcome to the ToDo App</p>
      <p>Login with google to continue</p>
      <button className='flex justify-center items-center border-2 p-2 gap-2 rounded-3xl' onClick={signInWithGoogle}> <img className='w-8' src={logo} alt="logo" />Sign In With Google</button>
    <p className='mt-12 '>ToDo application made by Kowy , check out my other projects on my <a className='underline opacity-100 text-purple-500' href="https://github.com/KowyXYZ">GitHub</a></p>
    </div>
  )
}

export default Authentication
