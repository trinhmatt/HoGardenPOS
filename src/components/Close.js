import React, {useEffect} from 'react';

//This component is used to close the tab that star passprnt
//opens after it makes completes a print job
const Close = () => {
    useEffect(() => {
        window.close();
    }, [])
    return (
        <div>

        </div>
    )
}

export default Close;