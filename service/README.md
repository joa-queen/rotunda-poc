# Rotunda Issue Tracker - Service

## Overview

This is a small service to handle the communication with GitHub API and inject the logic required by Rotunda's workflow.

I tried to keep it modularized and explained with comments everyline that I thought it needed context.

Because the service needs very little configuration, I decided to store that data in a config file instead of a Database, which seemed an overkill for the task. The downside here is that having a mutable config file makes this services sateful, which is something I would try to avoid in a service, in order to favor future scaling or CI/CD. Maybe in the future, if the system becomes more complex, it could be replaced by a database.

## Development

Just run `npm start`.

## Build + Run
