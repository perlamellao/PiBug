import xml.etree.ElementTree as ET

connected = "files/connected.xml"

with open(connected, 'rt') as f:
    tree = ET.parse(f)
    root = tree.getroot()



for bug in root.iter('PiBugs'):
    lel = bug.find("bug12")
    lel.attrib['online'] = 'true'

with open(connected, 'wb') as f:
    tree.write(f)