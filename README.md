![API Explorer screenshot](https://github.com/kayleighfoley/api-explorer/blob/master/api-explorer.jpg?raw=true)

# API Explorer

Use the API Explorer to test and explore various API endpoints. An individual API Explorer component requires a `title`, `url` and `method` property (`GET`, `POST`, `PUT`, `DELETE`), and an optional `body` property for `POST` and `PUT` requests.

The `body` property should be an array consisting of any number of objects to become input fields for the request body. Each input object should include a `name` property and any other applicable HTML5 input attributes (eg: `type` `required`, etc).

```javascript
<ExplorerComponent
  title={}
  method={}
  url={}
  body {}
/>
```

Example API Explorer configuration

```javascript
{
  title: 'Create new post',
  url: 'https://jsonplaceholder.typicode.com/posts',
  method: 'POST',
  body: [
    {
      name: "post-id",
      type: "number",
      maxlength: 3,
    },
    {
      name: "title",
      type: "text",
      required: true,
      maxlength: 255,
    },
    {
      name: "body",
      type: "text",
      required: true,
    },
  ]
}

{
  title: 'Get all posts',
  url: 'https://jsonplaceholder.typicode.com/posts',
  method: 'GET',
}
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
