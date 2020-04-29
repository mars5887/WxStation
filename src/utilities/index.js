const  getLocalTimeUnix = (date, local) =>  new Date( (date *1000) ).toLocaleTimeString(local);
export const getEnUSLocalTime = ( date ) => getLocalTimeUnix(date, "en-us");

export const getDayOfWeek = ( date ) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if ( typeof myVar === 'string' || date instanceof String ) {
        return days[ new Date(Date.parse(date)).getDay()];
    }
    else if ( date instanceof Date ) {
        return days[ date.getDay()];
    }
}


export const getWxItemsByDay = (items) => {
    let days = {};
    let last;
    for ( let item of items ) {

        let day = new Date(Date.parse(item.dt_txt)).getDate();
        if (last == undefined ) {
            days[day]=[];
            days[day].push(item);
            last=day;
        }
        else if ( last !== day ) {
            days[day]=[];
            days[day].push(item);
            last=day;
        }
        else if ( last == day ) {
            days[day].push(item);
        }
                    
    }

    return days;
}