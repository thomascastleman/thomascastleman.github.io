---
layout: project
title: Stew 3000
year: 2021
---

<p>As a capstone project, my friend <a href="https://github.com/stew2003">Stewart Morris</a> constructed
an 8-bit computer made from breadboards, inspired by <a href="https://eater.net/">Ben Eater's</a>
project. We decided to further expand both the hardware and the software it is capable of
running, which led to what we are calling the "Stew 3000": an 8-bit computer with a compiler,
assembler, loader, and emulator.
</p>

<img width="90%" src="/projects/stew3000/stew-3000.jpg"/>
<p class="caption">The 3000, early August 2021.</p>

<h3>Hardware</h3>
<p>Here is a bit about the hardware itself. The Stew 3000 has:</p>
<ul>
    <li>256 bytes of program memory (for storing code)</li>
    <li>256 bytes of memory for a runtime <a href="https://en.wikipedia.org/wiki/Call_stack">stack</a></li>
    <li>Three general purpose <a href="https://en.wikipedia.org/wiki/Processor_register">registers</a>
    (A, B, and C), a stack pointer register (SP), and a program counter register</li>
    <li>Four flags:
    <a href="https://en.wikipedia.org/wiki/Negative_flag">sign flag</a>,
    <a href="https://en.wikipedia.org/wiki/Zero_flag">zero flag</a>,
    <a href="https://en.wikipedia.org/wiki/Carry_flag">carry flag</a>, and
    <a href="https://en.wikipedia.org/wiki/Overflow_flag">overflow flag</a></li>
    <li>A display capable of displaying 3-digit decimal numbers</li>
    <li>An LCD display capable of displaying strings</li>
</ul>

<h3>Software</h3>
<p>On top of this architecture, we have put together an instruction set that supports
over 200 instructions. Our assembler converts textual assembly programs written with the
supported instruction set into binaries that consist solely of bytes that can be loaded
into the actual machine's memory.
</p>

<p>Our compiler allows users to program the 3000 in a C-like high-level language, using
features like types, pointers, strings, arrays, and functions. This high-level code
is compiled down into 3000 assembly, with a goal of producing small programs that will
fit into the machine's 256 bytes of program memory.
</p>

<h3>Documentation and Source</h3>
<p>We have set up a <a href="https://github.com/stew2003/Stew-3000/wiki">wiki</a> for the Stew 3000,
where we hope to provide more in-depth documentation. If you are curious please check that out!
</p>

<p>The project source can be found <a href="https://github.com/stew2003/Stew-3000">here</a>.</p>