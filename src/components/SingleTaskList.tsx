import React from 'react'
import Icon from './Icon'
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from 'react-icons/md'

function SingleTaskList() {
  return (
    <div>
      <div className="relative bg-white w-full md:w-[400px] drop-shadow-md rounded-md min-h-40 overflow-hidden">
        <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            <p>Tasklist Text Here</p>
            <div>
                <Icon IconName={MdEdit} reduceOpacityOnHover/>
                <Icon IconName={MdDelete} reduceOpacityOnHover/>
                <Icon IconName={MdKeyboardArrowDown} reduceOpacityOnHover />
            </div>
        </div>
      </div>
      <Icon IconName={MdAdd} className='absolute -top-3 -left-5 drop-shadow-lg hover:bg-myPink' />
    </div>
  );
}

export default SingleTaskList
