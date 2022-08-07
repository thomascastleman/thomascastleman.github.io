---
layout: project
title: Low Poly Images
year: 2019-20
---

<p>In April 2019 I started working on a program to filter images to
look as though they were rendered with a 
<a href="https://en.wikipedia.org/wiki/Low_poly">low poly mesh.</a>
</p>

<img width="100%" src="/projects/assets/boarshead.png">

<p>The software creates an approximation using colored triangles that form 
a mesh spanning the entire dimensions of the source image. The technique 
I devised to accomplish this is described below:</p>

<ol id="low-poly-procedure">
<li>A set of points is laid over the image, with clusters of more points 
    in areas where more detail occurs. (This is accomplished using 
    <a href="https://www.cs.princeton.edu/courses/archive/spring20/cos226/assignments/seam/specification.php" target="_blank">dual-gradient energy</a> 
    and placing points probabilistically based on the amount of energy at a given pixel)</li>
<li>A <a href="https://en.wikipedia.org/wiki/Delaunay_triangulation" target="_blank">Delaunay 
    triangulation</a> is generated from this point set (using the 
    <a href="https://en.wikipedia.org/wiki/Bowyer%E2%80%93Watson_algorithm" target="_blank">Bowyer-Watson algorithm</a>).</li>
<li>The triangulation is then colored by first blurring the source image, then using the color 
    of the pixel at each triangle's centroid to color that triangle (credit to Johnny Lindbergh for this idea). This has an effect similar 
    to averaging the colors of the pixels contained within each triangle.</li>
</ol>

<img id="arch-low-poly" width="100%" src="/projects/assets/arch-poly.png">

<p>The source for this project can be found 
<a href="https://github.com/thomascastleman/low-poly" target="_blank">here.</a></p>
<p>A gallery of low poly images generated with this script is 
now available at <a href="/graphics/lowpoly">this page</a>.</p>

<p>I have also finished a working version of this image processor on the web, 
which allows you to upload your own images and turn them into low poly versions. 
This can be accessed <a href="/graphics/low-poly-online">here</a> and the source 
is <a href="https://github.com/thomascastleman/low-poly-online">here</a></p>
