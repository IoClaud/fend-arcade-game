# FRONT-END NANODEGREE: PROJECT ARCADE GAME

This project is a part of the Front-End Development Nanodegree program with Udacity.

The goal is to develop a Frogger-like game using Object-Oriented JavaScript.
It is available live [here](https://ioclaud.github.io/fend-arcade-game/).

## Table of contents

* [How to play](#how-to-play)
* [To Develop](#to-develop)
* [Authors](#authors)
* [License](#license)

## How to play

### Installing

Clone this repository, either by going to the desired directory and running `git clone`  `https://github.com/IoClaud/fend-arcade-game`
or by clicking the green "Clone or download" button on the [repository's main page](https://github.com/IoClaud/fend-arcade-game)
and downloading a ZIP.
When you have the files ready on your computer (unzipped, if necessary), open the `index.html` file.

If you are using a mobile device or just don't want to download anyting, you can
[go to this URL](https://ioclaud.github.io/fend-arcade-game/) and start the game right away.

### Gameplay

- Open the **index.html** file
- Choose your **character** by clicking on its image
- **Start** the game by pressing the _START_ button
- You stand now on your **initial position**
- The **goal** is to reach the last row of the game (the one on the top with the water blocks)
- Use the **up**, **down**, **left**, **right** arrow keys of the keyboard to move your character accordingly
- You must **avoid the enemies** or you would go back to your initial position
- **Have fun!**

### Rating

The game assigns **50** points each time the water is reached and increases by **1** level each time _150 points_ are accumulated. At each level increase, the game increases the number of enemies to avoid and their speed of crossing the field.

## To develop

- Load the game by opening _index.html_
- Find all the styling in _css/style.css_
- The files _js/engine.js_ and _js/resources.js_ managed the game loop
- The functions are written in the _js/app.js_ file
- The game is coded in **Object-Oriented Vanilla JavaScript**

## Authors

* **Claudio Gavioli**

## License

This project is licensed under the GPL v3.0 License. It is available [here](https://github.com/IoClaud/memory-game/blob/master/LICENSE)
