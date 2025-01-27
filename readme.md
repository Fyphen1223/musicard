![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/musicard.jpg)
# About
**Musicard** is a lightweight and futuristic music card library designed for Discord bots.

- Fully Customizable
- Lightweight
- High Quality Assets


# Installation
```
npm install musicard
```

# Example
This example code will generate a music card image and save it.
```js
const { musicCard } = require("musicard");
const fs = require("fs");

musicCard({
    name: "Faded",
    author: "Alan Walker",
    color: "00fe9b", // remove # from hex code
    thumbnail: "https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/thumbnail-preview.jpg",
    progress: 50,
    starttime: "0:00",
    endtime: "3:00",
    mode: "play" // or pause
}).then((buffer) => {
    // Generate a card and save it to a file
    fs.writeFileSync("musicCard.png", buffer)
    console.log("Your music card has been generated!")
})
```
**Output** : musicCard.png
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example.png)
**Mode**: pause
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example-pause.png)
**Progress**: 90
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example-progress.png)
**Color**: ea00ff (purple)
![enter image description here](https://raw.githubusercontent.com/A3PIRE/musicard/main/assets/example-color.png)
**And many more....**
# Projects
We will create projects soon, but if you want your project here using **Musicard**, join our [Discord](https://discord.gg/TvjrWtEuyP) server and contact us.

