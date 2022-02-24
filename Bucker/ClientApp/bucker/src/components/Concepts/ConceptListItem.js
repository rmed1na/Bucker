import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConceptListItem.css';

export default function ConceptListItem(props) {
    const navigate = useNavigate();
    
    function onItemClick() {
        navigate('/concept', { state: {
            concept: {
                id: props.id,
                name: props.name,
                description: props.description,
                creationDate: props.creationDate,
                lastUpdate: props.lastUpdate
            }
        }})
    }

    return (
        <div className='conceptListItem' onClick={() => onItemClick()}>
            <div className='header'>
                <h4 className='title'>{props.name}</h4>
                <p className='description'>{props.description}</p>
            </div>
        </div>
    )
}