let  adminController  = {};


adminController.index = function(req, res) {
    return new Promise ( async (resolve, reject) => {
        try {
            res.send("hello world");
        } catch (error) {
            console.log(error);
        }
    });
}


module.exports = adminController;