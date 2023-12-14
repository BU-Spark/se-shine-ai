import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Page from '../../app/dashboard/page'

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

jest.mock('react-chartjs-2', () => ({
    Doughnut: () => null, // mock for Doughnut component
    PolarArea: () => null, // mock for PolarArea component
}));

describe('Page', () => {
    it('renders UI', () => {
        // check if page renders
        render(<Page />)

        // header test
        expect(screen.getByText('Shine-AI Assessments')).toBeInTheDocument();
        expect(screen.getByText('Overview')).toBeInTheDocument();

        // button test
        const button = screen.getByRole('button', { name: "Random Assessment" });
        fireEvent.click(button);
        expect(screen.getByRole('button', { name: "Let's Go!" })).toBeInTheDocument();
    })
})