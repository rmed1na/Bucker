import React from 'react';
import './EmptySpace.css';

export default function EmptySpace(props) {
    const message = props && props.message ? props.message : '';
    const style = props && props.isVisible ? '' : 'none';

    return (
        <div className='empty-space' style={{display: style}}>
            <div>{message}</div>
        </div>
    )
}