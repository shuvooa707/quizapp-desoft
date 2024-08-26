import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";

import './index.css';
import './custom.css';

import store from "./stores/store.jsx";
import {Provider} from "react-redux";
import router from "./routes/index.jsx";
import LoadAuthFromLocalStorage from "./components/LoadAuthFromLocalStorage.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <LoadAuthFromLocalStorage>
                <RouterProvider router={router}/>
            </LoadAuthFromLocalStorage>
        </Provider>
    </StrictMode>,
)
