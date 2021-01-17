export function serviceLink() {
    // return servicelink
        return  "https://localhost:8000";
}

export function getYear()
{
    let year = JSON.parse(localStorage.getItem('settings'));

    if (year && year.godina) {
        return year.godina ;
    } else {
        return null;
    }

}