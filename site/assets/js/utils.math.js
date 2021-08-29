
//////////////////////////////////////////////////////////////////////////
//
//  # random()
//
//////////////////////////////////////////////////////////////////////

// https://www.joshwcomeau.com/snippets/javascript/random/

// In JavaScript, we can generate random numbers using the Math.random()
// function. Unfortunately, this function only generates floating-point
// numbers between 0 and 1.
//
// In my experience, it's much more common to need a random integer
// within a certain range. For example, a random number between 10 and 20.

export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;










