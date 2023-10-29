# SpookyType

#### Video Demo: https://youtu.be/soIK_Jfjjz0
#### Description: Simple touch typing with some selected spooky texts from Project Gutenberg. 

#### text_paragrapher.py
This file will take a text file input (a book from Project Gutenberg) and complete an in place replacement of text such that all the multiline paragraphs become single line paragraphs. 

#### text_db_entry.py
This file will read a paragraphed text file identified from command line second argument and then import it into the books db. 
TODO: Redo the difficulty calculator as the current one uses a reading difficulty not typing dificulty option. 

#### app.py
Runs a simple flask app that will serve a single paragraph, that is extracted from the file books.db, at a time to web page. The webpage is constructed with jinja templates. 

#### books.db
Contains the book entries, data storage used to generate the strings that the user is presented with.

#### templates/ 
Contains layout.html, a basic layout with html header and container for the content and index.html which contains a jinja template to complete pushing the letters to the page. Each letter is assigned its own span tag, and this is used later to for the javascript functions. The form input hidden from the user, and is simulated by adjusting each element on the page by js. 

#### static/styles.css
Some html styling to theme the page itself.

#### static/main.js
The main application. Holds a global object that is used to store and represent state. Functions within this file:
* assign IDs to each letter
* read keyboard input to validate whether the key entered matches the current position of the cursor. 
* simulate a cursor by dynimally assigning a class to an html element
* calculate errors
* calculate words per minute
* represent the words per minute to the user by dynamically updating the content of the page
* show and hide some html elements as needed


Credit : Project Gutenberg. (n.d.). Retrieved October 2023, from www.gutenberg.org.
