---
title: New Booking Flow
date: 2020-01-09T02:30:47.781Z
author: Nathan Donolli
summary: A modern client-facing booking flow for tour and activity events
---
As an engineer at [GoDo.io](godo.io), a SaaS company in the tour and activity space, there was never a dull day constantly designing techy solutions for an industry in high demand for them.   My team and I learned a lot and put in some good work.

I had the opportunity to greenfield a brand new modern booking flow, customizable for use on client sites.  Although a deceptively basic tool for customers, it’s design, as I realized, necessitated much thought and care. There exists a good degree of logical paths and changing app state, as well as a demand for exceptional UX across devices in order to maintain a high conversion rate with end users.

![booking flow](/static/img/booking-flow-screenshot.png "booking flow")

The new booking flow was built and deployed as a standalone node app serving an Angular 7 application.  The project was developed in tandem with a new public RESTful (mostly) API web server. Both were deployed on Azure via app containers, and there were hardly any issues with downtime, scaling, or deploying throughout its development and lifecycle.

The previous booking flow suffered from bugs involving corrupted state, which in rare cases would charge incorrect amounts to the customer. To achieve a 100% success rate, I needed functional state management on the client and strict idempotency on the server. 

A flat, global app state was an ideal choice for the client. There are many instances where a changed state would alter the overall direction of the booking lifecycle and affect the data on other views. I chose ngrx, which implements the flux architecture but exposes the API through RxJS observables to stay within the Angular paradigm. 

The benefits, for this case, were night and day.  You can have lamba-calculus level confidence  rendering views based off immutable state, which is the main selling point.  But the developer benefits are the real secret weapon.  Time travel debugging, a maintainable event dispatch system, and improved testing do wonders when developing within a deep forest of many conditionals.  There are tradeoffs of course, the main one being the burden of boilerplate.  And there is no framework for the designation of events - it must be maintained with a conviction to not break convention.

With this in place, the front end was well equipped to be reactive to the data received from the back end.  A major issue of the legacy booking flow was that the “shopping cart” state was kept client side. I moved nearly all business logic and validations server-side and was able to gather much more abandoned cart data for our CRM.  Only UI state and service data was used for rendering client side.

The non RESTful resources of the API were secure endpoints responsible for securely managing credit card payments handled via a third party payment processor.  The system was built platform agnostic, although only Stripe and Square were the only processors used in production.  Token-based authentication was used for sessions and as another mechanism to manage server-side state.

The whole booking flow was initiated via a JavaScript snippet we provided clients to use on their site, which is standard. The booking flow was designed mobile-first with an emphasis on responsiveness.  It was contained in a lightbox even on small viewports, which was pretty rare among our competitors (most just redirected). 

The UX design and the ideas behind them could be an entirely new post in itself and I might go into it one day.  In short, the flow and structure of the booking flow was primarily informed by the industry experts I had on my team with much experience in direct sales in the tour and activity space.  As far as look and feel we adopted the good parts of material design (meaningful animation, dP) into the UI.  The flow was designed to be as visually linear as possible. Consistency across browsers was difficult at this stage, but it paid off. We nearly doubled the conversion rate.

At GoDo.io we felt a strong responsibility to listen and iterate quickly to solve problems for our clients, many of whom were fed up with the bullying of major players in the event SaaS space.  As such, the decision to start from scratch with such core components of our software suite was a difficult to push, as it would delay other crucial projects. The customer facing booking flow, along with the revitalized API and feature-heavy booking flow on the admin side, were delivered timely enough to offer much value to the company and its customers.  And thankfully, the tools were built to last.