import React from 'react'
import Icon from './Icon'
import { MdDelete, MdEdit } from 'react-icons/md'

function Task() {
  return (
    <div className='bg-white p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md'> 
      <div>
        <p className='cursor-pointer'>Task title</p>
      </div>
      <div>
        <hr />
        <div>
            <p>Some description</p>
            <div className='flex justify-end'>
                <Icon IconName={MdEdit} />
                <Icon IconName={MdDelete} />
            </div>
        </div>
      </div>
    </div>
  )
}


export default Task

