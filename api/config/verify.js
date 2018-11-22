const checkToken = (req,res,next)=>{
    console.log("Hello from checkauth");
    
    //console.log(req);

    const header = req.headers['authorization'];
    //console.log("Header morshed", header);
    
    if(typeof header !== 'undefined'){
        const bearer = header.split(' ')
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = checkToken;