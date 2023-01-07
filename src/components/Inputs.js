import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';
const Inputs = ({setQuery, units, setUnits}) => {
  const [city, setCity] = useState('')
  const handleSearchClick = ()=>{
    if(city !== '') setQuery({q:city})
  }
  const handleLocationClick = ()=>{
    if(navigator.geolocation){
      toast.info('Getting users location.')
      navigator.geolocation.getCurrentPosition(position=>{
        toast.success('Location fetched!')
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        setQuery({
          lat,lon
        })
      })
    }
  }
  const handleUnitsChange = (e)=>{
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit) setUnits(selectedUnit)
  }
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input type="text" className='text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase' placeholder='Search for city...' value={city} onChange={(e)=> setCity(e.target.value)} />
            <UilSearch size={25} className="text-white cursor-pointer transition ease-out hover:scale-125 duration-100" onClick={handleSearchClick} />
            <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125 duration-100" onClick={handleLocationClick} />
        </div>
        <div className='flex w-1/4 items-center justify-center'>
            <button className='text-xl text-white font-light' name='metric' onClick={handleUnitsChange}>°C</button>
            <p className='text-xl text-white mx-1'>|</p>
            <button className='text-xl text-white font-light' name='imperial' onClick={handleUnitsChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs