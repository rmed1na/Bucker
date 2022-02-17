import React from 'react';
import { useNavigate } from 'react-router-dom';
import updateIcon from '../../images/update.png';
import deleteIcon from '../../images/delete.png';
import restoreWhiteIcon from '../../images/restore_white.png';
import './AccountListItem.css';

export default function AccountListItem(props) {
    const navigate = useNavigate();

    function onUpdateClick() {
        navigate('/account', { state: {
            account: {
                id: props.id,
                name: props.name,
                description: props.description,
                creationDate: props.creationDate,
                updatedDate: props.updatedDate
            }
        }});
    }
    
    return (
        <div className={`accountListItem ${!props.isActive ? 'inactive' : ''}`}>
                <div className='text'>
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                </div>
                <div className='actions'>
                    {props.isActive && 
                    <button onClick={onUpdateClick}>
                        <img src={updateIcon} alt='Update account'/>
                    </button>}

                    {props.isActive &&
                    <button onClick={props.setInactive}>
                        <img src={deleteIcon} alt='Delete account'/>
                    </button>}

                    {!props.isActive &&
                    <button id='restoreAccount' onClick={props.setActive}>
                        <img src={restoreWhiteIcon} alt='Restore account'/>
                    </button>}
                </div>
        </div>
    )
}