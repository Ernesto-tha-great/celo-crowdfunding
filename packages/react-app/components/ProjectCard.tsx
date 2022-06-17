import React from 'react'
import Image from "next/image";
import { truncateAddress, formatTime } from '@/utils';


 export const ProjectCard = ({item }) => (
    <div className='white-glassmorphism m-4 flex flex-1 
       2xl:min-w-[450px]
       2xl:max-w-[450px]
       sm:min-w-[270px]
       sm:max-w-[300px]
       flex-col p-3 rounded-md hover:shadow-2xl
    '>
      <div className='flex flex-col items-center w-full mt-3'>
            <div className='flex flex-col justify-start w-full p-2'>
            <h3 className='text-white text-center mb-2 -mt-6 font-semibold'>{item.projectTitle}</h3>
            <Image src={item.projectImageLink} alt='logo' className='rounded-md' width={80} height={180}/>
                <h3 className='text-white mb-2 mt-2 font-small'>{item.projectDescription}</h3>
                <h3 className='text-white mb-2 font-small'>Goal Amount: {item.projectGoalAmount}</h3>
                <h3 className='text-white mb-2 font-small'>Creator: { truncateAddress(item.projectCreator)}</h3>
                <h3 className='text-white mb-2 font-small'>Deadline: { formatTime(item.fundRaisingDeadline)}</h3>
            </div>
        </div>
    </div>
 );
