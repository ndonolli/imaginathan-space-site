---
title: Repl driven prototyping
date: 2020-10-25T20:51:02.865Z
author: Nathan Donolli
summary: the importance of a good feedback loop
tags:
  - clojure
  - repl
---
Watching Chris DeLeon build [snake in four minutes](https://youtu.be/xGmXxpIj6vs) in javascript exemplified an idea rarely brought up in discourse surrounding the software development workflow: sometimes you need quick and dirty code. Creating throwaway proof-of-concepts is sometimes more valuable than investing thought and time into proper software design.  This might be an uncomfortable thought to many engineers, including myself, but it is a dilemma we face quite often in collaborating with business and product owners.  Methodologies like Agile have formed from this idea, compromising the need to iterate on design as well as the need to deliver something tangible.

Most clojure developers have found joy in repl-driven development, and this is no coincidence.  Clojure's implementation as a functional lisp encourages iterative use of the repl as an apt means of building up foundational expressions of code.  Javascript of course has a repl, but lacks the interactive connectivity to the entire project like clojure does.  In fact, clojure's powerful repl often becomes the primary tool for development, offering a new workflow for building code.

I would like to share an example of repl-driven prototyping's usefulness in real life.  At work we were tossing the idea of adding a wordcloud data visualization into our application.  This wasn't set in stone, but I wanted to throw together a small demo to get people on board. 

Seeing as this would likely be a client-hosted component I considered prototyping it in javascript.  After all, I found a reasonable wordcloud library on npm.  But these days, shadow-cljs and the mature clojurescript tools make spinning up a webapp + repl simpler than ever.  So why not?  We'll get the advantage of the exceptional core library and the repl.

The wordcloud library's API is simple enough - it expects an array of arrays containing both the word and weight to be passed into the render function. I wanted to use real data so I grabbed some test data consisting of sample text separated by newlines.  This looks like a good thing to define in our repl.

```clojure
cljs.wordcloud=> (def text "...")
#'wordcloud/text
```



```clojure
cljs.wordcloud=> (def words (clojure.string/split text #"\W"))
#'wordcloud/words
```

```clojure
cljs.wordcloud=> (frequencies words)
{"" 161,
 "sweet" 2,
 "release" 3,
 "pivoting" 1,
 ...
```

```clojure
cljs.wordcloud=> (sort (frequencies words))
(["" 161]
 ["4th" 1]
 ["Abba" 1]
 ["Added" 1]
 ...
```

