Installation Instructions (requires npm and nodejs to be installed)  
Note: bash system commands are used to start and stop server, so run on Unix-like OS or Docker Unix-like container
  
1. cd into directory  
2. npm install  
3. npm run start   
4. Use "npm run stop" to terminate server process

Expected output:  

pid:44791 saved to server.pid  

Use "npm run stop" to terminate server.  

$ Server started at port: 8080

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