import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Loader from '../common/Loader';
import './ConceptData.css';

export default function Concept(props) {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [conceptData, setConceptData] = useState(() => getConceptDataFromLocation());

    function getConceptDataFromLocation() {
        if (location.state?.concept) {
            let concept = location.state.concept;
            console.log(concept);
            return {
                id: concept.id,
                name: concept.name,
                description: concept.description,
                creationDate: concept.creationDate,
                lastUpdate: concept.lastUpdate
            }
        }

        return {
            id: 0,
            name: '',
            description: '',
            creationDate: '',
            lastUpdate: ''
        }
    }

    const handleNameChange = (name) => setConceptData({...conceptData, name});
    const handleDescriptionChange = (description) => setConceptData({...conceptData, description});

    return (
        <div>
            <Loader isLoading={isLoading}/>
            <Navbar hasLogout={true}/>

            <div className='component conceptData'>
                <div className='header'>
                    <h1>{conceptData.name} concept details</h1>
                    <hr className='margin-top margin-bottom'/>
                </div>
                <div className='data'>
                    <div className='read'>
                        <h4>Identifier:&nbsp;{conceptData.id}</h4>
                        <h4>Creation date:&nbsp;{conceptData.creationDate}</h4>
                        <h4>Last update:&nbsp;{conceptData.lastUpdate}</h4>
                    </div>
                    <div className='write'>
                        <div className='section'>
                            <h4>Name</h4>
                            <input 
                                className='textbox' 
                                type='text'
                                value={conceptData.name}
                                onChange={e => handleNameChange(e.target.value)}
                                required>
                            </input>
                        </div>
                        <div className='section'>
                            <h4>Description</h4>
                            <input
                                className='textbox'
                                type='text'
                                value={conceptData.description}
                                onChange={e => handleDescriptionChange(e.target.value)}>
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}