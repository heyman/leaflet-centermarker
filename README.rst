=====================
Leaflet CenterMarker
=====================

CenterMarker is a small Leaflet plugin for adding a marker that will be fixed to the 
center viewport of the map, when the map is panned/dragged.


Features
========

Works like the default Leaflet Marker class, but it's position will be fixed relative 
to the viewport when the map is dragged. When the map has been dragged the CenterMarker 
will fire a "newposition" event.


See it in action
================

Leaflet CenterMarker can be seen in action on `What is my address? <https://whatismyaddress.net>`_

You can also see the `bundled examples <https://heyman.github.com/leaflet-centermarker/example/>`_.


Example Code
============

**Create a center marker and add it to a map:**

.. code-block:: javascript
    
    var map = L.map('map', {keyboard: true}).setView([59.324617, 18.071457], 4);
    
    // the marker gets it's position from map.getCenter()
    var marker = L.centerMarker(map);
    marker.addTo(map);
    marker.on("newposition", function(ev) {
        console.log("Marker got new position:", marker.getLatLng());
    });

Known limitations
=================

Currently, the marker is only kept center when the map is panned by drag event, and not if 
it's panned by arrow keys on the keyboard or zooming. 

Author
======

CenterMarker is developed by `Jonatan Heyman <http://heyman.info>`_. 


License
=======

MIT License
