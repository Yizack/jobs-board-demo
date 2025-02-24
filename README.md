# Jobs Board

A simple jobs board application built with Vue 3.

## Quick Setup

1. Clone the Repository

```sh
git clone https://github.com/Yizack/job-listings-assessment.git
```

2. Install Dependencies

```sh
cd job-listings-assessment
pnpm i
```

3. Run the Development Server

```sh
npm run dev
```

4. Build for Production

```sh
npm run build
```

## Approach

- **Component-Based Architecture**: All reusable UI components in the [`~/components/`](src/components/) directory. Including the following examples:
  - Job related components
    - [`JobCard.vue`](src/components/job/JobCard.vue): Displays a job card.
    - [`JobFilter.vue`](src/components/job/JobFilter.vue): Displays filter options.
    - [`JobTags.vue`](src/components/job/JobTags.vue): Displays a list of tags.
  - Form related components
    - [`FormInput.vue`](src/components/form/FormInput.vue): A custom input component.
    - [`FormSelect.vue`](src/components/form/FormSelect.vue): A custom select component.
    - [`FormSwitch.vue`](src/components/form/FormSwitch.vue): A custom switch component.
  - [`NavBar.vue`](src/components/NavBar.vue): Navigation bar mainly used in layouts.
  - [`ItemsPagination.vue`](src/components/ItemsPagination.vue): Pagination component.
  - [`HeaderSection.vue`](src/components/HeaderSection.vue): Reusable header section.

- **Views**: Page views are stored in the [`~/views/`](src/views) directory. Including the following examples:
  - [`HomePage.vue`](src/views/HomePage.vue): The view for the home page.
  - [`ErrorPage.vue`](src/views/ErrorPage.vue): The view for error pages.
  - [`JobList.vue`](src/views/jobs/JobList.vue): The main view for job listings.
  - [`JobDetails.vue`](src/views/jobs/JobDetails.vue): The view for job details.

- **State Management**: The logic is stored in the [`~/stores/`](src/store) directory.
  - [`jobs.ts`](src/stores/jobs.ts) managing the state related to job listings, filters and pagination and [`error.ts`](src/stores/error.ts) managing the error navigation state.

- **Middlewares**: Middleware functions are defined in the [`~/middlewares/`](src/middlewares) directory.
  - [`jobs.ts`](src/middlewares/jobs.ts) middleware is used on before each route resolve to fetch job listings from the API, store them in the state, and in session storage to prevent unnecessary API calls.

- **Routing**: The routing configuration is stored in the [`~/router/`](src/router) directory.
  - [`index.ts`](src/router/index.ts) defining the main routes.
  - [`jobs.ts`](src/router/jobs.ts) defining routes related to job pages.

- **Layouts**: The layout components are stored in the [`~/layouts/`](src/layouts) directory, and are dynamically applied to routes with the `layout` route meta field.
  - [`DefaultLayout.vue`](src/layouts/DefaultLayout.vue) is the default layout used in the application.

- **Utils**: Utility functions, helpers and composables are stored in the [`~/utils/`](src/utils) directory.

- **Styling**: The project uses Tailwind CSS for styling. The global styles are in the [`~/assets/`](src/assets) directory.

- **Type Safety**: Custom type definitions are in the [`~/types/`](src/types) directory.

## Specifications

The project was developed with the following specifications.

### Environment

The project was developed using the following environment.

| Software | Version |
| --- | --- |
| Node | 22 |
| PNPM | 10.4.1 |

### Packages

List of key packages used in the project.

| Package | Description |
| --- | --- |
| Typescript | JavaScript superset for type safety |
| Vue 3 | JavaScript framework for building user interfaces |
| Vue Router 4 | Official router for Vue.js |
| Vite | Next generation frontend tooling |
| Vitest | Vue testing library |
| Pinia | Store for Vue 3 |
| Tailwind CSS 4 | Utility-first CSS framework |
| VueUse | Collection of essential Vue Composition API utilities |
| ofetch | Better fetch API |

## CI/CD

The project is automatically tested by running **ESLint**, **Vitest**, and **vue-tsc** for typechecking on **GitHub Actions** on every push to the main branch.

## Deployments

The project is automatically deployed on Cloudflare Pages and Vercel.

| Deployment | URL |
| --- | --- |
| Cloudflare Pages | https://job-listings-assessment.pages.dev |
| Vercel | https://job-listings-assessment.vercel.app |

## Development

```sh
# Install dependencies
pnpm i

# Develop with Vite
npm run dev

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Run typecheck
npm run test:types
```
