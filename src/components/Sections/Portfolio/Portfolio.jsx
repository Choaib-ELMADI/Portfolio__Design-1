import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { BsChevronLeft, BsChevronRight, BsInfoCircle } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';

import './Portfolio.css';
import { projects } from '../../../data';



const Portfolio = () => {
    const [vueGallery, setVueGallery] = useState(false);
    const [vueDetails, setVueDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [index, setIndex] = useState(0);

    const handleProjectClicked = (project) => {
        setVueGallery(true);
        setSelectedProject(project);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const handleIndex = (index, amount) => {
        setIndex(index => index += amount);
    };
        
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className='app__portfolio app__section section-wrapper' id='portfolio'>
            <h3 data-aos="fade-up">Portfolio</h3>
            <p className='first' data-aos="fade-up">
                Selected Work
            </p>
            <div className='bar' data-aos="fade-up" />
            <p className='second' data-aos="fade-up">
                Lorem ipsum dolor sit amet, consectetur.
                adipiscing elit. Aenean et elementum purus.
            </p>
            <div className='app__portfolio-projects'>
                {
                    projects.map((project, i) => (
                        <div 
                            key={ `project-${ i+1 }` } 
                            className='app__projects-item'
                            data-aos="fade-up"
                            onClick={ () => handleProjectClicked(project) }
                        >
                            <LazyLoadImage
                                src={ project.background } 
                                effect="blur"
                                alt={ `project-${ i+1 }` }
                                key={ `portf-project-${ i+1 }` }
                                placeholderSrc={ project.background }
                            />
                            <div className='project-title'>
                                <h2>{ project.title }</h2>
                                <label><AiOutlineArrowRight size={ 18 } /></label>
                            </div>
                        </div>  
                    ))
                }
            </div>
            {
                vueGallery &&
                <motion.div
                    className='app__project-gallery'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: "linear",
                        delay: .2,
                        duration: .5,
                    }}
                >
                    <div className='app__project-gallery-left-controls'>
                        <label 
                            onClick={ () => {
                                setVueGallery(false);
                                setLoading(false);
                            }}
                            className='gallery-icon'
                        >
                            <IoClose size={ 30 } />
                        </label>
                        <button 
                            onClick={ (index) => handleIndex(index, -1) }
                            className='gallery-icon'
                            style={{
                                background: 'transparent',
                                color: '#e4e4e4',
                                border: '0',
                                outline: 'none'
                            }}
                            disabled={ index <= 0 }
                        >
                            <BsChevronLeft size={ 30 } />
                        </button>
                        <label />
                    </div>
                    <div className='images-container-wrapper'>
                        <div className='images-container'>
                            <div className={ loading ? 'loading-images active' : 'loading-images'} />
                            <div className={ loading ? 'image' : 'image active'}>
                                <LazyLoadImage
                                    src={ selectedProject.pictures[index] } 
                                    effect="blur"
                                    alt={ `selected-project-${ index }`}
                                    key={ `selected-project-${ index }`}
                                    placeholderSrc={ selectedProject.pictures[index] }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='app__project-gallery-right-controls'>
                        <label 
                            onClick={ () => setVueDetails(!vueDetails) }
                            className='app__gallery-toggle-details gallery-icon'
                            style={{ zIndex: 999 }}
                        >
                            <BsInfoCircle size={ 28 } />
                        </label>
                        <button 
                            onClick={ (index) => handleIndex(index, 1) }
                            className='gallery-icon'
                            style={{
                                background: 'transparent',
                                color: '#e4e4e4',
                                border: '0',
                                outline: 'none'
                            }}
                            disabled={ index >= selectedProject.pictures.length-1 }
                        >
                            <BsChevronRight size={ 30 } />
                        </button>
                        <label />
                    </div>
                    <div className={ vueDetails ? 'app__project-gallery-details active' : 'app__project-gallery-details' }>
                        <div className='gallery-details-content'>
                            <h1>{ selectedProject.detailsTitle }</h1>
                            <p>{ selectedProject.detailsDesc }</p>
                        </div>
                    </div>
                </motion.div>
            }
        </div>
    );
};

export default Portfolio;