const AWS = window.AWS ;  //require("aws-sdk");
AWS.config.update({
    accessKeyId:"AKIAJ7GZ7VTMKZHL53IQ",
    secretAccessKey:"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" ,
    region: "eu-west-1"
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

function sendEmail()
{

  var senderName = document.getElementById("senderName").value;
  var senderEmail = document.getElementById("senderEmail").value;
  var senderDescription = document.getElementById("senderDescription").value;

    if(!senderName)
    {
      alert("Please Enter Name");
      return
    }

    if(!senderEmail)
    {
      alert("Please Enter Email");
      return
    }

    if(!senderDescription)
    {
      alert("Please write few words Description message");
      return
    }
    const params = {
    
      Destination: 
      {
        ToAddresses: ["support@transity.co"] // Email address/addresses that you want to send your email
      },
    // ConfigurationSetName: "ConfigSet",
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data:
              "<html><body><p> Name : "+ senderName +"</p><p > Email-id : "+ senderEmail +"</p><p> Message : "+ senderDescription +"</p></body></html>"
          },
          Text: {
            Charset: "UTF-8",
            Data: ""
          }
        },
        Subject:{
          Charset: "UTF-8",
          Data: "Freshflo.co"
        }
      },
      Source: "cargoflo.alerts@transity.co" //"ragulpydev@gmail.com" // sender email
    };

  const sendEmail = ses.sendEmail(params).promise();
  sendEmail.then(data => {
    console.log("email submitted to SES", data);
    document.getElementById("senderName").value ='';
    document.getElementById("senderEmail").value ='';
    document.getElementById("senderDescription").value = '';
    alert("Successfully Sent");
  }).catch(error => { console.log(error);});



}