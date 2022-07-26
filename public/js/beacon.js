var app = {}

 

app.initialize = function()
{
    console.log('startAPP')
    document.addEventListener(
        'deviceready',
        app.onDeviceReady,
        false)
    console.log('Default Page')
}

onDeviceReady = function()
{
    window.locationManager = cordova.plugins.locationManager
    console.log('Location manager Start')
}

 

 