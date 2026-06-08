const Message = require("../models/Message");

exports.getmessages = async(req,res)=>{

    try{
        const{senderId,reciverId} = req.params;
        const messages = await Message.find({
            $or:[
                {
                    senderId,
                    reciverId,
                },
                {
                    senderId:reciverId,
                    reciverId:senderId,
                },
            ],
        });
        res.json(messages);
    } catch(err){
        console.error(err);
    }
}