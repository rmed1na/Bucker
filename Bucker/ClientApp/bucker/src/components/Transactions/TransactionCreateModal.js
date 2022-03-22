import React, { useState, useEffect } from 'react';
import Fetcher from '../Utilities/Fetcher';
import StorageHelper from '../Utilities/StorageHelper';
import Loader from '../common/Loader';
import Icons from '../common/Icons';
import './TransactionCreateModal.css';

export default function TransactionCreateModal(props) {
    const isVisible = props && props.isVisible == true;
    const displayStyle = isVisible ? '' : 'none';
    const steps = [
        { number: 1, name: 'account' },
        { number: 2, name: 'concept' },
        { number: 3, name: 'amount' }
    ];
    const [currentStep, setCurrentStep] = useState(steps[0]);
    const [accounts, setAccounts] = useState([]);
    const [concepts, setConcepts] = useState([]);
    const [visibleAccounts, setVisibleAccounts] = useState([]);
    const [visibleConcepts, setVisibleConcepts] = useState([]);
    const [userData] = useState(StorageHelper.getUserData());
    const [isLoading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState({
        accountId: 0,
        conceptId: 0,
        amount: 0,
        effectiveDate: null
    });

    useEffect(() => {
        setIsLoading(true);
        Fetcher.call('GET', `account/user/${userData.email}`)
            .then(data => {
                setAccounts(data);
                setVisibleAccounts(data);
            });

        Fetcher.call('GET', `concept/user/${userData.id}`)
            .then(data => {
                data.map(concept => concept.visible = true);
                setConcepts(data);
                setVisibleConcepts(data.filter(c => c.parentConceptId == null));
                setIsLoading(false);
            });
    }, []);

    function getAccountsList(accounts) {
        return accounts.map(account => {
            return <div
                key={account.accountId.toString()}
                className='item account-item'
                onClick={() => handleAccountClick(account.accountId)}>
                <h4>{account.name}</h4>
                <p>{account.description}</p>
                <hr />
            </div>;
        })
    }

    function getConceptsList(concepts) {
        return concepts.map(concept => {
            let display = concept.visible == true ? '' : 'none';
            return <div
                style={{ display: display }}
                key={concept.conceptId.toString()}
                className={`item concept-item`}
                onClick={() => handleConceptClick(concept.conceptId)}>
                <p>{concept.name}</p>
            </div>
        })
    }

    const handleAccountSearch = (text) => setVisibleAccounts(accounts.filter(a => a.name.includes(text)));
    const handleConceptSearch = (text) => {
        let unfiltered = visibleConcepts;
        let filtered = visibleConcepts.filter(c => c.name.includes(text));

        unfiltered.map(i => {
            i.visible = filtered.some(f => f.conceptId == i.conceptId) ? true : false;
        });

        setVisibleConcepts([...unfiltered]);
    }

    function handleAccountClick(accountId) {
        setTransactionData({ ...transactionData, accountId: accountId });
        setCurrentStep(steps[currentStep.number]);
    }

    function handleConceptClick(conceptId) {
        let subconcepts = concepts.filter(c => c.parentConceptId == conceptId);

        if (subconcepts && subconcepts.length > 0) {
            setVisibleConcepts(subconcepts);
        } else {
            setTransactionData({ ...transactionData, conceptId: conceptId });
            setCurrentStep(steps[currentStep.number]);
        }
    }

    function handleAmountDoneClick() {

    }

    function handleCloseBtnClick() {
        setCurrentStep(steps[0]);
        setTransactionData({});
        props.setIsVisible(false);
    }
    console.log(transactionData);
    switch (currentStep.number) {
        case 1:
            return (
                <div>
                    <Loader isLoading={isLoading} text='Loading...' />
                    <div className='modal newTransaction' style={{ display: displayStyle }}>
                        <div className='content'>
                            <div className='header'>
                                <div className='title'>
                                    <h2>New transaction</h2>
                                    <button className='close-btn' onClick={() => handleCloseBtnClick()}>
                                        <img src={Icons.closeWhite} />
                                    </button>
                                </div>
                                <h4>Select an account</h4>
                            </div>
                            <hr />
                            <div className='search-bar'>
                                <img src={Icons.searchWhite} />
                                <input
                                    type='text'
                                    className='textbox'
                                    placeholder='Search an account by name'
                                    onChange={(e) => handleAccountSearch(e.target.value)}
                                />
                            </div>
                            <div className='info-bar'>
                                <p>{visibleAccounts.length} accounts found</p>
                            </div>
                            <div className='list'>
                                {getAccountsList(visibleAccounts)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div>
                    <div className='modal newTransaction' style={{ display: displayStyle }}>
                        <div className='content'>
                            <div className='header'>
                                <div className='title'>
                                    <h2>New transaction</h2>
                                    <button className='close-btn' onClick={() => handleCloseBtnClick()}>
                                        <img src={Icons.closeWhite} />
                                    </button>
                                </div>
                                <h4>Select a concept</h4>
                            </div>
                            <hr />
                            <div className='search-bar'>
                                <img src={Icons.searchWhite} />
                                <input
                                    type='text'
                                    className='textbox'
                                    placeholder='Search a concept by name'
                                    onChange={(e) => handleConceptSearch(e.target.value)}
                                />
                            </div>
                            <div className='info-bar'>
                                <p>{visibleConcepts.length} concepts found</p>
                            </div>
                            <div className='list'>
                                {getConceptsList(visibleConcepts)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div>
                    <div className='modal newTransaction' style={{ display: displayStyle }}>
                        <div className='content'>
                            <div className='header'>
                                <div className='title'>
                                    <h2>New transaction</h2>
                                    <button className='close-btn' onClick={() => handleCloseBtnClick()}>
                                        <img src={Icons.closeWhite} />
                                    </button>
                                </div>
                                <h4>Enter the amount</h4>
                            </div>
                            <hr />
                            <div className='input-box'>
                                <h4 className='title'>Amount</h4>
                                <input type='number' className='textbox' placeholder={0} value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} />
                                <button className='button' onClick={() => handleAmountDoneClick()}>
                                    <img src={Icons.checkmarkWhite} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>);
        default:
            console.warn('Out of scope step');
    }
}