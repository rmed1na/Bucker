import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConceptListItem.css';

export default function ConceptListItem(props) {
    const navigate = useNavigate();

    function onItemClick() {
        navigate(`/concept/${props.id}`);
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