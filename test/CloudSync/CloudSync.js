describe("Cloud Sync", function(){

   before(function(){
      CB.appKey = CB.masterKey;
   });

   it("Should not insert a null table", function(done){
      this.timeout(300000);
      try{
        var offlineSync = new CB.CloudSync('');
        done('Added an null table');
      }catch(e){
        done();
      }
   });

   it("Should add an item to the Offline Sync", function(done){
      this.timeout(300000);
      var offlineSync = new CB.CloudSync('Name');
      var data ={_id: new Date().toISOString(),name:'Buhiire Keneth', age:25};
      offlineSync.put(data, {
        success: function(result){
            if(result != null){
                console.log(result);
                done();
            }else{
                done('Added invalid data');
            }
            // done();

        },error:function(err){
            console.log(err);
            done(err);
        }
      });
   });

   it("Should get the name of the Offline Sync", function(done){
      this.timeout(300000);
      var offlineSync = new CB.CloudSync('Name');
      var data ={_id: new Date().toISOString(),name:'Buhiire Keneth', age:25};
      offlineSync.put(data, {
        success: function(result){
          console.log(offlineSync);
            if(result != null){
                if(offlineSync.document.name ==='Name'){
                  done();
                }else{
                  done('Could Not fetch the name');
                }
            }else{
                done('Added invalid data');
            }
            // done();

        },error:function(err){
            console.log(err);
            done(err);
        }
      });
   });


   it("Should get a single item from the Offline Sync", function(done){
      this.timeout(300000);
      var offlineSync = new CB.CloudSync(util.makeString());
      var data = {_id: 'test1', name:'Buhiire Keneth', age:26};
      offlineSync.put(data,{
        success: function(result){
          if(result != null){
              offlineSync.get(result, {
                success: function(response){
                   if(!response === null){
                       done();
                   }else{
                      done("Invalid response");
                   }
                }, error: function(err){
                  done(err);
                }
              });
          }else{
            console.log(result);
              done("Invalid data");
          }
        }
      });
   });

   it("Should get all the items stored in a single OfflineSync", function(done){
      this.timeout(300000);
      var offlineSync = new CB.CloudSync(util.makeString());
      var data = {_id: 'test1', name:'Buhiire Keneth', age:26};
      offlineSync.put(data,{
        success: function(result){
          if(result != null){
              offlineSync.get(result, {
                success: function(response){
                   if(response != null){
                       offlineSync.getAll({
                        success: function(result){
                          console.log(result);
                          done();
                           // if(result != null){
                           //   done();
                           // }else{
                           //   done("Invalid data");
                           // }
                        }, error: function(err){
                          done(err);
                        }
                       });
                   }else{
                      done("Invalid response");
                   }
                }, error: function(err){
                  done(err);
                }
              });
          }else{
            console.log(result);
              done("Invalid data");
          }
        }
      });
   });

   it("Should delete an item from the offlineSync", function(done){
    this.timeout(300000);
    var offlineSync = new CB.CloudSync(util.makeString());
    var data = {_id: new Date().toISOString(), name:'Buhiire Keneth', age:26};
    offlineSync.put(data, {
        success: function(result){
            if(result !=null){
                console.log(result);
                offlineSync.remove(result,{
                  success: function(response){
                      if(response !=null){
                        done();
                      }else{
                        done('Invalid response');
                      }
                  }, error: function(err){
                    console.log(err);
                    done(err);
                  }
                });
            }else{
                done('Added invalid data');
            }
        }, error: function(err){
          console.log(err);
          done(err);
        }
    });
   });
});
