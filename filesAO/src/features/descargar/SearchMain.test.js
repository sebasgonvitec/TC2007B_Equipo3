import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SessionContext from '../../context/SessionContext';
import { DownloadProvider } from '../../context/DownloadContext';
import SearchMain from './SearchMain';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
    cleanup();
})

describe('SearchMain', () => {
    test('should render SearchMain screen without crashing', () => {
        render(
        <BrowserRouter>
        <SessionContext.Provider value={{session: {user: {name: 'Gina', role: 'admin'}}}}>
        <DownloadProvider>
        <SearchMain />
        </DownloadProvider>
        </SessionContext.Provider>
        </BrowserRouter> 
        );
    });
})