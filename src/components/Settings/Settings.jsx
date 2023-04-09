import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';

import { useStateContext } from '../../StateContext/StateContext';
import './Settings.css';
const colors = ["yellow", "blue", "red", "orange", "lightseagreen", "white", "greenyellow", "green"];
const scrollBars = ["bar", "progress", "default"];
const hoverEffects = ["tech", "abstract", "bricks", "waves"];



const Settings = () => {
    const [openSettings, setOpenSettings] = useState(false);
    const [color, setColor] = useState("#e4e4e4");
    const { 
        selectedColor, setSelectedColor, 
        selectedBar, setSelectedBar, 
        selectedEffect, setSelectedEffect 
    } = useStateContext();

    return (
        <>
            <div
                className={ openSettings ? 'settings-icon out' : 'settings-icon'}
                onClick={ () => setOpenSettings(!openSettings) }
                onPointerEnter={ () => setColor(selectedColor) }
                onPointerLeave={ () => setColor("#e4e4e4") }
            >
                <FiSettings color={ color } size={ 20 } />
            </div>
            {
                openSettings && 
                <motion.div 
                    className='app__settings'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: "linear",
                        delay: .2,
                        duration: .5,
                    }}
                >
                    <div
                        className='close-settings'
                        onClick={ () => {
                            setOpenSettings(false);
                            setColor("#e4e4e4");
                        }}
                        onPointerEnter={ () => setColor(selectedColor) }
                        onPointerLeave={ () => setColor("#e4e4e4") }
                    >
                        <IoClose color={ color } size={ 26 } />
                    </div>
                    <div className='app__settings-params'>
                        <h2>Configuration</h2>
                        <div className='colors'>
                            <h3>Color</h3>
                            <div className='colors-container'>
                                {
                                    colors.map((c) => (
                                        <label key={ c }
                                            style={{ background: c }}
                                            onClick={ () => setSelectedColor(c) }
                                        >
                                            <input
                                                type='radio'
                                                name='color'
                                                id={ c }
                                                checked={ selectedColor === c }
                                            />
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='scrollBar'>
                            <h3>ScrollBar</h3>
                            <div className='bars-container'>
                                {
                                    scrollBars.map((bar) => (
                                        <label key={ bar }
                                            onClick={ () => setSelectedBar(bar) }
                                        >
                                            <input
                                                type='radio'
                                                name='bar'
                                                id={ bar }
                                                checked={ selectedBar === bar }
                                            />
                                            { bar }
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='hoverEffect'>
                            <h3>Hover Effect</h3>
                            <div className='effects-container'>
                                {
                                    hoverEffects.map((effect) => (
                                        <label key={ effect }
                                            onClick={ () => setSelectedEffect(effect) }
                                        >
                                            <input
                                                type='radio'
                                                name='effect'
                                                id={ effect }
                                                checked={ selectedEffect === effect }
                                            />
                                            { effect }
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </>
    );
};

export default Settings;