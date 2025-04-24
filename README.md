# Social Network API – Aeralyn Neff

## Description
This is a backend API for a social network web application built with Express.js, MongoDB, and Mongoose. It enables users to share thoughts, react to others' thoughts, and manage a list of friends. This application is tested using Insomnia and supports full CRUD operations for users, thoughts, friends, and reactions.

---

## Features

### API Functionality
- Full CRUD operations for Users and Thoughts
- Ability to add and remove friends from a user's friend list
- Ability to add and delete reactions to thoughts
- Uses Mongoose models with virtuals and getters for extra functionality

### Schema Design
- User Model: includes username, email, thoughts, and friends
- Thought Model: includes thought text, timestamp, author, and reactions
- Reaction Schema: subdocument for thoughts with reaction text, author, and timestamp

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript (ES6+)
- (Optional) Native JS Date or Moment.js for timestamp formatting

---

## User Story

# AS A social media startup
# I WANT an API for my social network that uses a NoSQL database
# SO THAT my website can handle large amounts of unstructured data

---

## Acceptance Criteria

### Server & Models
- When the app is run, the server starts and models sync with MongoDB

### GET Routes
- GET all users and thoughts
- GET a single user or thought by ID
- Includes populated friend and reaction data

### POST / PUT / DELETE
- Users and thoughts can be created, updated, and deleted
- Reactions can be added and removed from thoughts
- Friends can be added and removed from a user’s friend list
- Bonus: When a user is deleted, their associated thoughts are also removed

---

## Insomnia Testing

### Users
# GET /api/users
# GET /api/users/:id
# POST /api/users
# PUT /api/users/:id
# DELETE /api/users/:id

### Friends
# POST /api/users/:userId/friends/:friendId
# DELETE /api/users/:userId/friends/:friendId

### Thoughts
# GET /api/thoughts
# GET /api/thoughts/:id
# POST /api/thoughts
# PUT /api/thoughts/:id
# DELETE /api/thoughts/:id

### Reactions
# POST /api/thoughts/:thoughtId/reactions
# DELETE /api/thoughts/:thoughtId/reactions/:reactionId

---

## Models Overview

### User
username: { type: String, unique: true, required: true, trim: true }, email: { type: String, required: true, unique: true, match: [/.+@.+..+/, 'Must match a valid email address'] }, thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }], friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]

### Thought
thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 }, createdAt: { type: Date, default: Date.now, get: timestamp => // format timestamp }, username: { type: String, required: true }, reactions: [reactionSchema]


### Reaction (Schema Only)
reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() }, reactionBody: { type: String, required: true, maxlength: 280 }, username: { type: String, required: true }, createdAt: { type: Date, default: Date.now, get: timestamp => // format timestamp }


## Installation

### 1. Clone the Repository
git clone https://github.com/aaeralynn/social-network-api.git cd social-network-api

### 2. Install Dependencies
npm install

### 3. Start the Server
npm run start

### Walkthrough Video
https://youtu.be/H3sxXFuIWus
