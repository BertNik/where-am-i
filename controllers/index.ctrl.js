const fs = require('fs');

module.exports = {

    index: (req,res,next) => {

        if(req.method === 'POST'){
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); 
            });
            req.on('end', () => {
                //set states.json file path
                var path = __dirname+'/states.json';
                
                fs.readFile(path, 'utf-8', (err, data) =>{
                    if(err){
                        echoBody('error reading file\n');
                        return;
                    }
                    //when files is read call back to returnResults
                    returnResult(data.split('\n'));
                });

                returnResult =  (d) => {
                    //file data is gotten, now time to parse it and let the magic happen
                    var postParams = numerify(getPostParams(body).qp);
                    if(postParams.err === 1){
                        return;
                    }
                    for(var state in d){
                        var s = JSON.parse(d[state]), border = s.border;
                        //if lat and lng are within a boundry, return state
                        if(inside([postParams.lng,postParams.lat], border )){
                            return echoBody('["'+s.state+'"]\n');
                        }
                    }
                    //if there are no results, say that in the response
                    echoBody('nothing returned\n');
                }

                numerify = (postParams) => {

                    try{
                        //javaScript is very finicky with types; this is an effort to ensure NaN is not returned
                        //is the number negative? 
                        //again, another peculiarity of javaScript
                        if(postParams.latitude.indexOf('-') !== -1){
                            postParams.latitude = postParams.latitude.substring(1,postParams.latitude.length);
                            lat = parseFloat(postParams.latitude);
                            lat = "-"+parseFloat(postParams.latitude);
                        }else{
                            lat = parseFloat(postParams.latitude);
                        }

                        if(postParams.longitude.indexOf('-') !== -1){
                            postParams.longitude = postParams.longitude.substring(1,postParams.longitude.length);
                            lng = parseFloat(postParams.longitude);
                            lng = "-"+parseFloat(postParams.longitude);
                        }else{
                            lng = parseFloat(postParams.longitude);
                        }

                        return{lat:lat, lng:lng}

                    }catch(e){
                        echoBody('error occured; check your parameters\n'); 
                        return {err:1};
                    }
                }
                getPostParams = (body) => {
                    //get the post/query params
                    var queryParams = {};
                    body.split('&').map(function (a, b) {
                        var obj = {};
                        if (a.split('=').length >= 2) {
                            queryParams[a.split('=')[0]] = a.split('=')[1];
                        } else if (a.split('=').length === 1) {
                            queryParams[a.split('=')[0]] = '';
                        }
                    });
                    return { qp: queryParams};
                }
            });
            echoBody = (d) => {
                //echo the response with the data
                res.send(d);
            };
            inside =  (point, vs) => {

                //*******************************************************************************************/
                // algo found at https://stackoverflow.com/questions/22521982/check-if-point-inside-a-polygon
                // ray-casting algorithm based on
                // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
                //*******************************************************************************************/
                
                var x = point[0], y = point[1];
            
                var inside = false;
                for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                    var xi = vs[i][0], yi = vs[i][1];
                    var xj = vs[j][0], yj = vs[j][1];
            
                    var intersect = ((yi > y) != (yj > y))
                        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                    if (intersect) inside = !inside;
                }
            
                return inside;
                
            }
        }
      }
}