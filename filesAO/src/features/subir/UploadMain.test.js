import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SessionContext from '../../context/SessionContext';
import UploadContext, { UploadProvider } from '../../context/UploadContext';
import UploadMain from './UploadMain';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
    cleanup();
})

describe('UploadMain', () => {
    test('should render UploadMain screen without crashing', () => {
        render(
        <BrowserRouter>
        <SessionContext.Provider value={{session: {user: {name: 'Gina', role: 'admin'}}}}>
        <UploadProvider>
        <UploadMain />
        </UploadProvider>
        </SessionContext.Provider>
        </BrowserRouter> 
        );
    });
})