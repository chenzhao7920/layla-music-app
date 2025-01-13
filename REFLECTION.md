**Reflection for Layla Project**

**Overview**

In this project, I developed a modern web application utilizing the latest React 19, React Query, Tailwind CSS, and Material-UI (MUI) libraries, applied responsive layout. The app integrates seamlessly with the Discogs API, providing users with a rich and interactive platform to explore their favorite music through various criteria. This app has been deployed on Netlify, which ensures a fast and seamless experience for users worldwide.

Key features include:

- Discover music by genre, year, country

- Favorite Albums Management

- Artist's page, showcasing artist's albums

- Responsive layout

**Page Features**

- Home Page

  - Filter section:
    - Default Filters on Initial Load
    - Left Drawer section for updating filters
    - Displays active filters as tags
    - Actionable tags, facilitate removing filter from home page
  - Album Cards:
    - Showcasing key details such as cover image, artist, genre, country, year, and simple analytics for quick insights
    - Includes a favorite button to allow users to bookmark albums as favorites
    - Provides Artist links to navigate directly to artist's page for deeper exploration
  - Pagination to enable smooth navigation
  - Loading spinner while data is being fetched
  - API caching and lazy loading

- Artist Page
  - Breadcrumb navigation UI design
  - Artist Release Cards:
    - Showcasing artist's key details albums titles, dates, and cover images
    - Shows Artist public profile link for richer content
    - Aggressive loading techniques and API caching ensure a smoother user experience and improved app performance
  - API caching and lazy loading

**Problems and Issues**

- One challenging part is designing the filter function based on the project requirements, managing filter state and ensuring it provides correct parameters to call search API. How to create a smoother user search experience while performing efficient data fetching and refreshing page.

- The page displays a series of cards, and due to the limitations of the API, I had to use the N+1 query approach to get all necessary information. However, the API provider set a limit on the number of requests, and when there are too many cards, making too many requests in a short time triggers the protection mechanism, potentially causing the page to crash. Initially, I used Axios in the parent component to make the API calls, aggregated the data, and passed it to the child components. However, during testing, I found that when N was large, the page would crash, and any failure in one of the N queries would cause the entire page to throw an error. To solve this issue, I switched to React Query, caching the API responses to reduce server visits. Additionally, I moved each API call to the child components, allowing each card to manage its own state, handling loading and error states more effectively. Furthermore, I assigned a delay function to each child component, which not only staggers the API requests, further reducing server pressure but also creates a smoother, progressive rendering of the card list.

- When deploying the app, I explored different cloud platform providers, such as Cloudflare Pages, Vercel, and Netlify. Ultimately, I found that Netlify makes it very easy to deploy React projects, with a simple setup process that allows for seamless deployment of repositories from GitHub.
