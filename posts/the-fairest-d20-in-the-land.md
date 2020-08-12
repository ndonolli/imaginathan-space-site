---
title: The fairest d20 in all the land
date: 2020-08-12T21:55:02.432Z
author: Nathan Donolli
summary: wasting random bit generation on overly cryptographically secure dice
tags:
  - cryptography
  - clojurescript
  - open source
  - ""
---
I play weekly sessions with some of my friends playing  Dungeons and Dragons.  For the uninitiated, the game is mostly powered by your imagination.  There are rules for how stats are determined and how events can occur but the outcome of the story is a complete sandbox that is determined by the players.  Whether or not those outcomes occur, is up to the rolls of the dice.  So interestingly, the dice could be considered the *only* game mechanic.

As such, dice rolls are the epicenter of much tension and excitement.  They are, after all, what could be considered the "fate" of the game.  Like real world deities, they are given much reverence even in our physical, corporeal existences.  Real dice are decorated and sometimes uniquely branded. Computerized dice may lack a soul but great minds have toiled over their electronic design.  The dice are the deciders of the fantastical world and the pasts, futures, and presents of its people are at its omnipresent whim.

## Anyway...

Being the sole mechanic, dice rolls often get flack when luck seems to run out.  My party and I constantly curse and complain and switch to other dice sets, or more often cease using the online dice roller provided by Roll20, the site we play on.  The engineer in me understands that random outcomes mathematically do not hold any pattern, but the craps player in me can't help but feel *cheated.* 

It was these feelings, shared by me and my group, that led me into a rabbit hole of the questions: How can we make dice more random?  How is this done with technology? And more importantly, does it matter? I arrived at [implementing a solution](https://github.com/ndonolli/winkler) to produce random numbers with sufficient bits of entropy to call them "random". This is a solution that is able to provide extra security in client-side cryptography that is better than most default RNGs that ship with javascript engines in browsers.

And I wasted it on dice rolls.

## On the subject of randomness

It's important to first address our emotions toward dice.  Humans are not computers and [our intuitive notion of randomness](https://www.sciencedirect.com/science/article/pii/019688589190029I) is not aligned with how it is mathematically defined.  We perceive a "random" sequence to be one where the values are all over the place, and the same number never appears twice.  In actuality, having a die that would never roll the same number twice is nearly the opposite of random, since it establishes a pattern and recursively changes the probability outcome of the subsequent roll.  True randomness must be patternless and indeterministic.

This is seemingly the case with a physical die.  Each time