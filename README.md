<a id="readme-top"></a>

<!-- ABOUT -->
## About

[![Product Screen Shot][product-screenshot]](https://indigenous-bi.vercel.app/)

This repository contains the source code of the Next.js version [Indigenous Business Intelligence Dashboard](https://indigenous-bi.vercel.app/) as part of our Capstone project with the Green Software Engineering research theme. For the REST API version, please visit [ITC_API](https://github.com/jokerinpoker/ITC_API). For our project deliverables such as paper and poster, please visit [ITC_Deliverables](https://github.com/jokerinpoker/Indigenous-Tech-Circle).

In this project, we are proud to partner with [Ryan St Germaine](https://www.linkedin.com/in/ryanstgermaine/) from [Indigenous Technology Circle](https://www.jointechcircle.com/) to build a dashboard that aims to connect Indigenous businesses with procurement opportunities from all government levels in Canada, and to help them make informed decisions about their procurement strategy with clear and actionable insights.

### Built With

This version is built with the following technologies mainly from the [T3 Stack](https://create.t3.gg):

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Drizzle](https://orm.drizzle.team)
* [Postgres](https://www.postgresql.org/)
* [TanStack Query](https://tanstack.com/query/latest)
* [Tanstack Table](https://tanstack.com/table/latest)
* [React Hook Form](https://react-hook-form.com/)
* [NextAuth.js](https://next-auth.js.org/)
* [Vercel](https://vercel.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

The simplest way to get started is to visit https://indigenous-bi.vercel.app/. If you want to run the project locally, you can follow these steps:

### Prerequisites

First, you will need to create a [Postgres database instance](https://vercel.com/marketplace/neon) and a `.env` file in the root directory of the project. Follow the instructions and save the environment variables in your `.env` file.

Next, generate a secret key for your application. This key is used to encrypt cookies, ensuring the security of user sessions. You can do this by running the following command in your terminal:

```sh
openssl rand -base64 32
```

Copy the generated key and save it in your `.env` file as `AUTH_SECRET`. By now, you should have a `.env` file with the following variables:
  ```sh
  POSTGRES_URL=""
  POSTGRES_PRISMA_URL=""
  POSTGRES_URL_NO_SSL=""
  POSTGRES_URL_NON_POOLING=""
  POSTGRES_USER=""
  POSTGRES_HOST=""
  POSTGRES_PASSWORD=""
  POSTGRES_DATABASE=""
  AUTH_SECRET=""
  ```

Finally, the database needs to be seeded with some initial data. To save some time, we have generated a cleaned-up dataset in csv format, which can be retrieved at [ITC_Deliverables](https://github.com/jokerinpoker/Indigenous-Tech-Circle) under the `data/processed` folder. However, the dataset contains more than 70,000 rows, so it will take more than 10 hours to seed the database with full amount of data. We recommend seeding a subset instead. Please refer to `src/server/db/seed.ts` for more details.

### Installation

1. Install packages and dependencies
   ```sh
   pnpm install
   ```
2. Run the development server
   ```sh
   pnpm dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ROADMAP -->
## Roadmap

### Next.js version
- [x] Sidebar and navigation
  - [x] Sidebar
  - [x] Active link
  - 🚧 Use shadcn sidebar
- [x] Scaffold basic UI
- [x] Set up a real database
  - [x] Create tables
  - [x] Create relations
  - [x] Seed data from CSV to Vercel Postgres
- [x] Procurement data table
  - [x] Frontend pagination
  - [x] Frontend sorting
  - [x] Frontend filtering
  - [x] Column visibility
  - [x] Use reusable components
  - [x] Backend pagination
  - [x] Global search w debounce
  - [x] Backend sorting
  - [x] Backend faceted filtering
- [x] Insight charts
  - [x] Make charts reusable
  - [x] Query results from db
  - [x] Finish all charts
  - [x] Footer notes
  - [x] Add summary tables
  - [x] Refactor db queries & follow best practices
- [x] Profile form
  - [x] Mockup UI from CCIB website
  - [x] Add authentication
  - [x] Send profile data to database
  - [x] Add sonnet after updating
- [x] Vendors
  - [x] Display a list of registered vendors
- [x] Deploy
- [x] Suspense skeleton
- [x] Placeholder for the rest of the pages

### Vanilla version
- [x] Backend API endpoints & CRUD (Express)
- [x] Setup routing & navigation (React Router)
- [x] Build UI by reusing components
- [x] Connect to the backend

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: public/thumbnail.png