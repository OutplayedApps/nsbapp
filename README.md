# Science Bowl App
Download the app for both iOS and Android over here: http://outplayedapps.com/science-bowl/

<img src="http://outplayedapps.com/wp-content/uploads/2017/04/android1.png" width="200">

## Inspiration
The [National Science Bowl](https://science.energy.gov/wdts/nsb) is a competition for high schoolers and middle schoolers nationwide conducted by the Department of Energy. There are many study sets available for teams to practice. However, when practicing with my team, I realized that it would be easier if we had an app which let us practice individual questions individually, and narrow down questions to  a specific category or difficulty. And this app was born!

## What it does

### Authentic Questions
This app uses authentic questions from the National Science Bowl website to help prepare teams for practice, let individuals practice questions of a specific subject or difficulty, and just to let people learn science!

### Reader Mode
In Reader Mode, tossups and bonuses will all appear at once. This is ideal for coaches reading questions to different teams during actual rounds at practice or tournaments. The app has a timer feature built-in for both tossups and bonuses.

### Game mode
In Game Mode, tossups and bonuses will be read to you as if it’s an actual science bowl round. This is good for players who are practicing questions by themselves, as you can select by category or by difficulty.

### Ready to Go
The app is completely free for teams to use. It’s perfect for use on the go while traveling to tounaments.

## How I built it
This app uses version 1 of the [Ionic Framework](https://ionicframework.com/). Ionic lets you make a cross-platform mobile app by using technologies such as HTML5, CSS3, and Angular JS. Additionally, it uses [https://firebase.google.com/](Firebase) for the backend.

### Steps
1. I had to get the questions from the National Science Bowl website. Since they are in PDF format, I used a PDF Parser (pdf2json) to convert PDF to text using a [script in Node JS](https://github.com/epicfaace/nsbapp/blob/master/node%20server/upload.js).
2. Then, the PDF had to be parsed for words such as "TOSSUP:" and "BONUS:" to correctly create a [https://github.com/epicfaace/nsbapp/blob/master/node%20server/output-full.json](JSON file of questions.) The database has around 6000 questions in total!
3. I uploaded the file to the Firebase database. 
4. Developed the app using Angular and Ionic components.
5. Testing and fixing bugs!

This whole process took around 1-2 weeks in January 2017 (during winter break).

## What's next
I am planning to add additional content, such as extra practice questions or study guides!
