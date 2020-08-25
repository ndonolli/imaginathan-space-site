---
title: The fairest d20 in all the land
date: 2020-08-25T03:17:40.663Z
author: Nathan Donolli
summary: wasting random bit generation on overly cryptographically secure dice
tags:
  - cryptography
  - clojurescript
  - open source
---
The last few weeks I've been playing Dungeons and Dragons with some of my friends.  For those who have never played, the game is mostly powered by your imagination.  There are rules for how stats are determined and how events can occur, but the outcome of the story is a complete sandbox that is determined by the players.  Whether or not those outcomes occur, is up to the rolls of the dice.  So interestingly, the dice could be considered the *only* game mechanic.

As such, dice rolls are the epicenter of much tension and excitement.  They are, after all, what could be considered the "fate" of the game.  Like deities of times past, they are given much reverence even in our physical, corporeal existences.  Physical dice are decorated and sometimes uniquely branded. Computerized dice may lack a soul but great minds have toiled over their electronic design.  The dice are the deciders of the fantastical world and the past, present, and future of its people are at its omnipresent whim.

## Anyway...

Being the sole game mechanic, dice rolls often get flack when our luck seems to run out.  My party and I constantly curse and complain and switch to other dice sets, or more often cease using the online dice roller provided by Roll20, the site we play on.  The engineer in me understands that random outcomes mathematically do not hold any pattern, but the craps player in me can't help but feel *cheated.* 

It was these feelings, shared by me and my group, that led me into a rabbit hole of the questions: How can we make dice more random?  How is this done with technology? And more importantly, does it matter? I arrived at [implementing a solution](https://github.com/ndonolli/winkler) to produce random numbers with sufficient bits of entropy to call them "random". This is a solution that is able to provide extra security in client-side cryptography that is better than the default RNGs shipped with javascript engines.

And I wasted it on dice rolls.

## On the subject of randomness

It's important to first address our emotions toward dice.  Humans are not computers and [our intuitive notion of randomness](https://www.sciencedirect.com/science/article/pii/019688589190029I) is not aligned with how it is mathematically defined.  We perceive a "random" sequence to be one where the values are all over the place, and the same number never appears twice.  In actuality, having a die that would never roll the same number twice is nearly the opposite of random, since it establishes a pattern and recursively changes the probability outcome of the subsequent roll.  True randomness must be patternless and indeterministic.

This is seemingly the case with a physical die.  Our arms are not mechanical machines and are likely incapable of precisely duplicating the same roll every time if we tried.  Combine this with the minutia of small variables like drag, friction, etc. and it is about as patternless as you can get.

On the other hand, if we assume that all of our universe could be modeled as a finite state machine comprising of force vectors, then any future event could be determined by the universe's past state.  This is, simplistically, how the big bang was discovered.  In this scenario, nothing is random because the outcome of a dice roll will always affect the outcome of the following one, making it completely deterministic.  

On the other hand, this model starts to break down when we introduce the strange but successful theory of quantum mechanics into the equation. The theory states that all elementary particles exist in a superposition and have a wave-function probability of collapsing into a state, making any physical prediction impossible until an observation is made.

## Anyway...

Let's work in a domain where we have a little more control: computers.  For as long as they've been around, computers have been deterministic.  They use electricity to create some state and then the CPU does a thing and then a new state is created, per our predictions.  But if this is the basis of how computers work, how can they create true randomness?  The answer, right now, is that they can't.  But they can get damn close.

Cybersecurity is the driving force in ongoing research regarding cryptography and random number generation. The main challenge in designing ciphers is for it to be efficient in its encryption process while making potential decryption so computationally time consuming, it can be considered next to impossible.  There exist several benchmarks, such as the [next-bit-test](https://en.wikipedia.org/wiki/Next-bit_test), to determine the effort needed to crack encrypted data.

The current implementation shipped with most javascript engines is a `XorShift128+` RNG which is a type of linear-feedback shift register designed to be quite efficient and fast.  This RNG is a great improvement on previous implementations and suitable for most use-cases.  However, since the algorithm relies on a fixed seed, it is still only a *psuedo*-random number generator which fundamentally limits its practicality for cryptography.  Providing true randomness to this seed and introducing an illogical pattern for its initialization sometimes necessitates stepping outside the logical computer realm.  And this has led to some *interesting* solutions.

![interesting](/static/img/interesting.jpeg "interesting")

Perhaps the most well known example is `/dev/random/` utility provided in most linux distros.  It is a special file that collects entropy through system information like fan speed, device drivers, and various other sources.  Being a widely forked set of tools provided in many unix flavored systems, there are many varieties of implementations and a range of quality throughout.  But they share the same general solution for its goal: collecting entropy from the real world.

One wackier but, believe it or not, better methods is Cloudflare's [](https://blog.cloudflare.com/lavarand-in-production-the-nitty-gritty-technical-details/)[LavaRand](https://blog.cloudflare.com/lavarand-in-production-the-nitty-gritty-technical-details/) ..uhh.. system.  It involves a wall of lava lamps and video footage in which the changing pixel data is used as a source of entropy.  It is used in production (!) and has been very successful in providing solid cryptography for the large-scale services provided by the organization.

![lavarand at cloudflare](https://blog.cloudflare.com/content/images/2017/11/lava-lamps-camera.jpg)

*I'm waiting for the day where cloudflare releases a post-breach report claiming that one of the lava lamps fell over*

Roll20, whose dice began this whole mess, actually has thought harder than my whole party on the best way to deliver the ideal dice rolling experience.  They have recently released a server-side dice rolling service called [QuantumRoll](https://roll20.zendesk.com/hc/en-us/articles/360037256594-Quantum-Roll), which gathers "true randomness" by measuring fluctuations in a beam of light.  In my opinion, this is both overkill and one of the best sources of entropy in our physical world.  The double-slit experiment, where beams of electrons were demonstrated to have both wave *and* particle like properties, exposed the strange quantum phenomena that led to the development of Heisenberg's Uncertainty Principle.  It is difficult to be more random than that.

But say you do not have the means to precisely measure electron fluctuations from a high powered laser beam, or your dad refuses to lend you his collection of Grateful Dead themed lava lamps stored in his garage.  Or say you do not wish to incur the monetary and time delay costs of a server-side operation.  Client-side solutions in this space exist, typically relying on user interactions as a source of noise.

It is in this space that I created a solution named [Winkler](https://github.com/ndonolli/winkler), affectionally named for Phandalin's town master whom our party accidentally, uh, kidnapped and held hostage.  Winkler does not rely on user interactions as to not awkwardly depend on the DOM.  It instead utilizes a solution similar to the unix `/dev/random/` tools, blocking and performing floating-point operations as a measurement of the system.  This is much more lightweight and simple, and it works quite well with the lazy evaluation model of clojure's sequence operations, as well as its first-class asynchronous channels.

It is both tiring but fitting that the conclusion of my journey led me to a simple solution after traversing a vast world of strange complexities and resources.  I would not recommend Winkler as a one-size-fits-all solution for client-side cryptography, but with new, standardized js namespaces like `window.crypto` (and its node.js equivalent) I hope this can provide some usefulness in the clojure(script) space.  

And as for dice, I don't think they will ever be fair to us - no matter how much work is put into its power.  Moving forward, I can only head the immortal advice of my favorite fantasy character:

![All we have to decide is what to do with the time that is given us.](/static/img/gandalf-time.jpg "gandalf time")