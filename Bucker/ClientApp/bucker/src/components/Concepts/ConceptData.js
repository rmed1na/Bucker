import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Loader from '../common/Loader';
import Fetcher from '../Utilities/Fetcher';
import './ConceptData.css';
import ConceptListItem from './ConceptListItem';

export default function ConceptData() {
    const navigate = useNavigate();
    const { id } = useParams() || 0;
    const [conceptId, setConceptId] = useState(id);
    const emptyConcept = { id: 0, name: null, description: null, creationDate: null, lastUpdate: null }
    const [isCreateView] = useState(id == 0);
    const [isLoading, setIsLoading] = useState(!isCreateView);
    const [conceptData, setConceptData] = useState(emptyConcept);
    const [subConcepts, setSubConcepts] = useState(null);
    const [subConceptsList, setSubConceptsList] = useState(null);

    // If URL param changes (id) state needs to be updated and page refreshed
    if (id !== conceptId) {
        setConceptId(id);
    }

    useEffect(() => {
        getSetConceptData();
    }, []);

    useEffect(() => {
        if (subConcepts) {
            setSubConceptsList(getSubConceptsList(subConcepts));
        }
    }, [subConcepts]);

    useEffect(() => {
        getSetConceptData();
    }, [conceptId]);

    function getSetConceptData() {
        const getSetSubConcepts = async (parentConceptId) => {
            let subConcepts = await Fetcher.call('GET', `concept/${parentConceptId}/childs`);
            setSubConcepts(subConcepts);
            setIsLoading(false);
        }

        if (!isCreateView) {
            setIsLoading(true);
            Fetcher.call('GET', `concept/${conceptId}`)
            .then(data => {
                    if (data) {
                        setConceptData({
                            id: data.conceptId,
                            name: data.name,
                            description: data.description,
                            creationDate: data.createdDate,
                            lastUpdate: data.updatedDate
                        });

                        getSetSubConcepts(data.conceptId);
                    }
                    setIsLoading(false);
            });
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

    function updateConceptDetails() {
        setIsLoading(true);
        Fetcher.call('PUT', 'concept/update', {
            id: conceptData.id,
            name: conceptData.name,
            description: conceptData.description
        }).then(data => {
            setConceptData({
                id: data.conceptId,
                name: data.name,
                description: data.description,
                creationDate: data.createdDate,
                lastUpdate: data.updatedDate
            });
            setIsLoading(false);
        });
    }

    const handleNameChange = (name) => setConceptData({ ...conceptData, name });
    const handleDescriptionChange = (description) => setConceptData({ ...conceptData, description });

    if (isLoading) {
        return <Loader isLoading={isLoading} text='Loading concept...' />;
    }

    return (
        <div>
            <Navbar hasLogout={true} />

            <div className='component conceptData'>
                <div className='header'>
                    <h1>{isCreateView ? 'New' : conceptData.name} concept details</h1>
                    <hr className='margin-top margin-bottom' />
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
                                id='description'
                                className='textbox'
                                type='text'
                                value={conceptData.description}
                                onChange={e => handleDescriptionChange(e.target.value)}>
                            </input>
                        </div>
                        <div className='section actions'>
                            {isCreateView && <button className='button yellow'>Create concept</button>}
                            {!isCreateView && <button className='button green' onClick={() => updateConceptDetails()}>Update concept details</button>}
                            <button className='button red' onClick={() => navigate('/concepts')}>Go back</button>
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