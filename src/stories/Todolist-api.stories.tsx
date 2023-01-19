import React, {useEffect, useState} from "react";
import axios from "axios";

export default {
    title: 'API Component'
}

const settings = {
    withCredentials: true,//cuckies loginization || api key
    headers: {
        'API-KEY': '6b81f6a1-5ebf-4798-9547-d8f4d6c51bfc'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        //здесь мы будем делать запрос и ответ закидывать в стейт
        //который в виде строки будет отображать в div
       // let promise =  axios.get('https://....')
       //  promise.then((res) => {

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
            debugger
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        //здесь мы будем делать запрос и ответ закидывать в стейт
        //который в виде строки будет отображать в div
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title: 'Create Dimych TD'}, settings)//preload = {}
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        //здесь мы будем делать запрос и ответ закидывать в стейт
        //который в виде строки будет отображать в div
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/d9394e2c-0258-45a4-b263-81e0e997ad38', settings)// + id
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        //здесь мы будем делать запрос и ответ закидывать в стейт
        //который в виде строки будет отображать в div

        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/d9394e2c-0258-45a4-b263-81e0e997ad38',{title: 'YoYoHey'}, settings)
            //preload = {} + id todolist
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
