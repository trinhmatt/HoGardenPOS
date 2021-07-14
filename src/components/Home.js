import React, { useState } from "react";
import database from "../firebase/firebase";

const Home = () => {
    const [state, setState] = useState({});
    
    const test = () => {
        database.ref("menu").update({test: "hi"})
    }
    return (
        <div>
            homepage
            <button onClick={test}>test</button>
        </div>
    )
}

export default Home;