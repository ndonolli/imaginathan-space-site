---
title: Infinite seqs for infinite geeks
date: 2020-06-21T10:38:10-05:00
summary: Don't fear the jvm stack, it won't blow
author: Nathan Donolli
tags:
  - clojure
  - code katas
---

Let's do a code challenge:

> _Given a rows x cols screen and a sentence represented by a list of non-empty words, find how many times the given sentence can be fitted on the screen?_

Notes:
- A word cannot be split into two lines.
- The order of words in the sentence must remain unchanged.
- Two consecutive words in a line must be separated by a single space.

### Example:
```
Input:
rows = 3,
cols = 6, 
sentence = [“a”, “bcd”, “e”]

Output: 2
   
Explanation:
   a-bcd-
   e-a---
   bcd-e-

The character ‘-’ signifies an 
empty space on the screen.

Expected Results:

| rows | cols | sentence       | output |
|------+------+----------------+--------|
|    2 |    8 | hello world    |      1 |
|    3 |    6 | a bcd e        |      2 |
|    4 |    5 | I had apple pi |      1 |
```

This problem was posted by [George Mauer](http://georgemauer.net/) to a local slack group and he wrote up an analysis [here](https://github.com/togakangaroo/daily-programmer/tree/master/sentence-screen-fitting).  He solves it efficiently with generators and also proposes an additional solution that cleverly uses _mAtHmAtIcS_ to calculate when the original pattern would repeat and dividing based on that amount.  

Whatever.  I didn't get into computer science so I could do more math problems.  I got into this business to make the computers work for _me_.

Generators, enumerables, whatever you choose to call them are common and indespensable tools in most programming languages.  Whether you prefer stateful cursors or not, enumerability is just the way to go when dealing with large datasets or potentially time-consuming algorithms.  This problem is no exception.

In clojure, most sequential operations (that is, functions that work on the polymorphic `seq` interface) are lazy. This means that pretty much any application of map, reduce, etc. produces an object akin to a generator in other languages, without needing to be explicit.  It is a powerful aspect of the language which can fundamentally simplify how developers approach problems, since it encourages utilizing a more declarative approach to working with sequential data structures.

But enough with the sales pitch.  I want to show how you can use lazy sequences to solve a problem like this.  There are some core clojure functions like `(range)` that, if used irresponsibly, will fry the JVM since it will produce infinitely.  We will be careful and use infinity to our advantage.

There's a useful function named `(cycle)` that produces an infinitely lazy-seq of any collection that we could use on our word list.  We will likely use a thread-last macro and this can be our main starting point:

```clojure
(defn sentence-fit-count [rows cols sentence]
  (->> (cycle sentence)))

​(take 4 (sentence-fit-count 2 8 ["hello" "world"]))
;; =>> ("hello" "world" "hello" "world")
```

Note that to currently test, we use `(take 4 ...)` to realize our seq and not blow the stack.

We can now focus on logic to determine how much space each subsequent word will take, when it will require a new line, and when a full sentence cycles.  If I were dealing with a finite vector of words, I could reduce the list into some sort of object tracking the state of columns and rows used, as well as how many words were printed. But seeing as we are starting with an infinite series, this is not as straightforward.

Thankfully, clojure has another function `(reductions)` which produces a lazy sequence of what applying a reducer on _another_ sequence would produce.  Pretty darn cool!  We are still in the realm of infinity and have so far declaratively laid out how to logically walk through the problem (without actually doing it).

```clojure
(defn sentence-fit-count [rows cols sentence]
  (->> (cycle sentence)
       (reductions 
		 (fn [[row-count spaces words] word]
           (let [word-space (inc (count word))
                 word-list (conj words word)]
             (if (>= spaces word-space)
               [row-count (- spaces word-space) word-list]
               [(inc row-count) (- cols word-space) word-list])))
         [1 cols []])))

;; we can test this in a repl, but remember, 
;; it's still returning an infinite sequence!
```

It would seem a good time to tell our procedure how long to take from this endless series of reductions.  Remember, each element in this series is a vector tracking how many rows and columns have been used per sequential word.  Our `rows` and `col` parameters determine our limit. We should pass this logic into `(take-while)` so we can realize our infinite sequence and put a terminator on it. 


```clojure
(defn sentence-fit-count [rows cols sentence]
  (->> (cycle sentence)
       (reductions 
		 (fn [[row-count spaces words] word] (...) )
         [1 cols []])
       (take-while 
         (fn [[row-count col-count]] 
           (and (<= -1 col-count) (>= rows row-count))))))
```

Now we can grab the last element in this series to find our final state. The last element in the vector is simply a list of all the words we "printed".  It's trivial to use `(partition)` and general division (math strikes again) to calculate how many sentences were ultimately printed.  We now have a full solution!

```clojure
(defn sentence-fit-count [rows cols sentence]
  (->> (cycle sentence)
       (reductions 
		 (fn [[row-count spaces words] word]
           (let [word-space (inc (count word))
                 word-list (conj words word)]
             (if (>= spaces word-space)
               [row-count (- spaces word-space) word-list]
               [(inc row-count) (- cols word-space) word-list])))
         [1 cols []])
       (take-while 
         (fn [[row-count col-count]] 
           (and (<= -1 col-count) (>= rows row-count))))
       last last
       (partition (count sentence))
       (count)))
​
(sentence-fit-count 2 8 ["hello" "world"]) ;; => 1
(sentence-fit-count 3 6 ["a" "bcd" "e"]) ;; => 2
(sentence-fit-count 4 5 ["I" "had" "apple" "pi"]) ;; => 1
```
Clojure's baked-in laziness is not accidental, and coerces one into thinking outside the box of imperativeness that is the foundation of many other languages.  This does not mean that imperative procedures should be a thing of the past, or that state should be completely avoided. In fact, clojure provides mechanisms to work with these paradigms because it recognizes the hard truth of working with real-world problems. But laziness _can_ be used to solve real problems. By allowing us to embrace the concept of infinity, the possibilities seem limitless.