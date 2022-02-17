import React from 'react';
import './Loader.css';

export default function Loader(props) {
    const loaderStyle = props && props.isLoading == true ? '' : 'none';
    const textStyle = props && props.text && props.text.length > 0 ? '' : 'none';

    return (
        <div style={{display: loaderStyle}} className='loader'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            <div className='text'>
                <span style={{display: textStyle}}>{props.text}</span>
            </div>
        </div>
    )
}