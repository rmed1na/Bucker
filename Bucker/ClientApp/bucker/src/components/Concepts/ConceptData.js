import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Loader from '../common/Loader';
import Fetcher from '../Utilities/Fetcher';
import './ConceptData.css';
import ConceptListItem from './ConceptListItem';

export default function Concept(props) {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [conceptData, setConceptData] = useState(() => getConceptDataFromLocation());
    const [subConcepts, setSubConcepts] = useState(null);
    const [subConceptsList, setSubConceptsList] = useState(null);

    useEffect(() => {
        const getSubConcepts = async () => {
            let subConcepts = await Fetcher.call('GET', `concept/childs/${conceptData.id}`);
            setSubConcepts(subConcepts);            
            setIsLoading(false);
        }

        if (conceptData.id !== 0) {
            setIsLoading(true);
            getSubConcepts();
        }
    }, [conceptData]);

    useEffect(() => {
        if (subConcepts && subConcepts.length > 0) {
            setSubConceptsList(getSubConceptsList(subConcepts));
        }
    }, [subConcepts]);

    function getConceptDataFromLocation() {
        if (location.state?.concept) {
            let concept = location.state.concept;
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

    function getSubConceptsList(subConcepts) {
        return subConcepts?.map(sc => 
            <ConceptListItem
                id={sc.conceptId}
                key={sc.conceptId.toString()}
                name={sc.name}
                description={sc.description}
                creationDate={sc.createdDate}
                lastUpdate={sc.updatedDate}
         />);
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
                            <h4 className='title'>Name</h4>
                            <input 
                                className='textbox' 
                                type='text'
                                value={conceptData.name}
                                onChange={e => handleNameChange(e.target.value)}
                                required>
                            </input>
                        </div>
                        <div className='section'>
                            <h4 className='title'>Description</h4>
                            <input
                                className='textbox'
                                type='text'
                                value={conceptData.description}
                                onChange={e => handleDescriptionChange(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <h2>Sub concepts</h2>
                    <hr />
                    <div className='sub-concepts'>
                        {subConceptsList}
                    </div>
                </div>
            </div>
        </div>
    )
}