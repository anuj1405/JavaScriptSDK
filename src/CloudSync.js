/*
CloudSync
*/

CB.CloudSync = function(tableName){
    if(typeof tableName === 'undefined' || tableName === null || tableName === ''){
        throw "Cannot sync a table with an empty name";
    }
    this.document = new PouchDB(tableName);
    this.document.name = tableName;
};

Object.defineProperty(CB.CloudSync.prototype, 'name',{
    get: function(){
        return this.document.name;
    }
});

Object.defineProperty(CB.CloudSync.prototype, 'items', {
    get: function(){
        this.document.allDocs({include_docs:true, descending:true}).then(function(doc){
            return doc.rows;
        }).catch(function(err){
            return err;
        });
    }
});

CB.CloudSync.prototype.put = function(item, callback){
    var def;
    CB._validate();

    if(!callback){
        def = new CB.Promise();
    }

    if(typeof item === 'undefined'){
        throw "Item cannot be undefined";
    }

    var data = {
        _id: new Date().toISOString(),
        item:item
    };
    if(item._id === "undefined"){
        this.document.post(item).then(function(result){
            if(callback){
                callback.success(result);
            }else{
                def.resolve(result);
            }
        }).catch(function(err){
            if(callback){
                callback.error(err);
            }else{
                def.reject(err);
            }
        });
    }else{
        this.document.put(item).then(function(result){
        if(callback){
            callback.success(result);
        }else{
            def.resolve(result);
        }
    }).catch(function(err){
        if(callback){
            callback.error(err);
        }else{
            def.reject(err);
        }
    });
    }
    if(!callback){
        return def;
    }

};

CB.CloudSync.prototype.get =  function(item, callback){
    var def;
    if(!callback){
        def = new CB.Promise();
    }

    if(typeof item === 'undefined'){
        throw "Item cannot be undefined";
    }

    this.document.get(item).then(function(doc){
        if(callback){
            callback.success(doc);
        }else{
            def.resolve(doc);
        }
    }).catch(function(err){
        if(callback){
            callback.error(err);
        }else{
            def.reject(err);
        }
        if(!callback){
            return def;
        }
    });
};

CB.CloudSync.prototype.getAll = function(){
   var def;
   CB._validate();
   if(!callback){
      def = new CB.Promise();
   }

   this.document.allDocs({include_docs: true, descending: true}).then(function(doc){
       if(callback){
         callback.success(doc.rows);
       }else{
         def.resolve(doc.rows);
       }
   }).catch(function(err){
       if(callback){
        callback.error(err);
       }else{
        def.reject(err);
       }
   });
    if(!callback){
        return def;
       }
};

CB.CloudSync.prototype.remove = function(item, callback){
    var def;
    CB._validate();
    if(!callback){
        def = new CB.Promise();
    }

    if(typeof item === 'undefined'){
        throw "Item cannot be undefined";
    }

    this.document.get(item).then(function(doc){
        return this.document.remove(doc);
    }).then(function(result){
        if(callback){
            callback.success(result);
        }else{
            def.resolve(result);
        }
    }).catch(function(err){
        if(callback){
            callback.error(err);
        }else{
            def.reject(err);
        }
    });
    if(!callback){
        return def;
    }
};
