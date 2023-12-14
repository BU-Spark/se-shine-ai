import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../../../app/dashboard/peersupport/page'

jest.mock('../../../context/AuthContext', () => ({
    // mock useAuth
    useAuth: () => ({
        user: { email: 'test@example.com' },
        authenticated: true,
    }),
}));

describe('Page', () => {
    it('renders a heading', () => {
        // check if page renders
        render(<Page />)
    })
})