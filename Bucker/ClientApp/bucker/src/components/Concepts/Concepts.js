import React, { useState, useEffect } from 'react';
import Loader from '../common/Loader';
import Navbar from '../Navbar';
import StorageHelper from '../Utilities/StorageHelper';
import Fetcher from '../Utilities/Fetcher';

export default function Concepts() {
    const [isLoading, setIsLoading] = useState(true);
    const [authData] = useState(StorageHelper.getAuthData());
    const [userData] = useState(StorageHelper.getUserData());
    const [concepts, setConcepts] = useState(null);

    useEffect(() => {
        const getConcepts = async () => {
            let concepts = await Fetcher.call('GET', `concept/user/${userData.id}`);
            setConcepts(concepts);
            setIsLoading(false);
        }

        getConcepts();
    }, []);

    return (
        <div>
            <Loader isLoading={isLoading} text='Loading accounts...'/>
            <Navbar hasLogout={true} />
            <div className='concepts component'>
                Hello world,<br/> Concepts: {concepts?.length}
            </div>
        </div>
    )
}