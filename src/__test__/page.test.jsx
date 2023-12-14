import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

jest.mock("next/navigation", () => ({
    // mock router library
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Page', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });
    it('renders UI', () => {
        // set the item in sessionStorage
        sessionStorage.setItem("accountCreated", "true");

        // check if page renders
        render(<Page />)

        // check for images
        expect(screen.getByAltText('shine-ai-main')).toBeInTheDocument();
        expect(screen.getByAltText('shine-ai-robot')).toBeInTheDocument();

        // check for buttons
        expect(screen.getByText('Already a Friend? Login')).toBeInTheDocument();
        expect(screen.getByText("Let’s Register our Friendship")).toBeInTheDocument();
    })
})