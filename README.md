# BitTelligence - UMass Boston and Utimaco

BitTelligence is a browser-based intelligence tool for displaying, analyzing, and annotating addresses on the Bitcoin network.

The app is designed to be intuitive for the non-technical user. Nevertheless, here is a brief instruction manual:

## User Interface

The input in the top left of the interface allows you to specify a new address to set as the target.

Below that is a count of the total incoming and outcoming transactions recorded for the current address.

The other search bar, in the bottom left, lets you search for an address from among those currently displayed, without setting it as the new target.

In the top left of the interface are three buttons for resetting the view, and importing and exporting the current graph state to/from a JSON file.

## The Graph

The graph displays the target address in blue, at the center of the screen. Edges radiating outwards from that target represent transactions involving that wallet.
Green edges are incoming transactions, and red are outgoing. Hover over any node to see its address, and click on any node to bring up its Control Interface.

## The Wallet Control Interface

This dialogue box displays all relevant information regarding the selected node, including the value of the transaction with the target node.
Click the "exchange currency" button to toggle between BTC and USD.

This interface is also where you can flag addresses. Select a level, and then "save changes" to update that address's flag.

Finally, select "change wallet" to set this wallet as the new target.

# How to run BitTelligence:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running in development mode:

In the project directory, you can run:

### `npm install`
Will install all of the node.js dependencies for the app.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Building:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
