# flagray

See through the page to your flags!

As yet, does very little other than

* adds a "Flag-Ray" tab to Chrome DevTools
* adds a "Flag-Ray" sidebar panel to the Elements tab of Chrome DevTools
* actually, does neither of those things while the background script is producing websocket errors, not sure why that's happening

Most of the work is happening in `app/scripts`.

**Everything below this line is Yeoman's fault**

## Install

	$ npm install

## Development

    npm run dev chrome
    npm run dev firefox
    npm run dev opera
    npm run dev edge

## Build

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge

## Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 

## Docs

* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)
