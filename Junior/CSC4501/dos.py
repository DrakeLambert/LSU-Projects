from mininet.net import Mininet
from mininet.node import CPULimitedHost
from mininet.link import TCLink
from mininet.topo import Topo
import time

class DataCenterTopo(Topo):
    "Data-center topology with variable number of hosts spread evenly across all edge nodes."
    def __init__(self, count, **opts):
        Topo.__init__(self, **opts)

        core = self.addSwitch('c1')

        bw = 10
        delay = '5ms'
        loss = 5
        max_queue_size = 1000

        aggregation = []
        for switchnumber in range(1, 3):
            switch = self.addSwitch('a' + str(switchnumber))
            self.addLink(core, switch, bw=bw, delay=delay, loss=loss, max_queue_size=max_queue_size, use_htb=True)
            aggregation.append(switch)

        edges = []
        switchnumber = 1
        for aswitch in aggregation:
            for _ in range(1, 3):
                edgeswitch = self.addSwitch('e' + str(switchnumber))
                self.addLink(aswitch, edgeswitch, bw=bw, delay=delay, loss=loss, max_queue_size=max_queue_size, use_htb=True)
                edges.append(edgeswitch)
                switchnumber = switchnumber + 1

        hosts = []
        hostnumber = 1
        while True:
            if hostnumber > count:
                break
            for edge in edges:
                if hostnumber > count:
                    break
                host = self.addHost('h' + str(hostnumber), cpu=.5/count)
                self.addLink(edge, host, bw=bw, delay=delay, loss=loss, max_queue_size=max_queue_size, use_htb=True)
                hosts.append(host)
                hostnumber = hostnumber + 1

def DosTest():
    "Create network and run DOS test."
    for exponent in range(3, 10):
        numberofhosts = 2 ** exponent
        print ("Testing with %d nodes..." % numberofhosts)
        start = time.time()
        topo = DataCenterTopo(numberofhosts)
        net = Mininet(topo=topo, host=CPULimitedHost, link=TCLink, autoStaticArp=True)
        net.start()
        print ("Setup took %d seconds" % (time.time() - start))
        start = time.time()

        h1 = net['h1']
        ip = h1.IP()
        h1.sendCmd('python server.py')

        import re
        for node in net:
            if not re.match("(h1|c|a|e)", node):
                host = net[node]
                host.sendCmd('python client.py %s' % ip)

        time.sleep(30)

        print ("Testing took %d seconds" % (time.time() - start))
        start = time.time()

        net.stop()

        print ("Cleanup took %d seconds" % (time.time() - start))
        print "Done"

if __name__ == '__main__':
    DosTest()