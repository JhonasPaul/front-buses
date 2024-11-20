import React from 'react';
import BusLista from './components/BusLista';
import {Routes, Route} from "react-router-dom";
import BusDetalle from "./components/BusDetalle";


const App: React.FC = () => {
    return (

        <Routes>
            <Route path="/" element={<BusLista/>}/>

            <Route path="/bus/:id" element={<BusDetalle/>}/>
        </Routes>

    );
};

export default App;
