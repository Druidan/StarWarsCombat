# Star Wars Combat

## What is it?
This game, "Star Wars Combat", is a sequential combat game, using buttons to initiate combat with stat-based interactions, based in the "Star Wars" Universe.

## The Purpose of the Game
This project is meant to be a fun little demonstration of using Javascript to manipulate HTML using objects and functions.

## Outstanding Issues:
* The audio overlaps at times, probably because the event listeners and variable states are global and not specific to each sound, and so the end of one sound can trigger the true/false statement for when audio is playing, even while other audio files are playing.
* The audio balancing is off. Some sounds, most notably the voices, are too low when compared to the lightsaber effects.

## Notable References:
* The piece of code that causes audio event capturing came from the Webshim Library at "http://afarkas.github.io/webshim/demos/index.html" through saml's answer to a question on stackoverflow at "https://stackoverflow.com/questions/11291651/why-dont-audio-and-video-events-bubble".