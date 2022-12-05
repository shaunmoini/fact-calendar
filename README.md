# Fact Calendar

A calendar app that displays facts pertaining to the selected day. Developed using React and the [Numbers API](http://numbersapi.com/)

Note that the numbers API does not support HTTPS, and therefore the deployment on GitHub pages is not functional. This is due to the fact that GitHub pages serves the application over HTTPS, while the application makes plain HTTP requests to the numbers API, thus resulting in blocked requests and mixed content errors.