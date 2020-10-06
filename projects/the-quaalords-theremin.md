---
title: The Quaalords Theremin App
date: 2020-06-20T10:38:10-05:00
summary: A musical app to accompany your horror b-movie soundtrack
projectUrl: https://quaalords-theremin.netlify.app/
repoUrl: https://github.com/ndonolli/quaalords-theremin-static
author: Nathan Donolli
tags:
  - app theremin
---
![the quaalords theremin app](/static/img/quaalords-thereming-screenshot.png "the quaalords theremin app")

The Quaalords are a New Orleans based trio playing rock influenced by the imagery of classic and obscure horror films.  The guitarist, Jeff Louviere, sports a vintage hollow body Gretsch as well as some frankenstein monstrosity of a guitar with a literal working theremin attached for effect.  

I must have had one too many after one of the shows while I was going on about the JavaScript WebAudio API and how every other theremin app I’ve tried was hot garbage.  A theremin on your phone that you operate like a real thereminist, Jeff agreed, would be the tits.  I quickly got to work.

This is one of those apps that is more impressive on the surface than it actually is.  You tilt the phone as if you were mimicking a classical theremin player and the pitch changes as you do so. Pretty neat! But its implementation  is nothing more than an oscillator instance whose frequency is controlled by DeviceOrientation events.  Overall, the project is just a static page with a single JavaScript file.  I wanted to keep it simple and let nothing get in between you and the music.

The most difficult aspect was that these relatively new browser APIs have inconsistent support among devices.  iOS, for instance, blocks permission requests for device orientation - instead requiring the user to manually enable it in their settings.  I shipped this app as a PWA as well, which Apple also seems to have some vendetta against.  I’ve thought about caving and porting it to an expo project, but it’s a matter of principle at this point.

I did rewrite it in clojurescript though, just for fun.  I’m actually glad I didn’t, initially.  The Audiocontext object doesn’t vibe too well with a functional paradigm.  I mean, you could do it, but the benefits of clojurescript weren’t totally needed here.  Sometimes, barebones JavaScript gets the job done.

Anyway, [try it out](https://quaalords-theremin.netlify.app/). I can’t take credit for the sick backdrop. That was Jeff too.