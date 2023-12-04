import Image from 'next/image';
import './AssessmentNavBar.css';

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