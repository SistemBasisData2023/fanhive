# FanHive

[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/SistemBasisData2023/fanhive)

FanHive is an open-source website made for fanfiction readers. Users can write stories, write multiple chapters within a single story, follow other authors, interact with other authors, and express themselves thanks to the powerful rich-text editor.

## Table of Contents

- [Installation](#installation)
- [Frameworks](#frameworks)
- [Features](#features)
- [Usage](#usage)
- [Team A1 Members](#members)
- [Progress Report](#progress-report)
- [Database UML](#database-uml)
- [Database E/R Diagram](#database-er-diagram)
- [Flowchart](#flowchart)

## Installation

This project utilizes Yarn Package Manager, though equivalent NPM commands can be used instead. To install the project, run the following commands:

```bash
git clone https://github.com/SistemBasisData2023/fanhive.git
cd fanhive
yarn install
```

If you're facing conflict with Hadoop MapReduce being installed on your machine, do one of the following:

- Run `yarn` commands using `yarnpkg` instead, e.g. `yarnpkg install`
- Move yarn package manager path to the top of your PATH environment variable (above Hadoop MapReduce yarn path)
- Uninstall Hadoop MapReduce (**Not recommended**)

## Frameworks

- [React JS](https://reactjs.org/)
- [Node JS](https://nodejs.org/en/)
- [Express JS](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JavaScript](https://www.javascript.com/)
- [Yarn Package Manager](https://yarnpkg.com/)
- [Sass](https://sass-lang.com/)

## Features

- [x] User authentication
- [x] User authorization
- [x] Light/Dark Mode
- [x] Customizable user profile
- [x] Write story with cover art
- [x] Write multiple chapters within a story
- [x] Follow other authors
- [x] Interact with other authors through comment section
- [x] Powerful rich-text editor for content styling
- [x] Search for stories based on Title
- [x] Show stories based on accounts
- [x] Show stories based on followed accounts
- [x] Show stories based on tags
- [x] Show stories based on fandoms
- [x] Create your own fandom(s)
- [x] Create your own tag(s)

## Usage

To run the project, run the following commands:

```bash
yarn start
```

Alternatively if you have Hadoop MapReduce installed on your machine, run the following command:

```bash
yarnpkg start
```

## Members

- [Satya Ananda Sulistio](github.com/styxnanda)
- [Eldisja Hadasa](github.com/eldisja)
- [Rain Elgratio Sion Hasian Lumban G](github.com/RainElgratio)

## Progress Report

- First Report (Click thumbnail below):
<br>
<div align="center">
<a href="https://youtu.be/j4RG3DOQX9w">
  <img src="https://img.youtube.com/vi/j4RG3DOQX9w/maxresdefault.jpg" alt="Watch on YouTube" width=300/>
</a>
</div>

- Second Report (Not Available Yet):
<br>
<div align="center">
<a href="">
  <img src="https://img.youtube.com/vi/x/maxresdefault.jpg" alt="Watch on YouTube" width=300/>
</a>
</div>

## Database UML

![UML](./UML%20Database.png)

## Database E/R Diagram

![E/R Diagram](./ER%20Diagram.png)

## Flowchart

![Flowchart](./FanHive%20Scenario%20Flowchart.png)
