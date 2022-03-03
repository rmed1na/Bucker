import './Concepts.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import Navbar from '../Navbar';
import EmptySpace from '../common/EmptySpace';
import StorageHelper from '../Utilities/StorageHelper';
import Fetcher from '../Utilities/Fetcher';
import Icons from '../common/Icons';
import ConceptListItem from './ConceptListItem';

export default function Concepts() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userData] = useState(StorageHelper.getUserData());
    const [parentConcepts, setParentConcepts] = useState(null);
    const [isEmptyBannerVisible, setIsEmptyBannerVisible] = useState(false);
    const [conceptsList, setConceptsList] = useState(null);

    useEffect(() => {
        const getConcepts = async () => {
            let concepts = await Fetcher.call('GET', `concept/user/${userData.id}/?onlyParents=true`);
            setParentConcepts(concepts);
            setIsLoading(false);
        }

        getConcepts();
    }, []);

    useEffect(() => {
        setIsEmptyBannerVisible(!parentConcepts || parentConcepts.length == 0);
        setConceptsList(getConceptsList(parentConcepts));
    }, [parentConcepts]);

    function getConceptsList(concepts) {
        return concepts?.map((concept) => 
         <ConceptListItem
            id={concept.conceptId}
            key={concept.conceptId.toString()}
            name={concept.name}
            description={concept.description}
            creationDate={concept.createdDate}
            lastUpdate={concept.updatedDate}
         />
        );
    }

    return (
        <div>
            <Loader isLoading={isLoading} text='Loading accounts...'/>
            <Navbar hasLogout={true} />
            <div className='concepts component'>
                <div className='header'>
                    <h1>Concepts</h1>
                    <button id='addConcept' className='button grey' onClick={() => navigate('/concept/0')}>
                        <img src={Icons.addWhite}/>
                        <span>Add</span>
                    </button>
                </div>
                <hr className='margin-top margin-bottom'/>
                
                <EmptySpace
                    message={[<p key='text'>Seems like you don't have any concepts yet</p>,
                              <p key='link'>Click <a className='styled' href='#'>here</a> to create your first concept</p>]}
                    isVisible={isEmptyBannerVisible}
                />

                <div className='list'>
                    {conceptsList}
                </div>
            </div>
        </div>
    )
}