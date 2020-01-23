/* eslint-disable */
var aws = require('aws-sdk');
import Config from './config.js'
exports.handler = function (event, context, callback) {
    console.log("event : "+JSON.stringify(event));

            
               var paramsReadconsumerLevelRules = {
                Key: {
               "ruleName": {
                 S: "Producerprivacypolicy"
                }
              },
               TableName: process.env.BusinessRulesTable
             };
             console.log("paramsReadRules ::",paramsReadconsumerLevelRules);
             ReadBusinessRules(paramsReadconsumerLevelRules).then(datasuccess => {
                 var bodyData={
                  //   "privacyPolicyLink":datasuccess.Location 
                    "TermsAndConditionsDoc":datasuccess.ProducerTermsAndConditionsDoc,
                    "ProducerPrivacyPolicy":datasuccess.ProducerPrivacyPolicy,
                    "TermsAndConditions": datasuccess.TermsAndConditions,
                            //   {
                            //       "h1":"TELKOM SA SOC LIMITED WEBSITE USAGE TERMS AND CONDITIONS",                       
                            //       "h2":"Copyright@ 2010. Telkom SA SOC Limited. Last updated 2014-07-23",                       
                            //       "h3":"ALL RIGHTS RESERVED. PRINTING, DOWNLOADING AND SAVING ALLOWED AS DETAILED IN CLAUSE 4.",
                            //       "p1":"THIS DOCUMENT IS ENCRYPTED TO MAINTAIN ITS INTEGRITY AND PREVENT UNAUTHORISED CHANGES.",
                            //       "p2":"IN TERMS OF SECTION 11 OF THE ELECTRONIC COMMUNICATIONS AND TRANSACTIONS (ECT) ACT 25 OF 2002 http://www.acts.co.za/ect_act/ AND THE COMMON LAW OF CONTRACT, THESE TERMS AND CONDITIONS ARE VALID, BINDING AND ENFORCEABLE AGAINST ALL PERSONS THAT ACCESS THE TELKOM WEBSITE, WEB PAGES OR ANY PART THEREOF.",
                            //       "p3":"IF YOU DO NOT AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS YOU MAY NOT USE THE TELKOM WEBSITE. REASONABLE USE OF THE TELKOM WEBSITE SHALL AUTOMATICALLY BIND THE USER TO THIS AGREEMENT.",            
                            //       "h4":"1. DISCLAIMER",                       
                            //       "h5":"Telkom SA Limited would like to welcome you to its website. By viewing this website you hereby acknowledge that you have read and accept the following disclaimers",                       
                            //       "h6":"1.1 WEBSITE DISCLAIMER FOR TELKOM SA SOC LIMITED",
                            //       "p4":
                            //       {
                            //           "listType":"Refer to the Website Disclaimer for Telkom SA SOC Limited www.telkom.co.za/ir/disclaimer.jsp regarding:",
                            //           "listItems":
                            //           {
                            //               "l1":"information on the Telkom website www.telkom.co.za/ir/disclaimer.jsp",
                            //               "l2":"links to other sites www.telkom.co.za/ir/disclaimer.jsp",
                            //               "l3":"press releases www.telkom.co.za/ir/disclaimer.jsp",
                            //               "l4":"disclosure regarding forward-looking statements www.telkom.co.za/ir/disclaimer.jsp",
                            //               "l5":"intellectual property www.telkom.co.za/ir/disclaimer.jsp vi. vi. viruses www.telkom.co.za/ir/disclaimer.jsp",
                            //               "l6":"jurisdiction www.telkom.co.za/ir/disclaimer.jsp"
            
                            //           }
                            //       }
            
                            //   },
                             "privacyPolicyLink": datasuccess.privacyPolicyLink
                        //      {
                        // 	"h1": "Privacy Statement",
                        // 	"p1": "Your privacy is very important to Telkom SA SOC Limited (\"Telkom\"). Telkom has developed this statement to help you to understand how we collect, communicate and use any personal information that you submit to us. For the purposes of this statement, \"personal information\" shall be defined as detailed in the Protection of Personal  Information Act 4 of 2013 (\"POPI\").",
                        // 	"h2": "Personal Information we collect",
                        // 	"p2": "Telkom collects and processes your personal information mainly to provide services and products to you and to help improve our offerings to you. The type of personal information we collect will depend on the purpose for which it is collected and used, the specific purpose for which the information is collected will be apparent from the context in which the information is requested. We collect information directly from you, for example when you purchase a product or services from us or when you submit enquiries to us or contact us we'll ask for personal information, such as your name and surname, identity or passport number, Telkom account number, postal or street address, title, contact numbers or e-mail address. We may collect information from the use of our services, for example non-personal browsing habits and click patterns, e-mail address, IP address, telephone data information or username and password. Where possible, we will inform you what information is voluntary or mandatory for you to provide to us and the consequences for failing to provide the requested information. We will only retain your personal information as long as necessary for the fulfilment of those purposes as have been identified by us.",
                        // 	"h3": "How we use your information",
                        // 	"p3": {
                        // 		"listType": "Telkom processes the abovementioned personal information only for the purposes which it was collected, as authorised by law or as agreed with you, for example:",
                        // 		"listItems": {
                        // 			"l1": "To respond to your enquiry.",
                        // 			"l2": "To provide services or products to you",
                        // 			"l3": "To provide access to restricted pages on this website.",
                        // 			"l4": "To comply with legal requirements or industry codes...."
                        
                        // 		}
                        // 	}
                        //     }
                   


                 };
                 const response = {
                            statusCode: Config.StatusCodes.Success,
                            msg: "Retrieved Privacy Policy successfully",
                            headers: {
                                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                            },
                            body: bodyData
                        };
                        callback(null,response);
             });
        };
        
function ReadBusinessRules(paramsReadRules) {
    return new Promise((resolve, reject) => {
        var dynamodb = new aws.DynamoDB();
        dynamodb.getItem(paramsReadRules, function(err, data) {
            if (err) {
                console.log('Failed in Read ReadBusinessRules :' + err);
                reject(err);
            } else {
                console.log('data ReadBusinessRules:', data);
                var jsonData = aws.DynamoDB.Converter.unmarshall(data.Item);
                console.log('Read from ReadBusinessRules Dynamo-DB record succeeded !!!.', jsonData);
                resolve(jsonData);
            }
        });

    });
}

