
# XAPIER

A simple update-checker module.


![Logo](https://i.imgur.com/2PurPUx.png)

    
### Badges




NPM                     |  Licance   |    Discord
:-------------------------:|:-------------------------:|:-------------------------:
[![](https://img.shields.io/npm/v/xapier?style=for-the-badge)](https://www.npmjs.com/package/xapier) |[![](https://img.shields.io/github/downloads/YiitWT/xapier/total?style=for-the-badge&label=GitHub)](https://github.com/YiitWT/xapier) | [![](https://img.shields.io/discord/809346234409418792?style=for-the-badge&logo=discord)](https://discord.gg/MP5JCcvxQx)




  
### Installation

```bash 
  $ npm install xapier
```
    

## Usage

### Terminal Usage

```js
  $ xapier <parameter>
```

| Parameter |   Args   | Description                |
| :-------- | :------- | :------------------------- |
| `-c` ` ` `-r & -a`| `github.com/user/repo <optional: -r> <optional: -a> ` | *Create app's version. |
| `-u` | `1.0.1` | *Update your app's version. (Default version 1.0.0) |

#### How it works
Example: If you write `xapier -c githubadress -r -a`
It'll automaticly install the latest version of your app but you don't have to use `-r` & `a`.

This one is so basic. If you write `xapier -u <new version that newer than oldest>` it'll change the app's version. If you want more example:
#
Before you wrote command
```json
{
    "version": "1.0.0"
}
```
After 
```json
{
    "version": "1.0.1"
}
```


### Update Check Usage

```js    
const xapier = require("xapier")


xapier.Check( // All of these are optional
    "yourrelase.zip",//file
    true,//Auto update after download 
    "node ."//The command to run after updated
    pid // PID Number with number
)
```
#### How it works?
If you enter these informations, First it'll close the application, than download latest relase from your github page than install files. Finally it'll run the command you wrote.

#### What if i dont enter optional choices?
If the current version is older than latest than it'll direct you to github page.

### All functions

```js
    xapier.Ignore(); // Just returns
```

  
### Feedback & Issue

If you wanna report an issue or smth. you can contact us via [Discord](https://discord.gg/MP5JCcvxQx) or you can commit a [Issue on GitHub](https://github.com/YiitWT/xapier/issues)

  
### Credits

- [@valancess](https://www.github.com/DeveloperKubilay) Coder & Developer.
- [@YiitWT](https://www.github.com/YiitWT) Coder & Developer.

  