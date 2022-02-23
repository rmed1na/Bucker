import React from 'react';
import './ConceptListItem.css';

export default function ConceptListItem(props) {
    return (
        <div className='conceptListItem'>
            <div className='header'>
                <h3 className='title'>{props.name}</h3>
                <p className='description'>{props.description}</p>
            </div>
        </div>
    )
}