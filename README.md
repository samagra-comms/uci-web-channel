# Unified Communication Interface

## About UCI :open_book:

The Unified Communications Interface (UCI) aims to democratize the use of different communication channels such as WhatsApp, Telegram, SMS, email and more for governance use cases through a standard configurable manner that is reusable and scalable across all governance use cases.

## Features :dart:

- Ability to connect to any communication channel through any service provider without doing custom changes in the core logic UCI.
- The UCI ecosystem is independent of external variables like communication channel and service provider powered by XMessage standard.
- Ability to have a configurable conversation logic for the bot
- Ability to connect to any database (local or federated) via services
- Ability to include value added services in the bot interaction flow through Microservices (Internal or External)
- Ability to create tools on top of UCI APIs to manage Bot configuration, conversations and visualization

## Requirements :scroll:

[NodeJS](https://nodejs.org/en/download/) and NPM or [yarn](https://yarnpkg.com/getting-started/install)

## Installation :walking:

### 1. Fork it :fork_and_knife:

You can get your own fork/copy of [UCI](https://github.com/Samagra-Development/uci-web-channel) by using the <kbd><b>Fork</b></kbd> button.

### 2. Clone it :busts_in_silhouette:

You need to clone (download) it to a local machine using

```sh
git clone https://github.com/Your_Username/uci-web-channel.git
```

> This makes a local copy of the repository in your machine.
> Once you have cloned the `uci-web-channel` repository in GitHub, move to that folder first using the change directory command.

```sh
# This will change directory to a folder uci-web-channel
cd uci-web-channel
npm install 
yarn run dev 
```

Move to this folder for all other commands.

### 3. Set it up :arrow_up:

Run the following commands to see that _your local copy_ has a reference to _your forked remote repository_ in GitHub :octocat:

```sh
git remote -v
origin  https://github.com/Your_Username/uci-web-channel.git (fetch)
origin  https://github.com/Your_Username/uci-web-channel.git (push)
```

### 4. Create a new .env file and copy contents from .env.sample :open_file_folder:

```sh
cp .env.sample .env
```

The websocket connection URL for the plaground can be used for testing - `wss://comms-playground.samagra.io` for the `REACT_APP_TRANSPORT_SOCKET_URL`.

### 5. Run it :checkered_flag:

Run `npm run dev`

## Designs

Below are the designs of how output screens will look like.
![](https://i.postimg.cc/1tP22S2W/Screenshot-2023-09-06-102410.png)
![](https://i.postimg.cc/K8MWY4yq/Screenshot-2023-09-06-102530.png)
![](https://i.postimg.cc/nVygs7Vf/Screenshot-2023-09-05-at-6-24-45-PM.png)
![](https://i.postimg.cc/rsF5ZNbn/Screenshot-2023-08-28-090003.png)
![](https://i.postimg.cc/NMrbYJH9/Screenshot-2023-09-05-at-6-24-02-PM.png)


## Docs Link

Follow for the [Docs](https://main--sage-syrniki-b31f4f.netlify.app/)

## Contributing

We really like contributions in several forms, see [CONTRIBUTING.md](CONTRIBUTING.md)
