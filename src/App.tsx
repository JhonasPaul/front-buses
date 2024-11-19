import React from 'react';
import BusList from './components/BusList';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BusDetail from "./components/BusDetail";

const App: React.FC = () => {
    return (


            <Routes>


                    <Route path="/" element={<BusList/>}/>

                    <Route path="/bus/:id" element={<BusDetail/>}/>

            </Routes>

    );
};

export default App;
/*<h1>Bus Listing App</h1>
        <BusList />*/