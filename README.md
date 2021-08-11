# *React Clone* - How to use

## Create component

```js
// main.js

import Component from "./src/index.js";

const view = new Component("component-name");

view.create({
  type: "view",
  properties: {
    styles: {
      width: "100px",
      height: "100px",
      backgroundColor: "3404452",
      borderRadius: "10px",
    },
  },
});
```

## How to use

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Clone</title>
  </head>
  <body>

    <component-name></component-name>

    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```
@marcos.dev.web
```
\
[WebSite](https://marcosdevweb.herokuapp.com) | [Instagram](https://www.instagram.com/marcos.dev.web)