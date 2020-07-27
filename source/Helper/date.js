const dateConversion = (value) => {
    return new Date(new Date(value).getTime() - 3 * 3600 * 1000);   //convert UTC to GMT -3
}

export const shortDate = value => {
    
    if (!value)
        return "";

    let date = dateConversion(value);
    return `${date.getUTCDate() + 1}/${date.getUTCMonth() + 1}`;
}

export const getMonth = value => months[value];