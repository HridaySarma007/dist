export function formatDateTime(d) {
    // const dString = new Intl.DateTimeFormat("en-In",{
    //   year:'numeric', month:'long', day:'numeric',
    //   hour:'numeric',minute:'numeric', second:'numeric'
    //   }).format(date);
    //   return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
    let date = new Date(d);
    if (!isNaN(date.getHours())) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + " " + getConvertedMonth((date.getMonth() + 1)) + " " + date.getFullYear() + " at " + strTime;
    } else {
        return "Invalid Date !";
    }
}

function getConvertedMonth(month) {
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}


/*let dateStr = "Fri Apr 20 2020 00:00:00 GMT+0530 (India Standard Time)";
 let l = new Date(dateStr).toISOString();
  let d = new Date(l).getTime(); console.log(d)*/