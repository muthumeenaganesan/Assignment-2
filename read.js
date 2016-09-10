var array1=[];
var arr=[];
var female=[];
var male=[];
var total=[];
var top=[];
var desc=[];




var fs = require('fs');
var  readline = require('readline');


      lineByline = readline.createInterface({
        input :fs.createReadStream('filter.csv')
    });

    lineByline.on('line',function(line){
    var rows = line.split(",");
    array1.push(rows);

  });


  lineByline.on('close',function () {
    var a=[].concat.apply([],array1[0]);
    //console.log(a[1]);


  var t=1;
    for(var i=0;i<13704;i++)
    {
      var value=[];
      var obj={};
      value=[].concat.apply([],array1[t]);

 //console.log(value[0]);

      for(var j=0;j<6;j++)
       {
        obj[a[j]]=value[j];

      }
      arr.push(obj);
      t++;
      //console.log(JSON.stringify(obj));
    }
  //console.log(arr[0]);



    for(var i=0;i<arr.length;i++){
      if(arr[i].IndicatorName=="Life expectancy at birth female (years)"){
        female.push(arr[i]);
       //console.log(JSON.stringify(arr[i]));

    }
  }



  for(var i=0;i<arr.length;i++){
    if(arr[i].IndicatorName=="Life expectancy at birth male (years)"){
      male.push(arr[i]);

    }
}
  //console.log(JSON.stringify(male));




for(var i=0;i<arr.length;i++){
  if(arr[i].IndicatorName=="Life expectancy at birth total (years)"){
    total.push(arr[i]);

    //console.log(JSON.stringify(arr[i]));
  }
}
//console.log(total);
function compare(a,b) {
  if (a.Value > b.Value)
    return -1;
  if (a.Value < b.Value)
    return 1;
  return 0;
}

for(var i=0;i<total.length;i++){
  total.sort(compare);
  desc.push(total[i].Value);
}
//console.log(desc);

for(var i=0;i<desc.length;i++){
  for(var j=0;j<total.length;j++){


    if(total[j].Value==desc[i]){
      top[i]=total[j];
    }
  }
}
//console.log(top);


var test=[];
for(var i=0;i<5;i++){
    var seen = {};
    //You can filter based on Id or Name based on the requirement

    var uniqueCountry = top.filter(function(item){
    if(seen.hasOwnProperty(item.CountryName)){
        return false;
      }
    else{
     seen[item.CountryName] = true;
     return true;
   }
});
test[i]=uniqueCountry[i];
//console.log(test[i].Value);

}
//console.log(test);
//console.log("uniqueArray is: " + JSON.stringify(uniqueArray));

var test1=JSON.stringify(test);
var test2=JSON.stringify(male);
var test3=JSON.stringify(female);
var json1=fs.writeFile('five.json',test1,function(err){
if(err){
 //console.log("error in json creation");
}
}
)

var json2=fs.writeFile('male.json',test2,function(err){
if(err){
 //console.log("error in json creation");
}
}
)
var json3=fs.writeFile('female.json',test3,function(err){
if(err){
 //console.log("error in json creation");
}
}
)

});
