# Movie Database Website

This is a Movie Database Website built using React for the frontend and ASP.NET for the backend.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

### Prerequisites

You need to have the following software installed:

- Node.js
- .NET Core SDK
- Supabase Account for the Database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Istine/moviemania.git
   ```

2. Navigate to the `ClientApp` directory and install frontend dependencies:

   ```bash
   cd ClientApp
   npm install
   ```

3. Navigate to the `root` directory and install backend dependencies:

   ```bash
   dotnet restore
   ```

4. Create a Supabase Postgres DB and update the connection settings in `appsettings.json`.

5. Start the frontend and backend:

   - Frontend:

     ```bash
     cd ClientApp
     npm start
     ```

   - Backend:

     ```bash
     cd MovieMania
     dotnet run
     ```

## Features

- Search for movies by title
- View detailed information about movies, including cast and crew.

## Usage

1. Visit the website's homepage.
2. Use the search bar to find movies or browse through the list of movies.
3. Click on a movie to view more details.

## License

This project is licensed under the [MIT License](LICENSE.md).
