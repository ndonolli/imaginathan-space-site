---
title: Taking the (lisp)stick off the pig
date: 2020-06-25T15:38:10.000Z
author: Nathan Donolli
summary: how clojurescript and elm can help
draft: true
tags:
  - languages
  - javascript
---

Javascript is a pig. Although in this day and age, this comparison is somewhat embraced.  Much like ABBA set the standard for english being the language of choice for international pop songs (and the world), javascript has, sometimes begrudgingly, become the language that all web software developers must speak to some degree.

The good parts of javascript have since been praised and brought to the forefront: first-class functions, prototypal object inheritance, and design patterns centered around purity and immutability.  The "pig" parts, however, will always remain - eating the slop outside of `"use strict"` mode and splashing mud while returning `undefined`.  The recent renaissance of javascript has mostly hidden these bad parts, dressing it up with new features and constructs worthy enough to turn the eye of object-oriented and functional programmers alike.  But please, oh please, do not peer behind the curtain of the transpiled code and see what your beautiful javascript has transformed into, for that is its true form.

As long as the web is around, javascript will always have some lipstick on it.  Modern ECMAScript does a great service, but ultimately is a separate dialect rarely unmodified when serving production code.  Typescript is good too, but like others in its category it is a tertiary extension to a core that is sometimes too rotten to stand behind.  The demand for a solution in this domain has garnered some fascinating solutions, some of which have died off but all of which have influenced the next generation to come.

In the functional space, one such solution is Elm.  Elm compiles to javascript and boasts no runtime errors.  A bold claim, but a mathematically sound one due to its Haskell-esque type system and prescribed architecture framework.  Elm looks and feels nothing like javascript and is essentially an opinionated tool to build stable web apps, emphasizing strongly typed functional programming concepts and using javascript only as a compilation platform. 

Within the same functional space, there is also Clojurescript.  Forking the rationale of Clojure, it is a functional LISP that provides seamless interop with Javascript much like Clojure does with its host language, Java.  While Clojurescript also feels nothing like javascript, it shares a much tighter border with it than Elm, and does not hide or eschew any pig-like features in the interop layer.  Instead, they are absorbed into the parens, ready to be molded and bent to thy will in true LISP fashion since, after all, code is data anyway.

Clojure’s mantra is simple over easy.  This philosophy makes a tad more sense if you distinguish the two.  Easy means something has a low mental start-up cost because at its highest-level, is has a small amount of complexity.  Opinionated frameworks and high-level dynamic languages often market themselves as easy and boast developer speed as a benefit.  Simple means that at any level of abstraction, 