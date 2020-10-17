/**
 * Leaflet.CenterMarker v1.0
 * 
 * Author: Jonatan Heyman <http://heyman.info>
 */

(function(window) {
    var LiftedMarker = L.Control.extend({
        _container: null,
        
        onAdd: function(map) {
            var container = L.DomUtil.create("div");
            container.style.position = "absolute";
            container.style.marginLeft = 0;
            container.style.marginTop = 0;
            container.style.display = "none";
            
            function resize() {
                container.style.left = Math.round(map.getSize().x/2) + "px";
                container.style.top = Math.round(map.getSize().y/2) + "px";
            }
            resize();
            map.on("resize", resize);
            
            container.append(this.options.marker.getIcon().createShadow());
            container.append(this.options.marker.getIcon().createIcon());
            this._container = container;
            return this._container;
        },
        
        hide: function() {
            this._container.style.display = "none";
        },
        
        show: function() {
            this._container.style.display = "block";
        }
    });
    
    L.CenterMarker = L.Marker.extend({
        options: {},
        _addedToMap: false,
        _liftedMarker: null,

        initialize: function(map, options) {
            // call super
            L.Marker.prototype.initialize.call(this, map.getCenter(), this.options);
            this.addTo(map);
        },
    
        onAdd: function(map) {
            // super
            L.Marker.prototype.onAdd.call(this, map);
            
            if (!this._addedToMap) {
                this._addedToMap = true;
                var marker = this;
                var map = this._map;
                marker._liftedMarker = new LiftedMarker({position:"topleft", marker:marker});
                marker._liftedMarker.addTo(map);
                map.on("dragstart", function(ev) {
                    //console.log("dragstart", map.getCenter());
                    marker._liftedMarker.show();
                    marker.hide()
                });
                map.on("dragend", function(ev) {
                    //console.log("dragend", map.getCenter());
                    marker.setLatLng(map.getCenter());
                    marker.show();
                    marker._liftedMarker.hide();
                    marker.fire("newposition");
                });
            }
        },
        
        hide: function() {
            this._icon.style.display = "none";
            this._shadow.style.display = "none";
        },
        
        show: function() {
            this._icon.style.display = "block";
            this._shadow.style.display = "block";
        }
    });

    L.centerMarker = function (latlng, options) {
        return new L.CenterMarker(latlng, options);
    };
})(window);
