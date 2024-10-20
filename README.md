# devLink

**devLink** is a matchmaking platform designed exclusively for developers. It functions similarly to Tinder but helps developers connect with each other for potential collaborations, networking, or mentorship.


## Features

- **Authentication**: Signup, login, and logout functionalities.
- **User Profiles**: Create and manage profiles, view other developers' profiles.
- **Connection Requests**: Send and review connection requests to find your perfect dev match.
- **User Feed**: Explore other users on the platform and connect based on your interests.
- **Pagination & Feed**: Efficiently browse profiles with paginated data.

## Tech Stack

- **Frontend**: React, Redux, Pagination
- **Backend**: Node.js (Express)
- **Database**: MongoDB

## API Endpoints

### Auth Routes (`authRouter`)
- `POST /signup` - Create a new user account.
- `POST /login` - User login.
- `POST /logout` - User logout.

### Profile Routes (`profileRouter`)
- `GET /profile/view` - View user profile.
- `PATCH /profile/edit` - Edit user profile details.
- `PATCH /profile/password` - Forgot password API for changing password.

### Connection Request Routes (`connectionRequestRouter`)
- `POST /request/send/:status/:userId` - Send a connection request.
- `POST /request/review/:status/:requestId` - Review a connection request (accept/reject).

### User Routes (`userRouter`)
- `GET /user/requests/received` - Get list of received connection requests.
- `GET /user/connections` - Get list of established connections.
- `GET /user/feed` - Get profiles of other users on the platform for potential matches.

## Status Definitions

- **ignored**: No action taken on the request.
- **interested**: User has shown interest in connecting.
- **accepted**: Connection request accepted.
- **rejected**: Connection request rejected.

