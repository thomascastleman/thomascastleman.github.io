---
layout: project
title: The Rose
year: 2018-19
---

<p>For the 2019 production of <i>Beauty and the Beast</i> at St. 
Anne's-Belfield school, I worked together with Mariah Payne to 
create a digital piece that would enhance the performance.</p>

<p>We decided to build a digital rose animation that would change over
the course of the show and augment key scenes with timed visual effects.</p>

<p>For a visual demonstration of the rose, check out 
<a href="https://youtu.be/ZjnsLT1vo_4" target="_blank">this video</a>.</p>

<img width="100%" src="/projects/rose/live-rose.png">

<p>The rose was created using 
<a href="https://processing.org/" target="_blank">Processing</a>. The actual
shapes of the rose petals/stem were transferred into Processing by tracing 
actual images with the mouse to get coordinates that could be turned 
into primitive polygons.</p>

<p>There is an unfortunate amount of hard-coded polygon coordinates in the 
source, but this prompted later work on 
<a href="/projects/lowpoly" target="_blank">automatic generation of low poly images</a>.</p>

<p>The following features were implemented:</p>

<ul>
<li>
    Fading of colors / shrinking of parts of the rose smoothly over
    the duration of the show.
</li>
<li>
    Falling petals, with particle system glitter.
</li>
<li>
    A dramatic shattering effect for when the Beast dies and the last 
    petal falls.
</li>
<li>
    A reconstruction effect from the shattered state, for when the Beast
    transforms into a human. Complete with a fountain of glitter.
</li>
<li>
    Emergency reset, in case an effect is triggered accidentally 
    at the wrong moment in the performance.
</li>
</ul>

<p>For the actual production, the rose sketch was projected onto a side wall
of the theater, and operated by a crew member up in the catwalk. We simply
put Processing on a school laptop and implemented key commands that allowed
the operator to control the effects.
</p>

<img width="100%" src="/projects/rose/rose-in-production.jpg"/>
<p class="caption">Photo courtesy of St. Anne's-Belfield.</p>

<p>Unfortunately, the camera had trouble picking up a clear shot of the
the rose, but it was quite crisp in person.
</p>

<p>The source is 
<a href="https://bitbucket.org/thomascastleman/beauty-and-the-beast-rose/src/master/"
    target="_blank">
    here</a>.</p>
