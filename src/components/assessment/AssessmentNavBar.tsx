import Image from 'next/image';
import './AssessmentNavBar.css';

/**
 * The AssessmentNavBar component.
 * The Shine.AI logo bar above the assessment.
 * 
 * Provides users a way to exit the assessment and return to
 * dashboard without completing all quesitons by clicking on 
 * the logo.
 */
export default function AssessmentNavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/">
                    <Image 
                        src="/main-logo-dark.svg"
                        alt="shine-ai"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        className="main-logo-dark"
                    />
                </a>
            </div>
        </nav>
    );
}