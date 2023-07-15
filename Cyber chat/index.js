
const express = require('express')
const bodyParser = require("body-parser");
const axios=require('axios')
const nodemailer=require('nodemailer')
const app = express()
// const fetch=require{'fetch'};
app.use(bodyParser.json());
app.use(express.static('public'))
// app.use(express.static('uploads'))
const port = process.env.PORT ||6500
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const fs = require("fs");

const multer = require("multer");
const crypto = require('crypto');
const path = require("path");


app.post("/userpictures", (req, res) => {
const folderPath = `public/uploads/${req.body.uid}`;

// Read the contents of the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    res.send(JSON.stringify({ status: 500, error: null, response:err}));
    return;
  }

  // Filter out only the filenames (exclude subdirectories)
  const filenames = files.filter(file => fs.statSync(`${folderPath}/${file}`).isFile());

  // Output the list of filenames to the console
  res.send(JSON.stringify({ status: 200, error: null, response:filenames }));

})
})



app.post("/hashsearch", (req, res) => {
// alert(99)
let txt;
try{

  txt=decrypt(req.body.text,secretKey);
}catch(err){
  if (err instanceof TypeError) {
    res.send(JSON.stringify({ status: 500, error: null, response:txt }));
    return;
  }
 
}
  txt=txt.substring(0,6);
  if(txt==req.body.user){


   console.log(req.body.chat+" "+req.body.msgid)
   console.log('lllllllllllllllllll')
  

var options = {
  method: 'PUT',
  url: 'https://joshnodechats.azurewebsites.net/api/PubSub2',
  params: {code: '-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ=='},
  headers: {'update-secure-chat': '1', 'table-name': 'CHATLOGS'},
  data: {chatid: `${req.body.chat}`, messageid: `${req.body.msgid}`}
  // data: {chatid: `9649`, messageid: `450378`}
};


// var options = {
//   method: 'PUT',
//   url: 'https://joshnodechats.azurewebsites.net/api/PubSub2',
//   params: {code: '-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ=='},
//   headers: {'table-name': 'CHATLOGS', 'update-secure-chat': '1'},
//   data: {chatid: req.body.chat, messageid: req.body.msgid}
// };

axios.request(options).then(function (response) {
  // console.log('lllllllllllllllllll')
  console.log(response.data);
  res.send(JSON.stringify({ status: 200, error: null, response:txt }));
}).catch(function (error) {
  console.error(error);
});
    
  }
  else{
    // console.log('lllllllllllllllllllfufgufu')
    res.send(JSON.stringify({ status: 500, error: null, response:txt }));
  }


})
// Encrypt function using AES algorithm
function encrypt(text, secretKey) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decrypt function using AES algorithm
function decrypt(encryptedText, secretKey) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage
const text = 'cggggggggtt';
const secretKey = 'MySecretKey123';

const encryptedText = encrypt(text, secretKey);
console.log('Encrypted:', encryptedText);

const decryptedText = decrypt(encryptedText, secretKey);
console.log('Decrypted:', decryptedText);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// // Initialize upload
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
// }).array("photos", 10);

// app.post("/upload", (req, res) => {
//   // Create a new subfolder with a unique name based on the current timestamp
//   const timestamp = Date.now();
//   const folderName = `uploads/${timestamp}`;
//   fs.mkdirSync(folderName);

//   // Set the destination of the upload to the new subfolder
//   upload.destination = function (req, file, cb) {
//     cb(null, folderName);
//   };

//   upload(req, res, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     console.log(req.files);

//     // If everything went fine, send a success response
//     res.send("Files uploaded successfully!");
//   });
// });




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.query.folder || "default";
    const uploadDir = path.join(__dirname, "public/uploads", folder);

    if (!fs.existsSync(`public/uploads/${req.query.folder}`)) {

      fs.mkdirSync(`public/uploads/${req.query.folder}`);
    }
    cb(null, `public/uploads/${req.query.folder}`);
  },
  filename: (req, file, cb) => {
    cb(null, "1.png");
    var axios = require("axios").default;


  },
});
// Initialize upload


const upload = multer({ storage });

// Handle file upload request
app.post("/upload", upload.array("photos"), (req, res) => {
  console.log("File uploaded successfully!");
  res.sendStatus(200);
});











app.post("/signup", (req, res) => {
	
console.log(req.body.Center)
console.log(req.body.Pass)

    var options = {
      method: 'GET',
      url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
      params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
      headers: {'table-name': 'USERDETAILS', 'user-name': `${req.body.Center}`, password: `${req.body.Pass}`}
    };
    
    axios.request(options).then(function (response) {
        if (response.data.length==0) {
          
            res.send(JSON.stringify({ status: 500, error: null, response: response.data }));
        }
            else{
                res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
                
            }
        
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

	})




    app.post("/chats", (req, res) => {
	
        var axios = require("axios").default;

        var options = {
          method: 'GET',
          url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
          params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
          headers: {'get-chat-id': '1', 'sender-id': `${req.body.Sender}`, 'table-name': 'CHATLOGS'}
        };
        
        axios.request(options).then(function (response) {
     
            
            axios.request(options).then(function (response) {
                if (response.data.length==0) {
                  
                    res.send(JSON.stringify({ status: 500, error: null, response: response.data }));
                }
                    else{
                        res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
                        
                    }
                
              console.log(response.data);
            }).catch(function (error) {
              console.error(error);
            });
        
            })
        })



app.post("/chatsbox", (req, res) => {

  

var options = {
  method: 'GET',
  url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
  params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
  headers: {'table-name': 'CHATLOGS', 'chat-id': req.body.Chat}
};

axios.request(options).then(function (response) {
  console.log(response.data)
  console.log("------------------------------")
  // function updateAgeInArray(array, newAge) {
   
  // }
  for (let i of response.data){
    console.log(i.CHAT_CONTENT)}
    console.log("------------------------------")
  for (let i = 0; i < response.data.length; i++) {
    if(response.data[i].chat_secure==1){

      response.data[i].CHAT_CONTENT = response.data[i].CHAT_CONTENT;
    }
    else{

      response.data[i].CHAT_CONTENT = decrypt(response.data[i].CHAT_CONTENT, secretKey);
    }
    }
  console.log("------------------------------")
  console.log(response.data)
  res.send(JSON.stringify({ status: 200, error: null, response: response.data }));
  // console.log(response.data);
}).catch(function (error) {
  console.log(error)
  res.send(JSON.stringify({ status: 500, error: null, response: 1 }));
});

        })
//start express server
app.listen(port, () => {
    console.log('Server started on post ' + port)
})

app.post("/signinsert",async (req, res) => {
let qrcoded=req.body.usid+req.body.passwd;


  var options = {
    method: 'POST',
    url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
    params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
    headers: {'table-name': 'USERDETAILS'},
    data: {
      
      username: req.body.Usr,
      userid: req.body.usid,
      password: req.body.passwd,
      email: req.body.Mail,

      // username: encrypt(req.body.Usr, secretKey),
      // userid:  encrypt(req.body.usid, secretKey),
      // password: encrypt( req.body.passwd, secretKey),
      // email: encrypt( req.body.Mail, secretKey),
    }
  };
  
  axios.request(options).then(function (response) {
    let text=encrypt(qrcoded,secretKey);
    if(response.data="Row added successfully"){
      let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        service: 'gmail', // true for 465, false for other ports
        auth: {
          user: 'webdearsproject@gmail.com', // generated ethereal user
          pass: 'iefrtrdbsudvpsyx', // generated ethereal password
        },
      });


      var mailoptions={
        from:'webdearsproject@gmail.com',
        to:req.body.Mail,
        subject:'Personal Secret Key From SH....Chat',
        html:`<p>Don't share This qr <b> </b> </p><p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}" alt=""></p>`
        }
        transporter.sendMail ( mailoptions,  function(err,info){
        if(err){
          res.send(JSON.stringify({ status: 500, error: null}))
      
        }
        else{
         
          res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
        }
      
        })

    }
    else{
      res.send(JSON.stringify({ status: 500, error: null, response:response.data }));

    }
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

)


app.post("/insertchat", (req, res) => {



  var options = {
    method: 'POST',
    url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
    params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
    headers: {'table-name': 'CHATLOGS'},
    data: {
      chatid: req.body.chid,
      chat_secure: req.body.secure,
      sender: req.body.Sender,
      reciever: req.body.Reciever,
      chat_content:  encrypt(req.body.cont, secretKey),
      chat_timestamp:req.body.time,
      messageid:req.body.msid,
    }
  };
  
  axios.request(options).then(function (response) {
    if(response.data="Row added successfully"){

      res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
    }
    else{
      res.send(JSON.stringify({ status: 500, error: null, response:response.data }));

    }
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

})



app.post("/userdetails", (req, res) => {


// function one(){
  var options = {
    method: 'GET',
    url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
    params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
    headers: {'table-name': 'USERDETAILS', 'user-id': req.body.uid}
  };
  
  axios.request(options).then(function (response) {
    if (response.data.length==0) {
                  
      res.send(JSON.stringify({ status: 500, error: null, response: response.data }));
  }
      else{
          res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
          
      }
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
// }
// one();
})



app.post("/usersearch", (req, res) => {
  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://joshnodechats.azurewebsites.net/api/PubSub2',
    params: {code: '-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ=='},
    headers: {'table-name': 'USERDETAILS', 'user-keyword': req.body.text}
  };
  
  axios.request(options).then(function (response) {
    if(response.data.length!=0){

      res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
    }
    else{
      res.send(JSON.stringify({ status: 500, error: null, response:0 }));
  
    }
  }).catch(function (error) {
    console.error(error);
  });

})
app.post("/userupdate", (req, res) => {

  var axios = require("axios").default;

var options = {
  method: 'PUT',
  url: 'https://joshnodechats.azurewebsites.net/api/PubSub2',
  params: {code: '-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ=='},
  headers: {'table-name': 'USERDETAILS', 'update-user': '1'},
  data: {userid: req.body.Sender, username: req.body.username, password: req.body.pass}
};

axios.request(options).then(function (response) {
  if(response.data="Row updated successfully"){

    res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
  }
  else{
    res.send(JSON.stringify({ status: 500, error: null, response:0 }));

  }
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
}
)

app.post("/userstatus", (req, res) => {


// var options = {
//   method: 'PUT',
//   url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
//   params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
//   // params: {code: '-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ=='},
//   headers: {'table-name': 'USERDETAILS' , 'update-user-status': 1},
//   data: {'user-id': `${req.body.Sender}`, 'userstatus':req.body.stat}
// };


// var options = {
//   method: 'PUT',
//   url: 'https://joshnodechats.azurewebsites.net/api/PubSub2',
//   params: {code: '-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ=='},
//   headers: {'table-name': 'USERDETAILS', 'update-user-status': 1},
//   data: {'user-id':req.body.Sender, userstatus:0}
// };

// var axios = require("axios").default;

var options = {
  method: 'PUT',
  url: 'https://joshnodechats.azurewebsites.net/api/PubSub2',
  params: {code: '-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ=='},
  headers: {'table-name': 'USERDETAILS', 'update-user-status': '1'},
  data: {userid: req.body.Sender, userstatus: req.body.stat}
};

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

axios.request(options).then(function (response) {
  if(response.data="Row updated successfully"){

    res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
  }
  else{
    res.send(JSON.stringify({ status: 500, error: null, response:0 }));

  }
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});


}
)

app.post("/userprofile", (req, res) => {



var options = {
  method: 'GET',
  url: 'https://joshnodechats.azurewebsites.net/api/PubSub1',
  params: {code: 'Ch_aeqvZ5Vpyq9O-ILwMFlBhLMhWtnGLki3pXdZtS59lAzFuwHqt9Q=='},
  headers: {'table-name': 'USERDETAILS', 'user-id': `${req.body.Sender}`}
};

axios.request(options).then(function (response) {
  if(response.data.length!=0){

    res.send(JSON.stringify({ status: 200, error: null, response:response.data }));
  }
  else{
    res.send(JSON.stringify({ status: 500, error: null, response:0 }));

  }
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
  }
  )
// function longPolling() {
//   const endpoint = 'https://joshnodechats.azurewebsites.net/api/PubSub2?code=-bj3I0BgdUM3j1xbF9gJdSyBxTRZbJnWZWMhoJNLSpoSAzFu7ZlNKQ==';
//   const headers = {
//     'table-name': 'CHATLOGS',
//     'chat-id': '22446688'
//   };

//   const requestOptions = {
//     method: 'GET',
//     headers: headers
//   };

//   const processMessages = (messages) => {
//     // Handle the received messages, update the UI, etc.
//     console.log('New messages:', messages);
//   };

//   const messageLimit = 10; // Set the maximum number of messages to receive in each request

//   const poll = async () => {
//     try {
//       const response = await fetch(endpoint, requestOptions);
//       if (response.ok) {
//         const messages = await response.json();
//         const limitedMessages = messages.slice(0, messageLimit); // Limit the number of messages
//         if (limitedMessages.length > 0) {
//           processMessages(limitedMessages);
//         }
//       } else {
//         console.error('Error:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       // Initiate the next long polling request
//       poll();
//     }
//   };

//   // Start long polling
//   poll();
// }

// // Start long polling
// longPolling();