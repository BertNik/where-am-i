Installation Instructions (requires npm and nodejs to be installed)  
1. cd into directory  
2. npm install  
3. npm run start   

Expected output:  
$ npm run start &  

> cms@0.1.0 start [filepath]/server  
> node ./app.js &  


Examples:  
$ curl  -d "longitude=-112.036133&latitude=32.513799"  localhost:8080/  
["Arizona"]  
  
$ curl  -d "longitude=-109.036133&latitude=32.513799"  localhost:8080/  
["New Mexico"]  
  
$ curl  -d "longitude=&latitude="  localhost:8080/  
nothing returned  
  
$ curl  -d "longitude=&latitufdsde="  localhost:8080/  
error occured; check your parameters  
  
Enjoy!  