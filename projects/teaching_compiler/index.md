---
layout: project
title: Teaching Compiler
year: 2021
---

<p>In April 2021 I wanted to try teaching some of the ideas and techniques I had learned
from taking a course on compilers. My goal was to create a reasonable compiler project that would 
put the focus on generating code, as opposed to a particular architecture.
</p>

<p>The result is <a href="https://github.com/thomascastleman/teaching-compiler">this repository</a>, 
which contains support code as well as a demo implementation of a compiler for a basic source 
language targeting a made-up architecture of my own design. I used this to teach my dad about 
the basics of compilers.
</p>

<p>The project is implemented entirely in Python, as this was a language my dad was familiar with.</p>

<h3>Source Language</h3>
<p>The README documentation is actually pretty thorough, so I won't say much here, but the source 
language processed by the compiler is a small language capable of simple arithmetic, conditionals,
variables, and functions.
</p>

<p>As an example, here is a function that computes Fibonacci numbers:</p>

```lisp
; computes the nth fibonacci number (0-indexed)
(def (fib n)
  (if (= n 0)
    1
    (if (= n 1)
      1
      (+ (fib (- n 1)) (fib (- n 2))))))
```

<h3>Target Language</h3>
<p>The target for the compiler is an assembly language dubbed rasm, for Randy's (my dad) assembly.
It supports basic arithmetic, comparisons, jumps, and call/return instructions.
</p>

<p>The architecture which implements this instruction set is made-up as well, and is implemented 
as a virtual machine. The machine has three registers (an "answer" register, a stack pointer register,
and a instruction pointer register), two flags (one indicating equality, the other the "less than" 
relationship between compared operands), and a stack with 10,000 locations.
</p>

<p>I recommend reading the code in the <code>/rasm</code> directory if you are interested in 
the assembly language / virtual machine.</p>
