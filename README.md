# Flag-Ray Specs

See through the page to find your flags! 

Flag-Ray Specs ~is~ _will_ be a developer-focused Chrome extension for debugging websites that use LaunchDarkly feature flags. Selecting a DOM element in the Chrome DevTools, and the Flag-Ray Specs panel will show you the feature flag(s) which are responsible for rendering that element.

Right now, that description is aspirational. As yet, this extension does very little other than

* adds a "Flag-Ray" tab to Chrome DevTools
* adds a "Flag-Ray" sidebar panel to the Elements tab of Chrome DevTools
* calls into the LaunchDarkly API to fetch some flags

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
