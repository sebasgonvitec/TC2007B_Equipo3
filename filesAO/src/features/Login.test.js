import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import  {SessionProvider} from '../context/SessionContext';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
    cleanup();
})

describe('Login', () => {
    test('should render Login screen without crashing', () => {
        render(
        <BrowserRouter>
        <SessionProvider>
        <Login />
        </SessionProvider>
        </BrowserRouter> 
        );
    });
})