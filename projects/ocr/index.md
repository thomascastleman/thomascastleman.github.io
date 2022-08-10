---
layout: project
title: Character Recognition
year: 2018
---

<p>As my friend <a href="https://github.com/johnnylindbergh" target="_blank">Johnny Lindbergh</a> completed research on the use of neural networks in machine learning for his senior capstone project, we decided to experiment 
with building a simple neural network from the ground up--mostly to test our 
understanding of the math taking place in algorithms such as gradient descent.</p>

<p>The result of our labors is 
    <a href="https://github.com/thomascastleman/fancy-regression" target="_blank">this network,</a> 
    a digit classifier capable of recognizing handwritten digits (from the MNIST dataset) with 89.1% accuracy, written 
    from scratch.</p>

<p>This project deeply improved my understanding of both the C language 
and the calculus used in backpropagation. While there are certainly many improvements / optimizations 
that could be made to this network, it served its purpose of laying the foundations of my understanding 
of machine learning methods.</p>

<img width="100%" src="/projects/assets/digitclassifier.png">

<p>I also wrote a p5.js sketch (shown above) to take 
handwritten input, pass it through the net, and display the classification output vector. 
This demo can be found <a href="/graphics/ocr" target="_blank">here</a>.</p>
