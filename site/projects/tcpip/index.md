---
layout: project
title: TCP/IP
year: 2022
---

<p>In the spring semester of 2022, for <a href="http://cs.brown.edu/courses/csci1680/">Brown's cs168: Computer Networks</a>, 
I collaborated with <a href="https://chgagnon.github.io/">Charlie Gagnon</a> to implement our
own TCP and IP stack.
</p>

<h3>IP Layer</h3>

<p>The project specification effectively asks you to start by implementing a driver
program that connects to other instances of itself over UDP, forming a sort
of virtual network with UDP as the link layer. These processes exchange routing information
with their neighbors using the <a href="https://en.wikipedia.org/wiki/Routing_Information_Protocol">RIP protocol</a>,
and use this information to forward packets across their links.
</p>

<p>By following the RIP specification (<a href="https://datatracker.ietf.org/doc/html/rfc2453">RFC 2453</a>),
our nodes were able to automatically learn routes to every node in the network, send packets unreliably
from any node to any other node, and adapt to changes in the topology as links go down and come back up.
</p>

<h4>ICMP</h4>
<p>Using our IP functionality, we implemented a subset of the Internet Control Message Protocol
(<a href="https://datatracker.ietf.org/doc/html/rfc792">RFC 792</a>) so that we could implement
a <a href="https://en.wikipedia.org/wiki/Traceroute"><code>traceroute</code></a> command in our driver.
</p>

<p>This command uses ICMP Echo and Echo Response packets to determine the IP addresses of
routers on each hop along the way to a destination address.
</p>

<h3>TCP Layer</h3>
<p>Once we had a network layer that could perform routing and unreliable delivery of
packets, we were able to work on implementing our own transport layer that could
provide a notion of sockets, reliable delivery of a stream of bytes, and congestion control.
</p>

<p>With the guidance of <a href="https://datatracker.ietf.org/doc/html/rfc793">RFC 793</a>, we
implemented connection setup and teardown, the TCP state machine, proper sequencing and
acknowledgement of packets, retransmission, flow control using the sliding window protocol
specified in the RFC, and out of order packet processing. In the end, our TCP was able to
transfer a 5MB file fully reliably in just a few seconds.
</p>

<p>As an extension for his capstone, Charlie also added congestion control to our
TCP, using the TCP Tahoe approach (<a href="https://datatracker.ietf.org/doc/html/rfc5681#section-3.2">RFC 5681</a>),
which adds a separate congestion window and changes how retransmissions work.
</p>

<h3>Rust</h3>
<p>Perhaps one of the most exciting aspects of this project was that we
implemented it in <a href="https://www.rust-lang.org/">Rust</a>. This is definitely
the largest Rust program I've worked on, and I have to say I am glad we made the choice
to use it.
</p>

<p>As with any complicated piece of software, we spent a lot of time debugging.
We did <b>not</b>, however, spend time debugging things like memory corruption,
memory leaks, and unpredictable crashes. Rust enabled us to focus on the challenge of
implementing a complex multithreaded networking program (which is hard enough!), rather than the consequences
of common C pitfalls.
</p>

<h3>Source</h3>
<p>Unfortunately, as this project is still part of the course materials for cs168, I am
unable to make our implementation public.
</p>
