import React from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun } from 'react-icons/hi'
import { HiMoon } from 'react-icons/hi2'
import { RiSettings3Fill } from 'react-icons/ri'

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <>
      <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-[var(--border-color)]">
        <div className="logo">
         <h3 className='text-[25px] font-[700] sp-text'>GenUI</h3>
        </div>
        <div className="icons flex items-center gap-[15px]">
          <button type="button" className="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <HiSun /> : <HiMoon />}
          </button>
          <div className="icon"><FaUser /></div>
          <div className="icon"><RiSettings3Fill /></div>
        </div>
      </div>
    </>
  )
}

export default Navbar