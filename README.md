# Employee Project Collaboration Tracker

A React application that analyzes employee project data to identify and display pairs of employees who have worked together on common projects.

## Features

- Upload and process CSV files containing employee project data
- Identify pairs of employees who have worked together on common projects
- Display detailed information about project collaborations
- Calculate the duration of employee collaborations
- Modern and responsive user interface

## Tech Stack

- React
- TypeScript
- Vite
- Sass
- Modern ES6+ JavaScript

## Getting Started

1. Clone the repository:

Using HTTPS:

```bash
git clone https://github.com/smasenov/stefan-asenov-employees
```

Using SSH:

```bash
git clone git@github.com:smasenov/stefan-asenov-employees.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Start tests:

```bash
npm run test
```

5. Build for production:

```bash
npm run build
```

## CSV File Format

The application expects a CSV file with the following columns:

- Employee ID
- Project ID
- Date From
- Date To (can be NULL for current date)

## What I would improve with more time

- Add tests for all common components with full coverage
- Verify table rendering upon file load
- Optimize performance where necessary
- Better file structure
- Better configurations
