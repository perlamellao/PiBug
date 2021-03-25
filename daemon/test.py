import xml.etree.ElementTree as ET

connected = "files/connected.xml"

conTree = ET.Element('root')
pibugs = ET.SubElement(conTree, "PiBugs")
for i in range(1,101):
    i = ET.SubElement(pibugs, str(i))
    i.set('online', "false")

losdatos = ET.tostring(conTree)
with open(connected, 'wb') as f:
    f.write(losdatos)