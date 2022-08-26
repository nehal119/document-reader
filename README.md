Document Reader (MCA minor project)
===============

Document Reader is a web app to access documents from anywhere.

Currently it supports only pdf files.

It embeds a HTTP server that implements API and serves a simple HTML page that uses them through HTTP requests.

Authentication is done using hardcoded data but the logic can be extended to implement auth0, firebase or simple JWT + Database

Build :
=======
Client
------
  ```sh
  yarn install
  yarn start
  ```

Server
------
  ```sh
  yarn server
  ```

Dependencies :
==============
* React 17
* Node JS 14+

Milestone :
==============
* Editing files
* Merging files
* Highlight within file
* Sharing files externally
