---
layout: project
title: Harmonic Interpreter
year: 2018
---

<p><a href="/projects/assets/writing/An_Algorithm_for_the_Interpretation_of_Jazz_Harmony.pdf" target="_blank">An Algorithm for the Interpretation of Jazz Harmony</a></p>

<p>In an effort to create music visualizations that are sensitive to the qualities of the harmony being played, 
I tried to algorithmically classify sets of notes based on their harmonic qualities.</p>
<p>The above paper details my approach, which involves interpreting the notes with every possible root, 
and then scoring each interpretation based on the presence or absence of certain intervals, the importance 
of which is specified through parameters.</p>

<video width="100%" style="margin-bottom: 10px" controls>
    <source src="/projects/assets/interpreter.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
<i>A demo of live chord interpretation using my algorithm</i>

<p>I have already implemented a Processing sketch which takes MIDI input 
from a keyboard and displays twelve interpretations, which can be 
found <a href="https://github.com/thomascastleman/midi-harmony-interpreter" target="_blank">here</a>.</p>

<p>This technology has potential to be used to design visualizations that respond to the 
intricacies of the harmony being played.</p>
