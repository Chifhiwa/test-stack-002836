/* eslint-disable */
var AWS = require('aws-sdk');
var Config=require('./Config.json');
var docClient = new AWS.DynamoDB.DocumentClient();
var currentdate = new Date(); 
exports.handler = function (event, context, callback) {
    
    console.log("event : "+JSON.stringify(event));
    if(event.httpMethod=="GET"){
      if(event.path=="/billingdashboard/getbillinggraph"){
            console.log("Inside API /Producer/billingdashboard/getbillinggraph")
            var producerID=event.queryStringParameters.producerID;
            // Read the Items From Dynamo DB Table

            var paramsReadItem = {
                TableName: process.env.BillingTable,
                TableIndex: "producerID-index",
                FilterExpression: "#producerID = :producerID AND #D IN (:i, :v, :s)",
                ExpressionAttributeNames: {
                    "#producerID": "producerID",
                    "#D" : "details"
                },
                ExpressionAttributeValues: { 
                    ":producerID": producerID,
                    ":i": "imageAds",
                    ":v": "videoAds",
                    ":s": "Surveys"
                },
            }; 
            console.log("paramsReadItem ::",paramsReadItem);
            getDynamoDbDataViaIndex(paramsReadItem).then(datasuccess => {
                
                console.log("datasuccess::",datasuccess);
                
                var rsaTime = new Date().toLocaleString("en-ZA", {timeZone: "Africa/Johannesburg"});
                var today = new Date(rsaTime);
                console.log("RSA Time Now: ",today.toLocaleString());
                var year = today.getFullYear().toString();
                
                var janList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 01 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var febList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 02 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var marList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 03 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var aprList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 04 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var mayList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 05 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var junList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 06 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var julList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 07 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var augList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 08 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var sepList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 09 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var octList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 10 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var novList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 11 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                var decList = datasuccess.Items.filter(function(item){return Number(item["transactionDate"].split("-")[1]) == 12 && Number(item["transactionDate"].split("-")[0]) == Number(year)});
                
                var GraphCoordinates = []; 
                
                if(janList.length != 0){
                    
                    // var posList = janList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = janList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Jan posList: ",posList);
                    console.log("Jan negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Jan Sorted Add: ",transAmtAdd);
                    console.log("Jan Sorted Sub: ",transAmtSub);
                   
                    // transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    // transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("Jan Sum: ",transAmtAdd);
                    // console.log("Jan Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Jan Total: ",transAmtTotal);
                    
                    var janExp = {};

                    janExp["month"] = "JAN";
                    janExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(janExp);
                }
                else if(janList.length == 0){
                    var janExp = {};

                    janExp["month"] = "JAN";
                    janExp["expenditure"] = 0;

                    GraphCoordinates.push(janExp);
                }

                if(febList.length != 0){
                    
                    // var posList = febList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = febList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Feb posList: ",posList);
                    console.log("Feb negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Feb Sorted Add: ",transAmtAdd);
                    console.log("Feb Sorted Sub: ",transAmtSub);
                   
                    // transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    // transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("Feb Sum: ",transAmtAdd);
                    // console.log("Feb Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Total: ",transAmtTotal);
                    
                    var febExp = {};

                    febExp["month"] = "FEB";
                    febExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(febExp);
                }
                else if(febList.length == 0){
                    var febExp = {};

                    febExp["month"] = "FEB";
                    febExp["expenditure"] = 0;

                    GraphCoordinates.push(febExp);
                }

                if(marList.length != 0){
                    
                    // var posList = marList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = marList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Mar posList: ",posList);
                    console.log("Mar negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Mar Sorted Add: ",transAmtAdd);
                    console.log("Mar Sorted Sub: ",transAmtSub);
                   
                    // transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    // transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("Mar Sum: ",transAmtAdd);
                    // console.log("Mar Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Mar Total: ",transAmtTotal);
                    
                    var marExp = {};

                    marExp["month"] = "MAR";
                    marExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(marExp);
                }
                else if(marList.length == 0){
                    var marExp = {};

                    marExp["month"] = "MAR";
                    marExp["expenditure"] = 0;

                    GraphCoordinates.push(marExp);
                }

                if(aprList.length != 0){
                    
                    // var posList = aprList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = aprList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Apr posList: ",posList);
                    console.log("Apr negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Apr Sorted Add: ",transAmtAdd);
                    console.log("Apr Sorted Sub: ",transAmtSub);
                   
                    // transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    // transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("Apr Sum: ",transAmtAdd);
                    // console.log("Apr Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Apr Total: ",transAmtTotal);
                    
                    var aprExp = {};

                    aprExp["month"] = "APR";
                    aprExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(aprExp);
                }
                else if(aprList.length == 0){
                    var aprExp = {};

                    aprExp["month"] = "APR";
                    aprExp["expenditure"] = 0;

                    GraphCoordinates.push(aprExp);
                }

                if(mayList.length != 0){
                    
                    // var posList = mayList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = mayList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("May posList: ",posList);
                    console.log("May negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("May Sorted Add: ",transAmtAdd);
                    console.log("May Sorted Sub: ",transAmtSub);
                   
                    // transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    // transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("May Sum: ",transAmtAdd);
                    // console.log("May Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("May Total: ",transAmtTotal);
                    
                    var mayExp = {};

                    mayExp["month"] = "MAY";
                    mayExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(mayExp);
                }
                else if(mayList.length == 0){
                    var mayExp = {};

                    mayExp["month"] = "MAY";
                    mayExp["expenditure"] = 0;

                    GraphCoordinates.push(mayExp);
                }

                if(junList.length != 0){
                    
                    // var posList = junList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = junList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                   // console.log("June posList: ",posList);
                    console.log("June negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("June Sorted Add: ",transAmtAdd);
                    console.log("June Sorted Sub: ",transAmtSub);
                   
                    // transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    // transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("June Sum: ",transAmtAdd);
                    // console.log("June Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("June Total: ",transAmtTotal);
                    
                    var junExp = {};

                    junExp["month"] = "JUN";
                    junExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(junExp);
                }
                else if(junList.length == 0){
                    var junExp = {};

                    junExp["month"] = "JUN";
                    junExp["expenditure"] = 0;

                    GraphCoordinates.push(junExp);
                }

                if(julList.length != 0){
                    
                    // var posList = julList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = julList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("July posList: ",posList);
                    console.log("July negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("July Sorted Add: ",transAmtAdd);
                    console.log("July Sorted Sub: ",transAmtSub);
                   
                    // transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    // transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("July Sum: ",transAmtAdd);
                    // console.log("July Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("July Total: ",transAmtTotal);
                    
                    var julExp = {};

                    julExp["month"] = "JUL";
                    julExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(julExp);
                }
                else if(julList.length == 0){
                    var julExp = {};

                    julExp["month"] = "JUL";
                    julExp["expenditure"] = 0;

                    GraphCoordinates.push(julExp);
                }

                if(augList.length != 0){
                    
                    // var posList = augList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = augList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Aug posList: ",posList);
                    console.log("Aug negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Aug Sorted Add: ",transAmtAdd);
                    console.log("Aug Sorted Sub: ",transAmtSub);
                   
                    //transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    //transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    // console.log("Aug Sum: ",transAmtAdd);
                    // console.log("Aug Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Aug Total: ",transAmtTotal);
                    
                    var augExp = {};

                    augExp["month"] = "AUG";
                    augExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(augExp);
                }
                else if(augList.length == 0){
                    var augExp = {};

                    augExp["month"] = "AUG";
                    augExp["expenditure"] = 0;

                    GraphCoordinates.push(augExp);
                }

                if(sepList.length != 0){
                    
                    // var posList = sepList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = sepList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Sept posList: ",posList);
                    console.log("Sept negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Sept Sorted Add: ",transAmtAdd);
                    console.log("Sept Sorted Sub: ",transAmtSub);
                   
                    //transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    //transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    //console.log("Sept Sum: ",transAmtAdd);
                    //console.log("Sept Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Sept Total: ",transAmtTotal);
                    
                    var sepExp = {};

                    sepExp["month"] = "SEP";
                    sepExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(sepExp);
                }
                else if(sepList.length == 0){
                    var sepExp = {};

                    sepExp["month"] = "SEP";
                    sepExp["expenditure"] = 0;

                    GraphCoordinates.push(sepExp);
                }

                if(octList.length != 0){
                    
                    // var posList = octList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = octList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Oct posList: ",posList);
                    console.log("Oct negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Oct Sorted Add: ",transAmtAdd);
                    console.log("Oct Sorted Sub: ",transAmtSub);
                   
                    ///transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    //transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    //console.log("Oct Sum: ",transAmtAdd);
                    console.log("Oct Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Total: ",transAmtTotal);
                    
                    var octExp = {};

                    octExp["month"] = "OCT";
                    octExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(octExp);
                }
                else if(octList.length == 0){
                    var octExp = {};

                    octExp["month"] = "OCT";
                    octExp["expenditure"] = 0;

                    GraphCoordinates.push(octExp);
                }
                
                if(novList.length != 0){
                    
                    // var posList = novList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = novList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Nov posList: ",posList);
                    console.log("Nov negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Nov Sorted Add: ",transAmtAdd);
                    console.log("Nov Sorted Sub: ",transAmtSub);
                   
                    //transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    //transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    //console.log("Nov Sum: ",transAmtAdd);
                    //console.log("Nov Minus: ",transAmtSub);
                    
                    //var transAmtTotal = Number(transAmtAdd) - Number(transAmtSub);
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Nov Total: ",transAmtTotal);
                    
                    var novExp = {};

                    novExp["month"] = "NOV";
                    novExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(novExp);
                }
                else if(novList.length == 0){
                    var novExp = {};

                    novExp["month"] = "NOV";
                    novExp["expenditure"] = 0;

                    GraphCoordinates.push(novExp);
                }
                
                if(decList.length != 0){
                    
                    // var posList = decList.filter(function(item){
                    //         return  item["transactionAmount"].charAt(0) == "+";
                    // });
                    
                    var negList = decList.filter(function(item){
                            return  item["transactionAmount"].charAt(0) == "-";
                    });
                        
                    //console.log("Dec posList: ",posList);
                    console.log("Dec negList: ",negList);
                    
                    //var transAmtAdd = [];
                    var transAmtSub = [];
                    
                    // posList.forEach(function(element) {
                    //     //console.log("pos forEach: ", element["transactionAmount"].slice(1));
                    //     transAmtAdd.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    // });
                    
                    negList.forEach(function(element) {
                        //console.log("neg forEach: ", element["transactionAmount"].slice(1));
                        transAmtSub.push(Math.abs(Number(element["transactionAmount"].slice(1))));
                    });
                    
                    //console.log("Dec Sorted Add: ",transAmtAdd);
                    console.log("Dec Sorted Sub: ",transAmtSub);
                   
                    //transAmtAdd = transAmtAdd.reduce((a, b) => a + b, 0);
                    //transAmtSub = transAmtSub.reduce((a, b) => a + b, 0);
                    
                    
                    //console.log("Dec Sum: ",transAmtAdd);
                    console.log("Dec Minus: ",transAmtSub);
                    
                    var transAmtTotal = transAmtSub.reduce((a, b) => a + b, 0);
                
                    console.log("Dec Total: ",transAmtTotal);
                    
                    var decExp = {};

                    decExp["month"] = "DEC";
                    decExp["expenditure"] = Number(transAmtTotal).toFixed(2); 

                    GraphCoordinates.push(decExp);
                }
                else if(decList.length == 0){
                    var decExp = {};

                    decExp["month"] = "DEC";
                    decExp["expenditure"] = 0;

                    GraphCoordinates.push(decExp);
                }

                const response = {
                        statusCode: Config.StatusCodes.Success,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                        },
                        body: JSON.stringify(GraphCoordinates),
                    };
                    console.log("event", JSON.stringify(response));
                    callback(null, response);
            });
        }else{
       producerID= event.pathParameters.producerid;
         var paramsRead = {
                Key: {
               "producerID": {
                 S: producerID
                }
              },
               TableName: process.env.ProducerDetailsTable
             };
             
          ReadItemFromDynamoDb(paramsRead).then(dataProducer => {
              
              console.log("dataProducer::",dataProducer.billingBalance);
             // dataProducer.billingBalance
              var bodyData = {
                            "BillingBalance":dataProducer.billingBalance
                        };
           
            var response={
                isBase64Encoded: false,
                statusCode:  200,
                body: JSON.stringify({
                statusCode: 200,
                body: bodyData
                }),
            headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS 
            },
        
    };

                        callback(null,response);
          });
    }
    }else if(event.AddMoney==true){
        console.log("Action ::AddMoney ");
        var producerID=event.AddMoneyDetails.ProducerID;
        var AmountToBeAdded=event.AddMoneyDetails.Amount;
        
        
            var paramsRead = {
                Key: {
               "producerID": {
                 S: producerID
                }
              },
               TableName: process.env.ProducerDetailsTable
             };
             
          ReadItemFromDynamoDb(paramsRead).then(dataProducer => {
            console.log("Billing DATA::",JSON.stringify(dataProducer));

            var OpeningBalance=dataProducer.billingBalance.walletTotal;
            dataProducer.billingBalance.walletTotal=parseFloat(dataProducer.billingBalance.walletTotal)+parseFloat(AmountToBeAdded);
            dataProducer.billingBalance["unassigned"]=parseFloat(dataProducer.billingBalance.walletTotal);
            dataProducer.billingBalance["reservedSurveys"]=dataProducer.billingBalance.reservedSurveys;
            dataProducer.billingBalance["reservedVideoAds"]=dataProducer.billingBalance.reservedVideoAds;
            dataProducer.billingBalance["reservedImageAds"]=dataProducer.billingBalance.reservedImageAds;
            dataProducer.billingBalance.walletTotal= parseFloat(dataProducer.billingBalance.walletTotal);
         
            console.log('UPDATED BILLING BALANCE: ', dataProducer)
          
            var params = {
                Item: dataProducer,
                TableName: process.env.ProducerDetailsTable
            };

                getCurentTime().then(Current_Time => {
                  writeToDynamoDb(params).then(dataSuccess => {
                    console.log("Depositted successfully",dataSuccess);
                    var dataTransactions={};
                        dataTransactions.producerID=producerID;
                        dataTransactions.openingBalance=OpeningBalance;
                        dataTransactions.transactionAmount= "+"+AmountToBeAdded;
                        dataTransactions.closingBalance=dataProducer.billingBalance.walletTotal;
                        dataTransactions.transactionDate=currentdate.toISOString().substr(0, 10);
                        dataTransactions.transactionTime=Current_Time;
                        dataTransactions.transactionId=new Date().getTime().toString();
                        dataTransactions.details="Deposit";
                        var paramsTransactions = {
                        Item: dataTransactions,
                        TableName: process.env.BillingTable
                        };
            console.log("dataTransactions::",JSON.stringify(dataTransactions));
            writeToDynamoDb(paramsTransactions).then(datasuccess => {
                console.log("Transactions entry made successfully",dataSuccess);
                     var bodyData = {
                            "OpeningBalance":OpeningBalance,
                            "MoneyAdded": AmountToBeAdded,
                            "CurrentBalance": dataTransactions.closingBalance
                        };
                        const response = {
                            statusCode: Config.StatusCodes.Success,
                            msg: "Added Money to wallet successfully",
                            headers: {
                                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                            },
                            body: bodyData
                        };
                        callback(null,response);
                
            });
                 });
                });
          });
        
    }else if(event.WithdrawlMoney==true){
        console.log("Action :: Withdrawal")
        var producerID=event.WithdrawlMoneyDetails.ProducerID;
        var AmountToBeDectuted=event.WithdrawlMoneyDetails.Amount;
        var WithdrawlReason=event.WithdrawlMoneyDetails.Reason;
        
        
            var paramsRead = {
                Key: {
               "producerID": {
                 S: producerID
                }
              },
               TableName: process.env.ProducerDetailsTable
             };
             console.log("paramsRead::",paramsRead);
          ReadItemFromDynamoDb(paramsRead).then(dataProducer => {
              console.log("Billing DATA::",dataProducer);
              var OpeningBalance=dataProducer.billingBalance.unassigned;
              if(OpeningBalance < AmountToBeDectuted){
                  var bodyData = {
                            "OpeningBalance":OpeningBalance,
                            "WithdrawlAmount": parseFloat(AmountToBeDectuted),
                            "CurrentBalance": OpeningBalance,
                            "msg":Config.TzeroConstants.FAILURE
                        };
                        const response = {
                            statusCode: Config.StatusCodes.FAILURE,
                            msg:Config.TzeroConstants.FAILURE,
                            headers: {
                                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                            },
                            body: bodyData
                        };
                        callback(null,response);
              }else{
              dataProducer.billingBalance.walletTotal=dataProducer.billingBalance.walletTotal-AmountToBeDectuted;
               dataProducer.billingBalance.unassigned=dataProducer.billingBalance.unassigned-AmountToBeDectuted;
                //dataProducer.billingBalance["reservedSurveys"]=parseFloat(20);
                    //dataProducer.billingBalance["reservedVideoAds"]=parseFloat(30);
                    //dataProducer.billingBalance["reservedImageAds"]=parseFloat(20);
                var params = {
                    Item: dataProducer,
                    TableName: process.env.ProducerDetailsTable
                };
                getCurentTime().then(Current_Time => {
                  writeToDynamoDb(params).then(dataSuccess => {
                    console.log("Depositted successfully",dataSuccess);
                    var dataTransactions={};
                        dataTransactions.producerID=producerID;
                        dataTransactions.openingBalance=OpeningBalance;
                        dataTransactions.transactionAmount= "-"+AmountToBeDectuted;
                        dataTransactions.closingBalance=dataProducer.billingBalance.walletTotal;
                        dataTransactions.transactionDate= + currentdate.toISOString().substr(0, 10);
                        dataTransactions.transactionId=new Date().getTime().toString();
                        dataTransactions.transactionTime=Current_Time;
                        dataTransactions.details="WithDrawl";
                        dataTransactions.Reason=WithdrawlReason;
                        var paramsTransactions = {
                        Item: dataTransactions,
                        TableName: process.env.BillingTable
                        };
            
            writeToDynamoDb(paramsTransactions).then(datasuccess => {
                console.log("Transactions entry made successfully",dataSuccess);
                     var bodyData = {
                            "OpeningBalance":OpeningBalance,
                            "WithdrawlAmount": AmountToBeDectuted,
                            "CurrentBalance": dataTransactions.closingBalance
                        };
                        const response = {
                            statusCode: Config.StatusCodes.Success,
                            msg: "Successfully widhdrawn Money from wallet successfully",
                            headers: {
                                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                            },
                            body: bodyData
                        };
                        callback(null,response);
                
            });
                 });
                });
              }
          });
         
        
    }else if(event.ProducerTransactions == true){
        console.log("Get Transactions between the dates for Image video Depoit ")
        var startDate=event.Details.StartDate;
        var endDate=event.Details.EndDate;
        var producerID=event.Details.ProducerID;
        var paramsReadItem = {
                TableName: process.env.BillingTable,
                TableIndex: "producerID-index",
                FilterExpression: "#producerID = :producerID",
                ExpressionAttributeNames: {
                    "#producerID": "producerID"
                },
                ExpressionAttributeValues: { 
                    ":producerID": producerID
                },
            }; 
        
        getDynamoDbDataViaIndex(paramsReadItem).then(datasuccess => {
            
            console.log("datasuccess::",datasuccess);
             var responsePayload={
           "imageAds":0,
           "depositsAmount":[],
           "imageAdsviewedOnly":0,
           "imageviewed":[],
           "imagecompleted":[],
           "imageAdscompleted":0,
           "videoAds":0,
           "videoAdsviewedOnly":0,
           "videoAdscompleted":0,
           "videoAddViewedDetails":[],
           "videoAddCompletedDetails":[],
           "surveys":0,
           "surveyscompleted":0,
           "surveysDetails":[],
           "deposits":0,
        }
        
        var listDate = [];
        var dateMove = new Date(startDate);
        var strDate = startDate;

            while (strDate < endDate){
              strDate = dateMove.toISOString().slice(0,10);
              listDate.push(strDate);
              dateMove.setDate(dateMove.getDate()+1);
            };
            console.log("listDate::",listDate);
        //console.log("listDate::",listDate);
            for(var i=0;i<datasuccess.Items.length;i++){
                 for(var j=0;j<listDate.length;j++){
                    var record=datasuccess.Items[i];
                
                    // var start_pos = record.transactionDate.indexOf('-') + 1;
                    // var end_pos = record.transactionDate.indexOf('-',start_pos);
                    // var Month = record.transactionDate.substring(start_pos,end_pos);
                    
                    //console.log("Month::",Month);
                    var transactionDate=record.transactionDate;
                        if(transactionDate.toString().indexOf(listDate[j].toString()) > -1) {
                                
                                if(record.details=="Deposit" && record.details !== undefined){
                                    if(record.transactionAmount && record.transactionAmount != undefined){
                                         responsePayload.deposits = parseFloat(record.transactionAmount) + responsePayload.deposits ;
                                         var depositTransaction={
                                                "date":"",
                                                "deposits":0
                                            };
                                        depositTransaction.date=record.transactionDate;
                                        depositTransaction.deposits=Math.abs(record.transactionAmount);
                                        
                                        responsePayload.depositsAmount.push(depositTransaction);
                                    
                                       
                                       
                                    }
                                   
                                   console.log("responsePayload.depositsAmount::",responsePayload.depositsAmount)
                                    
                                   
                                }
                                
                                
                                if(record.details=="imageAds" && record.details !== undefined){
                                    if(record.transactionAmount && record.transactionAmount != undefined){
                                         responsePayload.imageAds = Math.abs(record.transactionAmount) + responsePayload.imageAds ;
                                    }
                                    if(record.details=="imageAds" && record.details !== undefined && record.completionState.toLowerCase()=="completed"){
                                         responsePayload.imageAdscompleted = Math.abs(record.transactionAmount) + responsePayload.imageAdscompleted ;
                                         
                                         var imageCompletedTransaction={
                                                "date":"",
                                                "imageAdscompleted":0
                                            };
                                            imageCompletedTransaction.date=record.transactionDate;
                                            imageCompletedTransaction.imageAdscompleted=Math.abs(record.transactionAmount)
                                        
                                        responsePayload.imagecompleted.push(imageCompletedTransaction);
                                    }
                                    if(record.details=="imageAds" && record.details !== undefined && record.completionState.toLowerCase()=="viewed"){
                                         responsePayload.imageAdsviewedOnly = Math.abs(record.transactionAmount) + responsePayload.imageAdsviewedOnly ;
                                         
                                         
                                         var imageviewedTransaction={
                                                "date":"",
                                                "imageAdsviewed":0
                                            };
                                            imageviewedTransaction.date=record.transactionDate;
                                            imageviewedTransaction.imageAdsviewed=Math.abs(record.transactionAmount)
                                        
                                        responsePayload.imageviewed.push(imageviewedTransaction);
                                        
                                        
                                    }
                                   
                                }
                                
                                
                                if(record.details=="videoAds" && record.details !== undefined){
                                   // console.log("record video ads:",record);
                                    if(record.transactionAmount && record.transactionAmount != undefined){
                                         responsePayload.videoAds = Math.abs(record.transactionAmount) + responsePayload.videoAds ;
                                    }
                                    if(record.details=="videoAds" &&  record.completionState.toLowerCase()=="completed"){
                                         responsePayload.videoAdscompleted = Math.abs(record.transactionAmount) + responsePayload.videoAdscompleted ;
                                     console.log("record video completed:",record);
                                        //responsePayload.videoAdscompleted =100;
                                        
                                        var videoAddCompletedTransaction={
                                                "date":"",
                                                "videoAdd":0
                                            };
                                            videoAddCompletedTransaction.date=record.transactionDate;
                                            videoAddCompletedTransaction.videoAdd=Math.abs(record.transactionAmount)
                                        responsePayload.videoAddCompletedDetails.push(videoAddCompletedTransaction);
                                        
                                    } 
                                    if(record.details=="videoAds" && record.details !== undefined && record.completionState && record.completionState.toLowerCase()=="viewed"){
                                         responsePayload.videoAdsviewedOnly = Math.abs(record.transactionAmount) + responsePayload.videoAdsviewedOnly ;
                                         var videoAddViewedTransaction={
                                                "date":"",
                                                "videoAdd":0
                                            };
                                            videoAddViewedTransaction.date=record.transactionDate;
                                            videoAddViewedTransaction.videoAdd=Math.abs(record.transactionAmount)
                                        responsePayload.videoAddViewedDetails.push(videoAddViewedTransaction);
                                    console.log("record video viewed:",record);
                                        
                                    }
                                    
                                }
                                
                                 if(record.details=="Surveys" && record.details !== undefined){
                                  
                                    if(record.transactionAmount && record.transactionAmount != undefined){
                                         responsePayload.surveys = Math.abs(record.transactionAmount) + responsePayload.surveys ;
                                    }
                                   // if(record.details=="Surveys" &&  record.completionState.toLowerCase()=="completed"){
                                   if(record.details=="Surveys" ){
                                         responsePayload.surveyscompleted = Math.abs(record.transactionAmount) + responsePayload.surveyscompleted ;
                                        var surveysTransaction={
                                                "date":"",
                                                "surveys":0
                                            };
                                            surveysTransaction.date=record.transactionDate;
                                            surveysTransaction.surveys=Math.abs(record.transactionAmount)
                                        responsePayload.surveysDetails.push(surveysTransaction);
                                        
                                    } 
                                   
                                    
                                    
                                    
                                    
                                   
                                }
                                
                                
                               
                            
                        }
                        
                 }
                }
                
                
                    
                                    //   if(responsePayload.depositsAmount.length>0){
                                    //      for(var k=0;k<responsePayload.depositsAmount.length-1;k++){
                                    //          console.log("responsePayload.depositsAmount[k]::"+JSON.stringify(responsePayload) +"comapre with::"+record.transactionDate );
                                               
                                    //             if(responsePayload.depositsAmount[k].date.toString().indexOf(responsePayload.depositsAmount[k+1].date.toString()) > -1){
                                    //                 console.log("inside if")
                                    //                 responsePayload.depositsAmount[k].deposits =responsePayload.depositsAmount[k].deposits+responsePayload.depositsAmount[k+1].deposits;
                                    //               //responsePayload.depositsAmount.splice(k, 1);
                                    //               responsePayload.depositsAmount.splice(k+1);
                                    //             } 
                                         
                                    //         }
                                    //     }
                                   
                                   
                                   const m = new Map();
                                   if(responsePayload.depositsAmount.length>0){
                                         responsePayload.depositsAmount.forEach(({ date, deposits }) => m.set(date, (m.get(date) || 0) + deposits));
                                         responsePayload.depositsAmount = [...m].map(([date, deposit]) => ({ date, deposit }));
                                   }
                                        
                                        const n = new Map();
                                   if(responsePayload.imagecompleted.length>0){
                                         responsePayload.imagecompleted.forEach(({ date, imageAdscompleted }) => n.set(date, (n.get(date) || 0) + imageAdscompleted));
                                         responsePayload.imagecompleted = [...n].map(([date, imageAdscompleted]) => ({ date, imageAdscompleted }));
                                   }
                                   
                                    const o = new Map();
                                   if(responsePayload.imageviewed.length>0){
                                         responsePayload.imageviewed.forEach(({ date, imageAdsviewed }) => o.set(date, (o.get(date) || 0) + imageAdsviewed));
                                         responsePayload.imageviewed = [...o].map(([date, imageAdsviewed]) => ({ date, imageAdsviewed }));
                                   }
                                       
                                    
                                    const p = new Map();
                                   if(responsePayload.surveysDetails.length>0){
                                         responsePayload.surveysDetails.forEach(({ date, surveys }) => p.set(date, (p.get(date) || 0) + surveys));
                                         responsePayload.surveysDetails = [...p].map(([date, surveys]) => ({ date, surveys }));
                                   }
                                        
                                    const q = new Map();
                                   if(responsePayload.videoAddViewedDetails.length>0){
                                         responsePayload.videoAddViewedDetails.forEach(({ date, videoAdd }) => q.set(date, (q.get(date) || 0) + videoAdd));
                                         responsePayload.videoAddViewedDetails = [...q].map(([date, videoAdd]) => ({ date, videoAdd }));
                                   }
                                   
                                   
                                   
                                   const r = new Map();
                                   if(responsePayload.videoAddCompletedDetails.length>0){
                                         responsePayload.videoAddCompletedDetails.forEach(({ date, videoAdd }) => r.set(date, (r.get(date) || 0) + videoAdd));
                                         responsePayload.videoAddCompletedDetails = [...r].map(([date, videoAdd]) => ({ date, videoAdd }));
                                   }
                                   
           responsePayload.imageAds=responsePayload.imageAdsviewedOnly  +responsePayload.imageAdscompleted;
            responsePayload.videoAds=responsePayload.videoAdsviewedOnly  +responsePayload.videoAdscompleted;
           console.log("responsePayload ::",responsePayload);
            
            console.log("Successfully retrieved data for producer Transactions");
                     var bodyData = responsePayload;
                        const response = {
                            statusCode: Config.StatusCodes.Success,
                            msg: "Successfully retrieved data for producer Transactions",
                            headers: {
                                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
                            },
                            body: bodyData
                        };
                        callback(null,response);
         });
  
}
            
            
            
           
};

function getCurentTime(){
     return new Promise((resolve, reject) => {
    var hour = currentdate.getHours();
         hour = (hour < 10 ? "0" : "") + hour;
                    
         var min  = currentdate.getMinutes();
         min = (min < 10 ? "0" : "") + min;
                    
         var sec  = currentdate.getSeconds();
         sec = (sec < 10 ? "0" : "") + sec;
         var Current_Time="Time::"+hour +"-hrs-"+min+"-min-"+sec+"-sec";
         console.log("Current_Time",Current_Time);
        resolve(Current_Time)    
     });
}
function getDynamoDbDataViaIndex(params) {
        return new Promise((resolve, reject) => {
            docClient.scan(params, function (err, data) {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                    console.log("Scan succeeded.");
                    /*data.Items.forEach(function(itemdata) {
                       console.log("Item :", JSON.stringify(itemdata.demographics.isTargeted));
                    });*/
                    resolve(data);
                }
            });
        });
    }

function writeToDynamoDb(params) {
    return new Promise((resolve, reject) => {
        var documentClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
        documentClient.put(params, function (err, data) {
            if (err) {
                console.log('Error Writing record into dynamo-DB failed: ' + err);
                reject();
            }
            else {
                console.log('Write to Dynamo-DB record succeeded !!!.');
                resolve(data);
            }

        });
    });
}

function ReadItemFromDynamoDb(paramsRead) {
    return new Promise((resolve, reject) => {
        var dynamodb = new AWS.DynamoDB();
        dynamodb.getItem(paramsRead, function(err, data) {
            if (err) {
                console.log('Failed in Read ReadItemFromDynamoDb :' + err);
                reject(err);
            } else {
                console.log('data ReadItemFromDynamoDb:', data);
                var jsonData = AWS.DynamoDB.Converter.unmarshall(data.Item);
                console.log('Read from ReadItemFromDynamoDb Dynamo-DB record succeeded !!!.', jsonData);
                resolve(jsonData);
            }
        });

    });
}