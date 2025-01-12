# Reflection for Layla Project

## Overview

In this project, I developed a modern web application utilizing the latest React 19, React Query, Tailwind CSS, and Material-UI (MUI) libraries, applyed response layout. The app integrates seamlessly with the Discogs API, providing users with a rich and interactive platform to explore their favorite music through various criteria. This APP been deployed on Netlify, which ensures a fast and seamless experience for users worldwide.

Key features include:

Music Exploration:

- Users can search and discover music by genre, artist, album, and more.
  Favorite Artist Management:
- The app allows users to add their favorite artists to a personalized list for easy access.
  Artist Information:
- Users can browse artist profiles and be directed to their official websites for further exploration.
  Global access:
- Deployed through Netlify, ensuring fast load times and a global reach through its CDN.
  Responsive layout:
- Easy accessable for multiple device user

## Page feature

- home page

  - Show website Name
  - Filter section:
    - A collapsible left drawer provides a clean and intuitive UI for adding filters like Country, Year, and Genre.
    - Display active filters visually using clickable chips for easy management.
  - Album Cards:
    - Present albums in an organized card layout, showcasing key details such as cover image, artist, genre, country, year, and simple analytics for quick insights
    - Include a favorite button to allow users to bookmark album as favorites.
    - Provide Artist links to navigate directly to artist's Page for deeper exploration
  - Pagination to enable smooth navigation to explore more albums
  - loading spinner while data is being fetched, for seamless user experience.
  - API cashing and layzing loading

- Artist Page

  - breadcrums navigation UI design
  - Artist Release Cards:
    - Showing Artist's released Album title, date, cover image
    - Showing Artist public profile link for richer content.
    - Aggresively loading technic and API cashing, smoother user experience and improve app perfermance.
  - API cashing and layzing loading

## Problems and Issues

- One hard part is base on the project requirement design the filter function, managing filter state and make sure it provide correct params to call search api. How to smoother User searching experience while proforming effienct data fetching and refreshing page.

- The page displays a series of cards, and due to the limitations of the API, I had to use the N+1 query approach to get all nessissary infomation. However, the API provider set a limit on the number of requests, and when there are too many cards, making too many requests in a short time triggers the protection mechanism, potentially causing the page to crash. Initially, I used Axios in the parent component to make the API calls, aggregated the data, and passed it to the child components. However, during testing, I found that when N was large, the page would crash, and any failure in one of the N queries would cause the entire page to throw an error. To solve this issue, I switched to React Query, caching the API responses to reduce server visits. Additionally, I moved each API call to the child components, allowing each card to manage its own state, handling loading and error states more effectively. Furthermore, I assigned a delay function to each child component, which not only staggers the API requests, further reducing server pressure but also creates a smoother, progressive rendering of the card list.

- When deploying the app, I explored different cloud platform providers, such as Cloudflare Pages, Vercel, and Netlify. Ultimately, I found that Netlify makes it very easy to deploy React projects, with a simple setup process that allows for seamless deployment of repositories from GitHub.
