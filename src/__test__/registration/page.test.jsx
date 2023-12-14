import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Page from '../../app/registration/page'

jest.mock("next/navigation", () => ({
    // mock router library
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

jest.mock('../../context/AuthContext', () => ({
    // mock useAuth
    useAuth: () => ({
        user: { email: 'test@example.com' },
        authenticated: true,
    }),
}));

describe('Page', () => {
    it('renders UI', () => {
        // check if page renders
        render(<Page />)
    })
})