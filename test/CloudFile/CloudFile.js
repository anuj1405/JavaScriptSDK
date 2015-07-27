describe("Cloud Files", function(done) {

    it("Should Save a file with file data and name",function(done){

        this.timeout(10000);

        var data = 'akldaskdhklahdasldhd';
        var name = 'abc.txt';
        var type = 'txt';
        var fileObj = new CB.CloudFile(name,data,type);
        fileObj.save().then(function(file){
            if(file.url) {
                console.log(file);
                console.log("Saved file");
                done();
            }else{
                throw 'ún able to get the url';
            }
        },function(err){
            throw "Unable to save file";
        });
    });

    try {

        if (window) {
            it("should save a new file", function (done) {

                this.timeout(20000);
                var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
                try {
                    var oMyBlob = new Blob(aFileParts, {type: "text/html"});
                } catch (e) {
                    var builder = new WebKitBlobBuilder();
                    builder.append(aFileParts);
                    var oMyBlob = builder.getBlob();
                }
                var file = new CB.CloudFile(oMyBlob);

                file.save().then(function (file) {
                    if (file.url) {
                        done();
                    } else {
                        throw "Upload success. But cannot find the URL.";
                    }
                }, function (err) {
                    throw "Error uploading file";
                });

            });
            it("should delete a file", function (done) {

                this.timeout(200000);
                var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
                try {
                    var oMyBlob = new Blob(aFileParts, {type: "text/html"});
                } catch (e) {
                    var builder = new WebKitBlobBuilder();
                    builder.append(aFileParts);
                    var oMyBlob = builder.getBlob();
                }
                var file = new CB.CloudFile(oMyBlob);

                file.save().then(function (file) {
                    if (file.url) {
                        //received the blob's url
                        console.log(file.url);
                        file.delete().then(function (file) {
                            if (file.url === null) {
                                done();
                            } else {
                                throw "File deleted, url in SDK not deleted";
                            }
                        }, function (err) {
                            throw "Error deleting file";
                        })
                    } else {
                        throw "Upload success. But cannot find the URL.";
                    }
                }, function (err) {
                    throw "Error uploading file";
                });
            });
        }
    }catch(e){
        console.log('In node');
    }
    //add ACL on CloudFiles.
    
});
