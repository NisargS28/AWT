# React Login with Appwrite

A simple and elegant login page built with React JS and Appwrite for authentication.

## Features

- User Authentication (Login & Signup)
- Email-based registration
- Secure password validation
- User Dashboard after login
- Session management
- Responsive UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Appwrite account (https://appwrite.io)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Appwrite

#### Option A: Using Appwrite Cloud (Recommended for beginners)

1. Go to [Appwrite Cloud](https://cloud.appwrite.io)
2. Sign up for a free account
3. Create a new project
4. Copy your **Project ID**

#### Option B: Self-Hosted Appwrite

1. Follow the [Appwrite Self-Hosted Setup Guide](https://appwrite.io/docs/installation)
2. Note your Appwrite endpoint URL

### 3. Configure Appwrite Credentials

Open `src/config/appwrite.js` and replace:

```javascript
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint if self-hosted
  .setProject("YOUR_PROJECT_ID"); // Replace with your actual Project ID
```

**Example:**

```javascript
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6702e4c2003c1234567890ab");
```

### 4. Run the Application

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:3000`

## Project Structure

```
react_login/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login form component
│   │   ├── Signup.jsx         # Signup form component
│   │   ├── Dashboard.jsx      # User dashboard
│   │   ├── Auth.css           # Auth components styling
│   │   └── Dashboard.css      # Dashboard styling
│   ├── config/
│   │   └── appwrite.js        # Appwrite configuration
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styling
│   ├── index.css              # Global styles
│   └── main.jsx               # React entry point
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

## Usage

### 1. Sign Up

- Click "Sign up" link
- Enter your name, email, and password (min 8 characters)
- Passwords must match
- Click "Sign Up"

### 2. Login

- Enter your registered email
- Enter your password
- Click "Login"

### 3. Dashboard

- View your profile information
- Click "Logout" to end your session

## Key Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Appwrite** - Backend authentication & database
- **CSS3** - Styling

## Environment Variables

Create a `.env` file in the root directory (optional):

```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
```

Then update `src/config/appwrite.js` to use these variables:

```javascript
client
  .setEndpoint(
    import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  )
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## Troubleshooting

### Issue: "Invalid Project ID" Error

- Make sure you've replaced `YOUR_PROJECT_ID` in `src/config/appwrite.js`
- Verify the Project ID from your Appwrite console

### Issue: CORS Errors

- Make sure Appwrite is properly configured
- For Appwrite Cloud, CORS should be handled automatically
- For self-hosted Appwrite, ensure Web platform is added to your project

### Issue: "Unauthorized" on Login

- Verify your credentials are correct
- Check that the user account exists
- Password must match exactly

## Password Requirements

- Minimum 8 characters
- Can contain any characters

## Security Notes

- Passwords are hashed by Appwrite
- Sessions are managed by Appwrite
- This is a client-side app - for production, implement proper security headers

## Future Enhancements

- Add password reset functionality
- Implement email verification
- Add social login (Google, GitHub, etc.)
- Add user profile editing
- Add forgot password feature
- Implement remember me functionality

## Support

For issues with Appwrite, visit [Appwrite Documentation](https://appwrite.io/docs)

## License

This project is open source and available under the MIT License.
