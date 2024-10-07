# BidSphere

BidSphere is a full-stack web application designed to function as an online marketplace, allowing users to post jobs, place bids, and manage project statuses efficiently.

## Features
- **Responsive UI**: Built using React, Tailwind CSS, and Daisy UI for a modern and visually appealing user experience.
- **User Authentication**: Secure login and registration with JWT, storing tokens using cookie-parser for secure sessions.
- **Captcha Protection**: Integrated React Captcha to enhance security against bot traffic.
- **Real-time Notifications**: Hot Toast for user feedback on actions like job posting, bid placement, and status updates.
- **Dynamic Job Posting & Bidding**: Users can browse and bid on jobs across various categories like web development, digital marketing, and graphics design.

## Key Pages & Functionality
1. **Home Page**: Browse jobs by categories, view featured listings.
2. **Job Details**: Detailed view of a job with an option to place bids (excluding job owners).
3. **Add Jobs**: Employers can post jobs with details like title, price range, and category.
4. **My Posted Jobs**: Manage your jobs with update and delete options.
5. **My Bids**: Track your bids and their statuses, including "Pending," "Rejected," and "In Progress."
6. **Bid Requests**: Employers can view and manage bids on their jobs, accepting or rejecting them.

## Technologies Used
- **Frontend**: React, Tailwind CSS, Daisy UI, React Icons, Hot Toast
- **Backend**: JWT for authentication, MongoDB for data storage and Node.js
- **Security**: React Captcha, JWT tokens in cookies

## Links
- **Webpage**:https://bidsphere-eef0f.web.app
- **Server**:https://bid-sphere-server.vercel.app
