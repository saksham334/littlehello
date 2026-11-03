# 🌸 LittleHello

**Small hellos. Real friendships.**

LittleHello is a cozy, low-pressure friendship website for introverted, shy and socially anxious adults, and anyone who wants to make platonic friends at their own pace.

No likes, no follower counts, no streaks, no read receipts, no pressure.

> 🚧 **Work in progress.** This is a learning and portfolio project, built milestone by milestone.

## Tech stack

- **Frontend:** React, Vite, React Router, Bootstrap 5, Bootstrap Icons, custom CSS
- **Backend:** Node.js, Express
- **Database (coming soon):** MongoDB with Mongoose

## Progress

- [x] Express API skeleton with health check
- [x] React + Vite frontend connected through a dev proxy
- [x] Pastel design system: tokens, doodles, logo, chips, avatars, profile cards, `/styleguide`
- [ ] Landing page
- [ ] Database, registration and login
- [ ] Onboarding and profiles
- [ ] Discover, introductions and messaging
- [ ] Safety tools, testing and deployment

## Run it locally

You need [Node.js](https://nodejs.org) (LTS) installed.

    # Terminal 1 – API (http://localhost:4000)
    cd server
    npm install
    copy .env.example .env
    npm run dev

    # Terminal 2 – website (http://localhost:5173)
    cd client
    npm install
    npm run dev

## Note on demo data

Any profiles shown during development are clearly labeled **demo** and are not real people.