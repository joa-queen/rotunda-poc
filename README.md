# Rotunda Issue Tracker

## Service

This is a small service to handle the communication with GitHub API and inject the logic required by Rotunda's workflow.

I tried to keep it modularized and explained with comments every line that I thought it needed context.

Because the service needs very little configuration, I decided to store that data in a config file instead of a Database, which seemed an overkill for the task. The downside here is that having a mutable config file makes this services sateful, which is something I would try to avoid in a service, in order to favor future scaling or CI/CD. Maybe in the future, if the system becomes more complex, it could be replaced by a database.

I also created a layer of settings edit, to make more use of the service and not be so trivial.

## Webapp

The app is created using React.js.

It's mainly divided in three core concepts:
- Components: are the pure presentational components reused across the application
- Containers: are the components that connects and handles data
- State: Is where the data structure and data fetching lives

I used the new React version 16.7 because, even though still in alpha, has new key concepts that I wanted to use here. So using Hooks and Context I could avoid installing third party libraries like redux, redux-saga and immutable.

## Development

Both service can be run for development with `npm start`.

## Build and run

1. Have Docker and Docker Compose installed
2. `docker-compose up`
