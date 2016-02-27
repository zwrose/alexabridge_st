module.exports = function(Homekeys) {
    Homekeys.shiftStack = function(bridgeID, cb) {
        Homekeys.findById(bridgeID, function(err, instance){
            if(err) {
                console.log(err.name);
                console.log(err.message);
                cb(null, err.message);
            }
            var instanceJS = JSON.parse(JSON.stringify(instance));
            instanceJS.keyStack.shift()
           if(instance.keyStack.length > 0){
               instance.updateAttribute('keyStack', instanceJS.keyStack, function(err, updatedInstance){
                   if(err) {
                       console.log(err.name);
                       console.log(err.message);
                       cb(null, err.message);
                   }
                   cb(null, "shifted.");
               });
           } else {
               cb(null, "nothing to shift.");
           }
           
        });
    }
    
    Homekeys.remoteMethod(
        'shiftStack',
        {
            http: {path: '/shiftStack', verb: 'get'},
            accepts: {arg: 'bridgeID', type: 'number', http: { source: 'query' } },
            returns: {arg: 'name', type: 'string'}
        }
    );
    
    Homekeys.pushKey = function(bridgeID, url, cb) {
        Homekeys.findById(bridgeID, function(err, instance){
            if(err) {
                console.log(err.name);
                console.log(err.message);
                cb(null, err.message);
            }
            var instanceJS = JSON.parse(JSON.stringify(instance));
            instanceJS.keyStack.push(url);
            instance.updateAttribute('keyStack', instanceJS.keyStack, function(err, updatedInstance){
                if(err) {
                    console.log(err.name);
                    console.log(err.message);
                    cb(null, err.message);
                }
                cb(null, "pushed.");
            });
           
        });
    }
    
    Homekeys.remoteMethod(
        'pushKey',
        {
            http: {path: '/pushKey', verb: 'get'},
            accepts: [{arg: 'bridgeID', type: 'number', http: { source: 'query' } },
                      {arg: 'url', type: 'string', http: { source: 'query' } }],
            returns: {arg: 'name', type: 'string'}
        }
    );
};
