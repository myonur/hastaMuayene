function convertDate (str) {  
    let string = str.split("/");
   
    return string[2] +'/'+ string[1]  +'/' + string[0] ; 
}


function gununTarihi () {
    let ts = Date.now();

    let date_time = new Date(ts);
    let date = date_time.getDate();
    if (date < 10) date = '0' + date;    
    let month = date_time.getMonth() + 1;
    
    if (month < 10) month = '0' + month;
    let year = date_time.getFullYear();

    return date +'/'+ month +'/'+  year;
    
}


module.exports = {convertDate, gununTarihi};