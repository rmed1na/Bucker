import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import EmptySpace from '../common/EmptySpace';
import AccountListItem from './AccountListItem'
import StorageHelper from '../Utilities/StorageHelper';
import Fetcher from '../Utilities/Fetcher';
import GlobalStatuses from '../Utilities/GlobalStatuses';
import './Accounts.css';
import Loader from '../common/Loader';
import addIcon from '../../images/add_white.png';

export default function Accounts() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(null);
    const [authData] = useState(StorageHelper.getAuthData());
    const [accountsList, setAccountsList] = useState(null);
    const [isEmptyBannerVisible, setIsEmptyBannerVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAccounts = async () => {
            let accounts = await Fetcher.call('GET', `account/user/${authData.email}`);
            setAccounts(accounts);
            setIsLoading(false);
        }

        getAccounts();
    }, []);

    useEffect(() => {
        setIsEmptyBannerVisible(!accounts || accounts.length == 0);
        setAccountsList(getAccountsList(accounts));
    }, [accounts]);

    function archiveAccount(accountId, accountName) {
        let confirmation = window.confirm('Are you sure you want to archive this account?\n\nName: ' + accountName);
        if (confirmation) {
            Fetcher.call('DELETE', `account/delete/${accountId}`).then(data => {
                let newAccounts = accounts.slice();
                newAccounts[newAccounts.findIndex(a => a.accountId == accountId)] = data;
                setAccounts(newAccounts);
            });
            
        }
    }

    function restoreAccount(accountId, accountName) {
        let confirmation = window.confirm('Are you sure you want to restore this account?\n\nName: ' + accountName);
        if (confirmation) {
            Fetcher.call('PUT', `account/restore/${accountId}`).then(data => {
                let newAccounts = accounts.slice();
                newAccounts[newAccounts.findIndex(a => a.accountId == accountId)] = data;
                setAccounts(newAccounts);
            });
        }
    }

    function getAccountsList(accounts) {
        return accounts?.map((account) =>
            <AccountListItem
                id={account.accountId}
                key={account.accountId.toString()}
                name={account.name}
                description={account.description}
                creationDate={account.createdDate}
                updatedDate={account.updatedDate}
                isActive={account.statusCode == GlobalStatuses.Active}
                setInactive={() => archiveAccount(account.accountId, account.name)}
                setActive={() => restoreAccount(account.accountId, account.name)}
            />
        );
    }

    return (
        <div>
            <Loader isLoading={isLoading} text='Loading accounts...' />
            <Navbar hasLogout={true} />
            <div className='accounts'>
                <div className='header'>
                    <h1>Accounts</h1>
                    <button id='addAccount' className='button grey' onClick={() => navigate('/account')}>
                        <img src={addIcon} />
                        <span>Add</span>
                    </button>
                </div>
                <hr className='margin-top margin-bottom' />

                <EmptySpace
                    message={[<p key='text'>Seems like you don't have any accounts yet</p>, <p key='link'>Click <a className='styled' href='#'>here</a> to create your first account</p>]}
                    isVisible={isEmptyBannerVisible}
                />

                <div className='list'>
                    {accountsList}
                </div>
            </div>
        </div>
    )
}