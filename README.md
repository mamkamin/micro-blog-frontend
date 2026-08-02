# Micro Blog Frontend

![Educational Purposes](https://img.shields.io/badge/Purpose-Educational-blue)

A Next.js frontend for the Micro Blog REST API, a micro-blogging application inspired by Threads and X/Twitter.

## Prerequisites

- Node.js 18 or later
- A running [Micro Blog REST API](https://github.com/mamkamin/micro-blog-rest-api)

## Setup

1. Install the project dependencies:

   ```sh
   pnpm install
   ```

2. Start the Micro Blog REST API on `http://localhost:3000`.

   The frontend expects the API routes documented in the backend project, including authentication cookies and the users and posts endpoints.

3. Start the frontend development server:

   ```sh
   pnpm dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Running Locally

Start the frontend in development mode:

```sh
pnpm dev
```

Create a production build:

```sh
pnpm build
```

Run the production server:

```sh
pnpm start
```

The application listens on `http://localhost:8080`.

## Pages

| Route | Description |
| --- | --- |
| `/` | View the latest-post feed and create a post |
| `/login` | Log in with an email address or username and password |
| `/register` | Create an account |
| `/profile` | View and update the authenticated account |

Authentication is handled by the API's `access_token` HTTP-only cookie. The frontend sends credentials with browser requests and forwards the cookie for server-rendered authenticated requests.

## Features

### Implemented

- [x] View the latest posts feed
- [x] Register a user
- [x] Log in and log out with cookie-based JWT authentication
- [x] Create posts
- [x] Edit and delete owned posts
- [x] View and update the authenticated profile
- [x] Responsive Next.js interface styled with Tailwind CSS

### Planned

- [ ] User profile pages and user-specific post feeds
- [ ] Follow and unfollow users
- [ ] Followers and following lists
- [ ] A feed containing posts from followed users
- [ ] Post likes and replies
- [ ] Automated test suite

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server on port 8080 |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Start the production server on port 8080 |
| `pnpm lint` | Run ESLint |
