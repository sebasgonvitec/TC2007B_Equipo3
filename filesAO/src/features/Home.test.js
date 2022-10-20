import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SessionContext from '../context/SessionContext';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
    cleanup();
})

describe('Home', () => {
    test('should render Home screen without crashing', () => {
        render(
        <BrowserRouter>
        <SessionContext.Provider value={{session: {user: {name: 'Gina', role: 'admin'}}}}>
        <Home />
        </SessionContext.Provider>
        </BrowserRouter> 
        );
    });
})