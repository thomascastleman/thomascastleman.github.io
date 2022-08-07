---
layout: project
title: Pyret Moss
year: 2020
---

<p><i>Pyret Moss</i> is a command-line application for determining similarity between
programs written in <a href="https://www.pyret.org/" target="_blank">Pyret</a>, 
intended for use in plagiarism detection.</p>

<p>The source is <a href="https://github.com/rpaul48/pyret-moss" target="_blank">here</a>! 
Created by myself and <a href="https://github.com/rpaul48" target="_blank">Raj Paul</a>.</p>

<h3>Background</h3>

<p>Pyret Moss is inspired by/a derivative of Alex Aiken's 
<a href="https://theory.stanford.edu/~aiken/moss/" target="_blank">"<b>M</b>easure <b>o</b>f 
    <b>S</b>oftware <b>S</b>imilarity"</a> 
system, which runs as a web service and is used by many CS departments to detect cheating in their courses.</p>

<p>The core idea of Aiken's Moss, that of document fingerprinting, is detailed in 
<a href="https://theory.stanford.edu/~aiken/publications/papers/sigmod03.pdf" target="_blank">
    this paper</a> which we drew from heavily. There is some reference to the actual
    Moss system at the end of the paper, but it's not much, so we ended up adopting
    the fingerprinting idea but making up much of the rest of our approach.
</p>

<h3>Core Idea: Fingerprinting</h3>

<p>At the center of the Moss system is its use of the technique of fingerprinting. 
Essentially, Moss works by:
</p>

<ol>
<li>Fingerprint submissions
    <ol>
    <li>Hash all substrings of length <i>k</i> in every document</li>
    <li>Algorithmically select <i>some</i> of these hashes to be the "fingerprints" of that document</li>
    </ol>
</li>
<li>
    Compare fingerprints of each submission. If two submissions share many fingerprints, there is likely 
    significant overlap in their content.
</li>
</ol>

<p>In addition to their substring hash, fingerprints can carry information about
what position (whether it be lines/character ranges) in the original text they correspond to.
This allows results to point to the specific areas of submissions that were found to be
similar, thus alerting the user where to inspect further.
</p>

<p>For instance, here's some output from our system:</p>

<img src="/projects/pyret_moss/pair_table.png" width="550">

<p>The first row alerts the user that lines 1-12 of main.arr from sub1/ "match" with
lines 1-13 of main.arr from sub3/, so they might want to inspect those areas of
each submission to determine if plagiarism did indeed occur.
</p>

<h3>What should be considered similar?</h3>

<p>What if I were to take someone else's program, inject whitespace all over,
and rename every identifier so the copy bears little resemblance to the original
at first glance?</p>

<p>Our system should catch this—and indeed, for this very reason, we have several
preprocessing steps in place to "normalize" programs before they are fingerprinted.
</p>

<p>Fingerprinting works by hashing substrings, right? So, for plagiarism to be 
detected, significant amounts of matching substrings must be detected. Therefore,
our goal in normalizing has been to immunize the system against any program transformations
someone could use to <b>effectively alter the program text in many places</b> (thereby
disrupting matching substrings) while <b>not altering the meaning of the program</b>
(thereby still reaping the benefits of having copied the work in the first place).
</p>

<p>We do this through 5 transformations, all with the intent 
of eliminating differences between programs that shouldn't be considered important:
</p>

<table>
<tr>
    <th width="160px">Transformation</th>
    <th>Why?</th>
</tr>
<tr>
    <td>Normalize identifiers</td>
    <td>So you can't get away with just renaming variables.</td>
</tr>
<tr>
    <td>Remove type annotations</td>
    <td>Pyret's type annotations are optional, meaning types could be easily
    injected/removed, to the detriment of matching substrings.
    </td>
</tr>
<tr>
    <td>Remove whitespace</td>
    <td>Whitespace can also easily be injected (or removed) pretty much anywhere.</td>
</tr>
<tr>
    <td>Remove docstrings</td>
    <td>Docstrings are less of a concern due to their more restricted usage,
    but they still don't affect program meaning and shouldn't differentiate 
    programs.
    </td>
</tr>
<tr>
    <td>Remove comments</td>
    <td>Like whitespace, can be easily injected/removed.</td>
</tr>
</table>

<p>As an (unrealistically small) example, consider the following two programs:</p>

<b>original.arr</b>

<!-- Using Python syntax highlighting here because it works pretty well -->

```python
fun evens(l :: List<Number>) -> List<Number>:
  doc: "Produces a list of the even numbers in l"
  l.filter(lam(n): num-modulo(n, 2) == 0 end)
end
```

<b>copied.arr</b>

```python
fun only-even-nums(input):
  doc: "Get only the evens from the input list"
  input.filter(
    lam(num :: Number) -> Boolean:
      num-modulo(num, 2) == 0
    end)
end
```

<p>The copied.arr version has employed several tricks. However, once normalized,
both programs appear identically as:</p>

```python
funv(v):v.v(lam(v):v(v,2)==0end)end
```

<p>As a result, the copy will likely be detected.</p>

<h3>What about presenting overlap?</h3>

<p>Once we've determined which pairs of submissions share enough fingerprints
for there to be suspicion of plagiarism, we'd like to present this overlap 
to the user. The goal is, after all, for them to check out more thoroughly 
the matching spots pointed out by Moss—we just narrow down where to look.</p>

<p>The fact is, however, matching <i>fingerprints</i> just aren't very meaningful
to the user. To show overlap in submissions, we could just display 
each fingerprint that matches and show which parts of files in each submission 
it matched with, but this leaves much to desire.</p>

<p>Not only could this get unwieldy as the noise/guarantee threshold are tweaked,
but by treating the fingerprints in isolation, we're actually ignoring the fact that
where and how fingerprints show up is quite important.
</p>

<p>Consider for a moment a pair of submissions, A and B:</p>

<style>
/* on hover, show the substring markings */
#subs:hover {
    content: url("/projects/pyret_moss/pair_substrings_marked.png")
}
</style>
<img id="subs" src="/projects/pyret_moss/pair_unmarked.png" width="200">

<p>Shared fingerprint hashes are shown in red. You may notice that, in fact,
many of the shared fingerprints don't show up alone, but are part of larger
substrings that are shared. <i>(If you hover over the above image, you can see
some of these shared substrings highlighted)</i>
</p>

<p>This is no coincidence: in fact, we expect such substrings to appear in
instances of plagiarism. Because fingerprints come from a process of 
<i>hashing consecutive substrings</i>, if a significant portion of a 
document has been copied, then we should expect to see not just one,
but maybe two or three or many matching fingerprints show up in sequence.
The size of such substrings is salient: the longer the substring, the 
larger the section that has been copied.
</p>

<p>So, how do we present overlap to the user?</p>
<p>By analyzing shared substrings of fingerprints, with the goal of 
upholding the following property:
</p>

> <i>If a fingerprint is shared, then one of the longest common
> substrings that includes that fingerprint appears in the output.</i>

<p>Longest common substrings are chosen so that we maximize the matching regions
in which each fingerprint is found: the idea is the display each fingerprint in
its <u>largest matching context.</u>
</p>

<p>(It's important to note here that fingerprints each come from distinct places,
and therefore while multiple fingerprints with the same hash may 
show up in one submission, this does not mean the fact that there are multiple
or where they appear isn't important.
</p>

<p>For example, consider the two fingerprints in submission B above with hash 11.
If we were to report only the substring [48, 11] which includes the 11-fingerprint
in document c, we would be leaving out altogether the fact that part of document e
matches with document b from submission A. This could be an instance of plagiarism,
so it would be unacceptable to omit as such.)
</p>

<h3>Substring Analysis</h3>

<p>How do we identify such substrings between submissions then? Thankfully,
the <a href="https://en.wikipedia.org/wiki/Longest_common_substring_problem" target="_blank">
longest common substring problem</a> is plenty well-researched, and can be solved
efficiently with dynamic programming.
</p>

<p>For our purposes, we want not <i>one</i> longest common substring (LCS),
but <i>several</i>, each which are "longest" relative to some shared fingerprint.
Three observations come in handy here:</p>

<ol>
<li>For all intents and purposes here, a submission is really just a string of
    the fingerprint hashes that appear in its documents, with the documents delimited somehow
    (substrings that cross documents aren't meaningful)
</li>
<li>We don't want just one LCS, but hey, the dynamic programming table for LCS computes <i>all</i>
common substrings.</li>
<li>The longest common substring that includes a particular element of either input string
    can be easily found by examining the row (or column) in which that element occurs.
</li>
</ol>

<p>Convenient! This means we can compute all the information we need to choose
substrings by computing the LCS table using as input strings all hashes in A 
against all hashes in B.
</p>

<p>Illustrated:</p>

<img src="/projects/pyret_moss/substring_table.png" width="525">

<p>The hashes for A appear along the rows, for B the columns. Documents are delimited
by a special symbol, which zeros out its row/column as a special rule to prevent
substrings from reaching across document boundaries. Thus each white 
rectangle cluster of cells between the gray lines can be thought of as a comparison of one
document from A with one document from B.
</p>

<p>The chosen substrings are shown in orange, green, blue, and purple. These
could then be rendered in a table with a description of which line numbers
each substring covers, and a note of how long the substring was (its length
per se isn't meaningful, but the relative lengths are). This is exactly how we 
produce our output.
</p>
