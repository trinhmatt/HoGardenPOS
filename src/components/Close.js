import React, {useEffect} from 'react';
import database from '../firebase/firebase';

//This component is used to close the tab that star passprnt
//opens after it makes completes a print job
const Close = (props) => {
    useEffect(() => {
        database.ref('printerStatus').set(true).then(() => {
            window.close()
        })
    })
    return (
        <div>

        </div>
    )
}


export default Close;