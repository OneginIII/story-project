# Story Project

A web app for an editable library of stories. This is a personal learning project.

## Project contents

- **`story-project-app`** App web interface created with Vite, React & TypeScript.
- **`story-project-server`** Node server acting as a back-end for the app created using Express.
- **`story-project-db`** Contains a SQL file that can be executed to create a Postgres database with default data.
- **`icons`** Contains the icons used for the stories and some extras.
- The app utilizes a separate PostgresSQL database managed using Docker and an Adminer instance for database management.
- There is a `compose.yml` and `Dockerfile`s to build a Docker app containing the following containers:
  - `app` - The front-end Vite + React site.
  - `server` - The back-end Node + Express server.
  - `db` - The PostgreSQL database.
  - `adminer` - Used for database management.

## Project status

This project is now done in terms of the primary functionality. The app's current features work (as far as I've tested) and the interface is simple, but very usable. Some work would need to still be made to deploy the app.

I've worked on this project for a few weeks now, and I'm pretty satisfied with the result for this being my first larger web app project. I'm going to move on to other things for now, but maybe I'll revisit this project some day.

## What's next?

Below I listed some things I would have liked to include, but never got around to:

- **Improving the Docker workflow.** I didn't have time to figure out a setup where I could have run and developed the project fully inside a Docker container. Right now, you can compose the app and it works fine, but has to be done manually. I would have also liked to improve and clean up the build process.

- **Implementing tests.** I would have liked to eventually include some testing systems, which would have helped considerably. I had some issues that would have easily been caught by writing some simple tests.

- **Improving and refactoring.** Some of the ways the app is written, especially the front-end could be improved. I didn't have enough experience to make a clear plan for the components for example.

- **Tags feature.** I had an idea for including a tagging system for the stories. Never got any planning done beyond the initial idea.

- **Setting up deployment.** Having the app ready to go for deployment would have been a nice way to _finish_ the project. There is still work to be done to the code to deploy the project. For example there is still an option to register a new admin user, which would probably be removed in the deployed version.

## Final notes

The project is now publicly available. Contact me if you have any questions or want to use it somehow.

Thanks for reading!
