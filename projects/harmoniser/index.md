---
layout: project
title: Harmoniser
year: 2018-19
---

<p>In late 2018, <a href="https://github.com/johnnylindbergh" target="_blank">Johnny</a> and I 
started working on an audio processor that would harmonize 
live vocals with the notes specified by a MIDI controller. I took 
inspiration from the harmoniser built for Jacob 
Collier, which was created at MIT by <a href="https://ben.ai/" target="_blank">Ben Bloomberg</a>.</p>

<img id="wave" src="/projects/assets/psolawave.jpeg" width="100%" style="padding-bottom:0.5em;"/><br>
<i>A vocal sample visualized with a script we used to test our peak finding algorithm</i>

<p>Our harmoniser, the source for which can be found 
<a href="https://github.com/Castleman-Lindbergh/harmoniser" target="_blank">here</a>, 
interfaces with a microphone and MIDI keyboard. It works as follows:</p>

<ol>
    <li>The pitch (if any) of the input signal from the mic (the vocal track) is detected</li>
    <li>Several copies of this signal are made, one for each note coming through
    the MIDI keyboard</li>
    <li>These signals are each pitch-shifted (using a technique called 
    <a href="https://en.wikipedia.org/wiki/PSOLA" target="_blank">Pitch Synchronous Overlap and Add</a>) to the corresponding 
    frequency of those MIDI notes</li>
    <li>All the signals are then averaged back 
    together into one, which is played back.</li>
</ol>

<p>The result is a really interesting layered vocal track that matches the notes 
held on the MIDI keyboard.</p>

<h3>Demos</h3>

<iframe width="560" height="315" style="margin-bottom: 20px"
src="https://www.youtube-nocookie.com/embed/4izDn3Xud3k" frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen></iframe>

<p>We even incorporated this harmoniser into a tune. Listen 
below (as of now, unnamed, featuring Matt Wyatt, David Argo, & Thomas Castleman).</p>
<audio
    controls
    style="width: 100%"
    src="MelonGong_2019Jan21.m4a">
        Your browser does not support the
        <code>audio</code> element.
</audio>
