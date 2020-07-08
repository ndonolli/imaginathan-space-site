---
title: The curious future of the progressive web app
date: 2020-07-07T19:13:55.849Z
author: Nathan Donolli
summary: "aka: help I don't even know what this is"
tags:
  - PWA
  - web
---
An evangelical post about progressive web apps (or PWAs for you cool kids) makes the rounds on HackerNews every six months or so.  The latest, at this time of writing, showcases a(nother)[ PWA app store](https://news.ycombinator.com/item?id=22963822) in a promising display of harmonious embracement of a bright future for mobile applications.

You scroll down, past the two pat-on-the-back high ranking comments, and find to your dismay individuals confused and unconvinced about the staying power of the PWA:

 "I've never worked with a PWA, but it seems to always lag behind mobile apps" says one sacrilegious user.  

"Cool, I built a similar PWA store last year, but I've since abandoned it" laments another.

"How could this be?" you ask. "The name literally contains the word 'progressive'! Is the progressive web app struggle worth fighting for?"

To you I say, yes it is. But let us rise above the noise and lay some foundation for our knowledge.  Let us remember once and for all, what a PWA actually is.

## What is a PWA?

If you did a basic Google search, you would find this definition:

> A progressive web application is a type of application software delivered through the web, built using common web technologies including HTML, CSS and JavaScript. It is intended to work on any platform that uses a standards-compliant browser.

That is quite an underwhelming answer. PWAs are just websites? The web apps we've been making all this time were *progressive?* The answer is *kind of.*

The main issue is that a "PWA" does not refer to a single, unique entity but rather a collection of requirements expected of web apps.  If they fulfill these requirements, they are able to be used offline in a similar way to native mobile and desktop apps. The confusion regarding the PWA term is similar to that of the term HTML5.  The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) refer to HTML5 being both the latest version of the language as well as a collection of modern web technologies that are asynchronously adopted by major browsers.  Due to the miscommunication in marketing, HTML5 is misunderstood as a standalone technology rather than a collection of good things that are mostly all there already.

[This is the most comprehensive article](https://medium.com/@amberleyjohanna/seriously-though-what-is-a-progressive-web-app-56130600a093) I could find regarding the history of the term "progressive web app" and how its definition has shifted over time.  If you have the time to read it, it's a wild ride.  Getting to the bottom of it all is like a boxcar kids detective story.  But for the lazy, the takeaway is that for your site to be considered a PWA, it must:

1. Be served over HTTPS
2. Include a Web App Manifest
3. Implement a service worker

And that's all.  Considering the complexity of modern production-scale web apps, most are two-thirds of the way there.  The app manifest is nothing but a json file that declares some metadata about your app and maybe some icons.  Here's an example manifest for this site:

```json
{
  "short_name": "imagiNathanSpace",
  "name": "imagiNathanSpace",
  "description": "Nathan's cool web zone",
  "start_url": "/",
  "background_color": "#160C28",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#160C28",
  "icons": [
      {
        "src": "static/img/logo-sm.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "static/img/logo.png",
        "type": "image/png",
        "sizes": "512x512"
      }
  ]
}
```

Heck, I took ten minutes out of my unprogressive life and turned *this* site into a PWA.  No, really! You can <span class="fake-link" onclick="app.installPwa()">install this "app"</span> on your phone or desktop!

If you actually clicked that install link, you may have received an alert giving you sad reasons as to why it didn't work.  This brings up another pain point of PWAs: the bottleneck on PWA adoption is on device manufacturers and browsers, not the development community.  As far as the PWA requirements go: using HTTPS and SSL is practically mandatory these days. Service workers are relatively new in the age of the web but are widely used for performance requirements. Major players like Twitter and Instagram invest heavily on creating fluid in-browser versions of their apps and are both installable as PWAs if you choose to do so.

On the device manufacturer side, Google has emerged as one of the largest advocates for "progressifying" your web app. They have done work consolidating documentation, teaching materials, and marketing resources in order to spread the news to software, product, and business oriented professionals alike.  Chrome on mobile and desktop supports modern web APIs and implements the necessary requirements to prompt users to install the app from the website.

Apple, on the other hand, is a different story. Fanboys may point to the iPhone launch video where Steve Jobs envisions a future of web applications “that look exactly and behave exactly like native apps”.  However, Apple's skin in the game has been quite limited.  Safari on iOS blocks the install prompt to make it easy for users to install the app.  Instead, they must open browser options, scroll down, and select to "Add to home screen".  This is practically a dark pattern.  In addition, iOS limits the capabilities of other browsers, like chrome, forcing all PWAs to utilize Safari's minimal webview.

But this is not entirely surprising.  In Q3 of 2019, Apple's app store brought in $14.2 billion beating out Google's $7.7 billion for its play store.  While Apple does not fight against adopting PWAs, it does not seem particularly excited about it.  In international markets where Android dominates, PWAs have more success.  E-commerce sites like Alibaba utilized a PWA as their main platform and it served them well in an industry where user experience is extremely important.

And that's one more thing that we haven't talked much about: users. If software engineers and tech entrepreneurs are confused about PWAs, users are especially so.  All things considered, the ease of mobile apps have made it very easy for normal people to use great software.  The user experience of finding and installing progressive web apps is currently unacceptable if we expect them to replace native apps in the future.  

That day may come only when the term "PWA" is gone.