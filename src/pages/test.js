import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function test() {

    useEffect(() => {
        var beaconScanner = require('eddystone-beacon-scanner');

        function showMyBeacon(beacon, id) {
        if(beacon.id === id) {
            console.log('Got my beacon:\n', JSON.stringify(beacon, null, 2));
            //beaconScanner.stopScanning();
        }
        }

        beaconScanner.on('found', function(beacon) {
            console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
            //showMyBeacon(beacon, '3277a7fc917441f8aa5b23f7878b84d9');
        });

        beaconScanner.on('updated', function(beacon) {
            //console.log('updated Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
            showMyBeacon(beacon, '3277a7fc917441f8aa5b23f7878b84d9');
        });

        beaconScanner.on('lost', function(beacon) {
            console.log('lost Eddystone beacon:\n', JSON.stringify(beacon, null, 2));
        });

        beaconScanner.startScanning(true);
    },[])
    
    
}

export default withRouter(test);