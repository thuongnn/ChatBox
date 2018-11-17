export const timestampToDateTime = (timestamp) => {
    let dataConvert = new Date(timestamp);

    let minutes = "0" + dataConvert.getMinutes(),
        hours = dataConvert.getHours(),
        date = dataConvert.getDate(),
        month = dataConvert.getMonth(),
        year = dataConvert.getFullYear();

    return `${hours}:${minutes.substr(-2)} ${date}/${month}/${year}`;
};

export const lastTimeOnline = (current, previous) => {
    if (!previous) return;

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) return "";
    else if (elapsed < msPerHour)
        return `Online ${Math.round(elapsed / msPerMinute)} minutes ago`;
    else if (elapsed < msPerDay)
        return `Online ${Math.round(elapsed / msPerHour)} hours ago`;
    else if (elapsed < msPerMonth)
        return `Online ${Math.round(elapsed / msPerDay)} days ago`;
    else if (elapsed < msPerYear)
        return `Online ${Math.round(elapsed / msPerMonth)} months ago`;
    else
        return `Online ${Math.round(elapsed / msPerYear)} years ago`;

};

