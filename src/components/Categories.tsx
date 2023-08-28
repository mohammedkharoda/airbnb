'use client';
import React from 'react'
import Container from '../common/Container'
import { TbBeach } from 'react-icons/tb'
import { GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from './CategoryBox'
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: "This is the property close to the beach"
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: "This is the property has windmills"
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: "Some Modern touch ups"
    }

]

const Categories = () => {
    return (
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {categories.map((category, index) => (
                    <CategoryBox key={index} label={category.label} description={category.description} icon={category.icon} />
                ))}
            </div>
        </Container>
    )
}

export default Categories