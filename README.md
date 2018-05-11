# udon 

> 🍜 A scaffolding opinionated tool for vue development.

### What is it?
udon is a scaffolding tool that allows you to bootstrap fastly vue projects. It gives you out-of-the-box the following options:

- multilanguage setup
- pre-fetching page data in vuex modules
- server sample data mocks

## Requirements
 - node >= 8
 - npm or yarn

## Installation
Install as global node package:
```
$ npm install -g @liqueflies/udon
```

## Usage
Once installed you have to create a vue project.

```
$ npm install -g @vue/cli
$ vue create `my-project`
$ cd `my-project`
```

Than scaffold.
```
$ udon init
```

Run server with mocks (🚨  do not use if you use your own server)
```
$ npm run mocks
```

Start vue-cli with
```
$ udon dev
```