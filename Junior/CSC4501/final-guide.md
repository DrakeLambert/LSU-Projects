# Final Guide

1
CSC-4501
Computer Networks
Lecture #11
Oct.09, 2017
The slides are adapted from slides of the textbook written by Kurose & Ross
All material copyright 1996-2012 J.F Kurose and K.W. Ross, All Rights Reserved
CSC4501 Lecture 11 1
CSC	4501	Computer	Networks
Aug Sep Oct Nov Dec
4
Labor
Day
6
Tut	
Pytho
n
2
Guestlect
4
Midterm
1
Lec17
11
Lec5
13
Lect6
9
Lec 11
11
Lec 12
6
Lec18
8
Lec19
8	Friday
(10:00-
am-12:00)
Final Exam
18
Lec7
20
Lec8
16
Lec13
18
Lec 14
13
cancel
15
Guest
Lect
12
Final
Grade
21
Lec1
23
Lec2
25
Lec9
27
Lec10
23
Lec15
25
Projec
t
Tut
20
Lec20
22
Tx
Giving
28
Lec3
30
Lec4
30
Lec16
27
Lec21
29
Lec22
CSC4501 Lecture 1 2
2
Chapter 4: network layer
chapter goals:
• understand principles behind network layer
services:
– network layer service models
– forwarding versus routing
– how a router works
– routing (path selection)
– broadcast, multicast
• instantiation, implementation in the Internet
CSC4501 Lecture 11 3
4.1 introduction
4.2 virtual circuit and datagram
networks
4.3 what’s inside a router
4.4 IP: Internet Protocol
– datagram format
– IPv4 addressing
– ICMP
– IPv6
4.5 routing algorithms
– link state
– distance vector
– hierarchical routing
4.6 routing in the Internet
– RIP
– OSPF
– BGP
4.7 broadcast and multicast
routing
Chapter 4: outline
CSC4501 Lecture 11 4
3
Network layer
• transport segment from
sending to receiving host
• on sending side encapsulates
segments into datagrams
• on receiving side, delivers
segments to transport layer
• network layer protocols in
every host, router
• router examines header
fields in all IP datagrams
passing through it
application
transport
network
data link
physical
application
transport
network
data link
physical
network
data link
physical network
data link
physical
network
data link
physical
network
data link
physical
network
data link
physical
network
data link
physical
network
data link
physical
network
data link
physical
network
data link
physical
network
data link
physical network
data link
physical
CSC4501 Lecture 11 5
Two key network-layer functions
• forwarding: move
packets from router’s
input to appropriate
router output
• routing: determine
route taken by packets
from source to dest.
– routing algorithms
analogy:
v routing: process of
planning trip from source
to dest
v forwarding: process of
getting through single
interchange
CSC4501 Lecture 11 6
4
1
2 3
0111
value in arriving
packet’s header
routing algorithm
local forwarding table
header value output link
0100
0101
0111
1001
3
2
2
1
Interplay between routing and forwarding
routing algorithm determines
end-end-path through network
forwarding table determines
local forwarding at this router
CSC4501 Lecture 11 7
Connection setup
• 3rd important function in some network
architectures:
– ATM, frame relay, X.25
• before datagrams flow, two end hosts and
intervening routers establish virtual connection
– routers get involved
• network vs transport layer connection service:
– network: between two hosts (may also involve
intervening routers in case of VCs)
– transport: between two processes
CSC4501 Lecture 11 8
5
Datagram or VC network: why?
Internet (datagram)
• data exchange among
computers
– “elastic” service, no strict
timing req.
• many link types
– different characteristics
– uniform service difficult
• “smart” end systems
(computers)
– can adapt, perform control,
error recovery
– simple inside network,
complexity at “edge”
ATM (VC)
• evolved from telephony
• human conversation:
– strict timing, reliability
requirements
– need for guaranteed service
• “dumb” end systems
– telephones
– complexity inside
network
CSC4501 Lecture 11 9
Issues	Driving	LAN	Changes
• Traffic	Integration
– Voice,	video	and	data	traffic
– Multimedia became	the	‘buzz	word’
• One-way	batch Web	traffic
• Two-way	batch voice	messages
• One-way	interactive Mbone	broadcasts
• Two-way	interactive video	conferencing
• Quality	of	Service	guarantees	(e.g.	limited	jitter,	
non-blocking	streams)
• LAN	Interoperability
• Mobile	and	Wireless	nodes
CSC4501 Lecture 11 10
6
Stallings “High-Speed Networks”
CSC4501 Lecture 11 11
MUX
`
Wasted bandwidth
ATM
TDM
4 3 2 1 4 3 2 1 4 3 2 1
4 3 1 3 2 2 1
Voice
Data
packets
Images
Copyright ©2000 The McGraw Hill Companies Leon-Garcia & Widjaja: Communication Networks Figure 7.37
Asynchronous	Transfer	Mode		(ATM)
CSC4501 Lecture 11 12
7
ATM
• ATM		standard	(defined	by	CCITT)	is	widely	accepted	
by	common	carriers	as	mode	of	operation	for	
communication	– particularly	BISDN.
• ATM	is	a	form	of	cell	switching using	small	fixedsized
packets.	
Header Payload
5 Bytes 48 Bytes
Figure 9.1
Basic ATM Fixed Cell Format
Copyright ©2000 The McGraw Hill Companies Leon-Garcia & Widjaja: Communication Networks
CSC4501 Lecture 11 13
Network service model
Q:What service model for “channel” transporting
datagrams from sender to receiver?
example services for
individual datagrams:
• guaranteed delivery
• guaranteed delivery with
less than 40 msec delay
example services for a flow
of datagrams:
• in-order datagram
delivery
• guaranteed minimum
bandwidth to flow
• restrictions on changes in
inter-packet spacing
CSC4501 Lecture 11 14
8
Network layer service models:
Network
Architecture
Internet
ATM
ATM
ATM
ATM
Service
Model
best effort
CBR
VBR
ABR
UBR
Bandwidth
none
constant
rate
guaranteed
rate
guaranteed
minimum
none
Loss
no
yes
yes
no
no
Order
no
yes
yes
yes
yes
Timing
no
yes
yes
no
no
Congestion
feedback
no (inferred
via loss)
no
congestion
no
congestion
yes
no
Guarantees ?
CSC4501 Lecture 11 15
4.1 introduction
4.2 virtual circuit and datagram
networks
4.3 what’s inside a router
4.4 IP: Internet Protocol
– datagram format
– IPv4 addressing
– ICMP
– IPv6
4.5 routing algorithms
– link state
– distance vector
– hierarchical routing
4.6 routing in the Internet
– RIP
– OSPF
– BGP
4.7 broadcast and multicast
routing
Chapter 4: outline
CSC4501 Lecture 11 16
9
Connection, connection-less service
• datagram network provides network-layer
connectionless service
• virtual-circuit network provides network-layer
connection service
• analogous to TCP/UDP connecton-oriented /
connectionless transport-layer services, but:
– service: host-to-host
– no choice: network provides one or the other
– implementation: in network core
CSC4501 Lecture 11 17
Virtual circuits
• call setup, teardown for each call before data can flow
• each packet carries VC identifier (not destination host
address)
• every router on source-dest path maintains “state” for each
passing connection
• link, router resources (bandwidth, buffers) may be allocated to
VC (dedicated resources = predictable service)
“source-to-dest path behaves much like telephone
circuit”
– performance-wise
– network actions along source-to-dest path
CSC4501 Lecture 11 18
10
VC implementation
a VC consists of:
1. path from source to destination
2. VC numbers, one number for each link along path
3. entries in forwarding tables in routers along path
• packet belonging to VC carries VC number
(rather than dest address)
• VC number can be changed on each link.
– new VC number comes from forwarding table
CSC4501 Lecture 11 19
VC forwarding table
12 22 32
1 2
3
VC number
interface
number
Incoming interface Incoming VC # Outgoing interface Outgoing VC #
1 12 3 22
2 63 1 18
3 7 2 17
1 97 3 87
… … … …
forwarding table in
northwest router:
VC routers maintain connection state information!
CSC4501 Lecture 11 20
11
application
transport
network
data link
physical
Virtual circuits: signaling protocols
• used to setup, maintain teardown VC
• used in ATM, frame-relay, X.25
• not used in today’s Internet
1. initiate call 2. incoming call
4. call connected 3. accept call
5. data flow begins 6. receive data application
transport
network
data link
physical
CSC4501 Lecture 11 21
Datagram networks
• no call setup at network layer
• routers: no state about end-to-end connections
– no network-level concept of “connection”
• packets forwarded using destination host address
1. send datagrams
application
transport
network
data link
physical
application
transport
network
data link
physical
2. receive datagrams
CSC4501 Lecture 11 22
12
1
3 2
Datagram forwarding table
IP destination address in
arriving packet’s header
routing algorithm
local forwarding table
dest address output link
address-range 1
address-range 2
address-range 3
address-range 4
3
2
2
1
4 billion IP addresses, so rather
than list individual destination
address
list range of addresses
(aggregate table entries)
CSC4501 Lecture 11 23
Destination Address Range
11001000 00010111 00010000 00000000
through
11001000 00010111 00010111 11111111
11001000 00010111 00011000 00000000
through
11001000 00010111 00011000 11111111
11001000 00010111 00011001 00000000
through
11001000 00010111 00011111 11111111
otherwise
Link Interface
0
1
2
3
Q: but what happens if ranges don’t divide up so nicely?
Datagram forwarding table
CSC4501 Lecture 11 24
13
Longest prefix matching
Destination Address Range
11001000 00010111 00010*** *********
11001000 00010111 00011000 *********
11001000 00010111 00011*** *********
otherwise
DA: 11001000 00010111 00011000 10101010
examples:
DA: 11001000 00010111 00010110 10100001 which interface?
which interface?
when looking for forwarding table entry for given
destination address, use longest address prefix that
matches destination address.
longest prefix matching
Link interface
0
1
2
3
CSC4501 Lecture 11 25
Datagram or VC network: why?
Internet (datagram)
• data exchange among
computers
– “elastic” service, no strict
timing req.
• many link types
– different characteristics
– uniform service difficult
• “smart” end systems
(computers)
– can adapt, perform control,
error recovery
– simple inside network,
complexity at “edge”
ATM (VC)
• evolved from telephony
• human conversation:
– strict timing, reliability
requirements
– need for guaranteed service
• “dumb” end systems
– telephones
– complexity inside
network
CSC4501 Lecture 11 26
14
4.1 introduction
4.2 virtual circuit and datagram
networks
4.3 what’s inside a router
4.4 IP: Internet Protocol
– datagram format
– IPv4 addressing
– ICMP
– IPv6
4.5 routing algorithms
– link state
– distance vector
– hierarchical routing
4.6 routing in the Internet
– RIP
– OSPF
– BGP
4.7 broadcast and multicast
routing
Chapter 4: outline
CSC4501 Lecture 11 27
Router architecture overview
two key router functions:
• run routing algorithms/protocol (RIP, OSPF, BGP)
• forwarding datagrams from incoming to outgoing link
high-seed
switching
fabric
routing
processor
router input ports router output ports
forwarding data
plane (hardware)
routing, management
control plane (software)
forwarding tables computed,
pushed to input ports
CSC4501 Lecture 11 28
15
line
termination
link
layer
protocol
(receive)
lookup,
forwarding
queueing
Input port functions
decentralized switching:
• given datagram dest., lookup output port
using forwarding table in input port
memory (“match plus action”)
• goal: complete input port processing at
‘line speed’
• queuing: if datagrams arrive faster than
forwarding rate into switch fabric
physical layer:
bit-level reception
data link layer:
e.g., Ethernet
see chapter 5
switch
fabric
CSC4501 Lecture 11 29
Switching fabrics
• transfer packet from input buffer to appropriate
output buffer
• switching rate: rate at which packets can be
transfer from inputs to outputs
– often measured as multiple of input/output line rate
– N inputs: switching rate N times line rate desirable
• three types of switching fabrics
memory
memory
bus crossbar
CSC4501 Lecture 11 30
16
Switching via memory
first generation routers:
• traditional computers with switching under direct control of CPU
• packet copied to system’s memory
• speed limited by memory bandwidth (2 bus crossings per datagram)
input
port
(e.g.,
Ethernet)
memory
output
port
(e.g.,
Ethernet)
system bus
CSC4501 Lecture 11 31
Switching via a bus
• datagram from input port
memory
to output port memory via a
shared bus
• bus contention: switching speed
limited by bus bandwidth
• 32 Gbps bus, Cisco 5600:
sufficient speed for access and
enterprise routers
bus
CSC4501 Lecture 11 32
17
Switching via interconnection network
• overcome bus bandwidth limitations
• banyan networks, crossbar, other
interconnection nets initially
developed to connect processors in
multiprocessor
• advanced design: fragmenting datagram
into fixed length cells, switch cells
through the fabric.
• Cisco 12000: switches 60 Gbps
through the interconnection network
crossbar
CSC4501 Lecture 11 33
Output ports
• buffering required when datagrams arrive from fabric faster than the
transmission rate
• scheduling discipline chooses among queued datagrams for transmission
line
termination
link
layer
protocol
(send)
switch
fabric
datagram
buffer
queueing
CSC4501 Lecture 11 34
18
Output port queueing
• buffering when arrival rate via switch exceeds output line speed
• queueing (delay) and loss due to output port buffer overflow!
at t, packets more
from input to output
one packet time
later
switch
fabric
switch
fabric
CSC4501 Lecture 11 35
How much buffering?
• RFC 3439 rule of thumb: average buffering
equal to “typical” RTT (say 250 msec) times
link capacity C
– e.g., C = 10 Gpbs link: 2.5 Gbit buffer
• recent recommendation: with N flows,
buffering equal to RTT C.
N
CSC4501 Lecture 11 36
19
Input port queuing
• fabric slower than input ports combined -> queueing may occur at input
queues
– queueing delay and loss due to input buffer overflow!
• Head-of-the-Line (HOL) blocking: queued datagram at front of queue
prevents others in queue from moving forward
output port contention:
only one red datagram can be
transferred.
lower red packet is blocked
switch
fabric
one packet time
later: green packet
experiences HOL
blocking
switch
fabric
CSC4501 Lecture 11 37