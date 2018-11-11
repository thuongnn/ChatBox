export const timestampToDateTime = (timestamp) => {
    let dataConvert = new Date(timestamp);

    let minutes = "0" + dataConvert.getMinutes(),
        hours = dataConvert.getHours(),
        date = dataConvert.getDate(),
        month = dataConvert.getMonth(),
        year = dataConvert.getFullYear();

    return `${hours}:${minutes.substr(-2)} ${date}/${month}/${year}`;
};

