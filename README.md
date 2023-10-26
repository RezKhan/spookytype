# spookytype

Simple touch typing with some selected spooky texts from Project Gutenberg. 

## paragrapher.py
This file will take a text file input (a book from Project Gutenberg) and complete an in place replacement of text such that all the multiline paragraphs become single line paragraphs. 

## helpers.py
This file will read a paragraphed text file identified from command line second argument and then import it into the books db. 
TODO: Redo the difficulty calculator as the current one uses a reading difficulty not typing dificulty option. 

## app.py
Runs a simple flask app that will serve a single paragraph at a time to web page. The webpage is constructed with jinja templates. 

## books.db
Contains the book entries, data storage used to generate the strings that the user is presented with.

## templates/ 
Contains layout.html, a basic layout with html header and container for the content; and index.html which contains a jinja template to complete pushing the letters to the page. The form input hidden from the user, and is simulated by adjusting each element on the page by js. 

## static/styles.css
Some html styling

## static/main.js
The main application. Holds a global object that is used to store state. A number of functions that do everything from assigning html element ids to calculating the time between user interaction.


Project Gutenberg. (n.d.). Retrieved October 2023, from www.gutenberg.org.
