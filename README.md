# Shine AI: A Mental Wellbeing Platform

## Project Description

Shine AI is a wellbeing and mental health tool that helps support students, working professionals, home makers, and everyone, offering expert-based mental health programs and tools focused on uplifting your mood and helping you prevent anxiety and stress. 

This is a platform for individuals who are struggling to manage their mental health because of different pressures that exist, whether it be financially, socially or professionally. The platform will consist of a set of natural therapies for their health and wellness like yoga and meditation along with counseling sessions around confidence building, social networking etc. The central purpose of the product is to break down barriers and provide accessible, effective, and personalized solutions to mental health challenges empowering individuals to proactively address their emotional well-being and develop healthy coping mechanisms.

Here is current url to the website: https://se-shine-ai.vercel.app/

## Add Users

To add yourself to the repository, open a Pull Request modifying `COLLABORATORS`, entering your GitHub username in a newline.

All Pull Requests must follow the Pull Request Template, with a title formatted like such `[Project Name]: <Descriptive Title>`

## Tech Stack

- **Framework(front/back):** Next.js (TypeScript)
- **Libraries/UI Components**
    - react-loader-spinner
    - react-toastify
    - @ramonak/react-progress-bar
    - chart.js & react-chartjs-2
- **Database:** Firebase
- **Hosting** Vercel
- **CI/CD:** GitHub Actions
- **Testing:** Jest

## MVP Features

- **Home Page:** A welcoming first point of interaction with login/sign up buttons.
- **Login Page:** Secure user authentication with email or gmail.
- **Sign Up Page:** User account creation with only email.
- **Registration Questions** Show registration question only for new users.
- **Assessment page:**  Extract 20 random questions to understand and cater to individual needs.
- **User Dashboard (Sample):** A personalized user space to navigate through various offerings like graphs.

## Extra Features Implemented

- **Navigation:** Allows to navigate within dashboard to different dashboard contents that will be built later on.
- **Auth Error Handling** Customized error handle from firebase auth to show success, error, warning.
- **UI Testing** Use Jest to do UI testing.

## Known Issues and Bugs

1. **Navigation Bar Logo:**
   - Issue: The navigation bar currently uses the same logo when an item is active.
   - Description: We have requested a design change from our design team to differentiate the logo for active navigation items, but we haven't received the updated design yet.

## Project Structure and Functionalities

### `src/` Directory
- **`firebase/`**: Contains `firebaseConfig.ts` with Firebase settings. Exports `app` and `db` for use across the project.
- **`context/`**: 
  - `AuthContext.tsx`: Manages authentication-related functionalities. It stores the Firebase JWT token in the context, making it accessible throughout the application.
  - Usage: Import using `import { useAuth } from '@/context/AuthContext';` to access `authenticated`, `user`, `emailPasswordLogin`, `googleLogin`, `logout`, and `emailPasswordSignUp`. Note: Token is lost if idle for more than 10 minutes.
- **`__test__/`**: Contains Jest test files for the application. This folder is essential for maintaining code quality and ensuring functionality works as expected.

### `components/` Directory
- **`assessment/`**: Holds components used in the assessment page.
- **`dashboard/`**: Contains components for the top and bottom navigation bars, used across all dashboard pages.

### `app/` Directory (Using Next.js App Router)
- **`(auth)/login` and `(auth)/signup`**: Implementation of login and signup functionalities.
- **`dashboard/`**: Contains code for the dashboard, including fetching user data for features like graphs.
- **`assessment/`**: Manages the assessment process, including fetching random 20 questions from a questionnaire in Firebase and saving results as `mindScore`.
- **`registration/`**: Handles fetching datasets from Firebase for registration questions and saving user-specific information.

## Project Setup

### Initial Setup

1. **Clone the Repository:**
   - Use `git clone https://github.com/BU-Spark/se-shine-ai.git` to clone the project repository from GitHub to your local machine.

2. **Navigate to the Project Directory:**
   - After cloning, use `cd se-shine-ai` to move into the project directory.

3. **Install Dependencies:**
   - Inside the project directory, run `npm install` to install all the required dependencies for your project.

### Development

1. **Start the Development Server:**
   - Run `npm run dev` to start the development server.
   - This enables you to view and test your application in real-time as you make changes.

### Build and Test in Production Mode

1. **Build the Project:**
   - Run `npm run build` to create an optimized production build of your application.

2. **Test the Build Locally:**
   - After building, run `npm start` to start the application in production mode.
   - This allows you to test the built project on your local machine before deploying it to Vercel.

### Testing

1. **Running Tests:**
   - To run the UI tests, execute `npm run test` in the project directory.
   - This will initiate the Jest testing framework to run the UI tests that have been implemented.
   - In the future, additional tests, including API tests, can be added and run using the same command.

### Deploying to Vercel

1. **Setup Vercel:**
   - If you haven't already, install the Vercel CLI by running `npm i -g vercel`.
   - Authenticate with your Vercel account by running `vercel login` and following the prompts.

2. **Deploy to Vercel (Locally):**
   - In your project directory, run `vercel` to deploy your application.
   - Follow the prompts to set up your deployment. Vercel will automatically detect that it's a Next.js project.
   - Once deployed, Vercel will provide you with a URL to view your live application.

### Deploying to Vercel with GitHub Actions

1. **Install Vercel CLI:**
   - While not required for automated deployment, you will need this to get `.vercel` folder.
   - Run `npm i -g vercel` to install it.

2. **Obtain Vercel API Key:**
   - Log in to your Vercel account and generate a new API token from the account settings.
   - This token will be used to authenticate GitHub Actions with your Vercel account.

3. **Locate Project and Org IDs:**
   - Inside your folder, run `vercel link` to create a new Vercel project
   - Inside the generated `.vercel` folder, save the `projectId` and `orgId` somewhere.

4. **Configure GitHub Repository:**
   - In your project's GitHub repository, navigate to the repository settings.
   - Go to the 'Secrets' section and add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel API token.
     - `VERCEL_PROJECT_ID`: Your project ID from Vercel.
     - `VERCEL_ORG_ID`: Your organization ID from Vercel.

5. **Set Up GitHub Actions:**
   - This is already set up, but you can refer to the [Vercel and GitHub Actions guide](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel) for detailed steps and a sample workflow file.

## Recommended Next Steps

1. **Develop Dashboard Pages:**
   - **Community Page:** A space for users to engage in group discussions, share experiences, and offer support.
   - **Learn Page:** Educational resources on mental health, self-care, and personal development.
   - **Mindfulness Page:** Guided meditations, breathing exercises, and other mindfulness activities.
   - **Peer Support Page:** A platform for users to connect one-on-one or in groups for mutual support.

2. **Assessment Metrics and API:**
   - Develop a robust metric system to evaluate assessment results. This could involve psychological scales or AI-driven analysis.
   - Host this assessment metric system on a separate server and expose it as an API. This will allow for scalability and easier integration with other platforms.

3. **Incorporate AI and Machine Learning:**
   - Utilize AI to personalize user experiences based on their interactions and preferences.
   - Implement machine learning algorithms to predict user needs and suggest relevant resources or activities.

## Comments and Insights

- **Understanding Next.js and Firebase:**
  - It’s crucial to grasp how Next.js app routing works. The routing is based on folder names and allows for flexible layouts using files like `layout.tsx`.
  - Firebase is used for authentication and cloud firestore. It's ideal for storing results and smaller datasets. However, for larger datasets, consider using a different database to optimize costs and performance.