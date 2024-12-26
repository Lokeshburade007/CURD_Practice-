import React, { useState } from 'react'
import axios from 'axios'

const Create = () => {
    const [task, setTask] = useState();

    const handleAdd = ()=>{
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="create_form">
        <input type="text" placeholder='Enter task' onChange={(event)=>{
            setTask(event.target.value);
        }}/>
        <button type='submit' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create