
//Function to get variables from URL
function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(null);
}
function base64ToArrayBuffer(base64) {
    base64 = base64.replace("data:application/x-bzip2;base64,", '');
    console.log(base64);
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
// Function to load files (async) (bypass cross-origin [CORS] errors)
async function corsBypass(URL) {
    console.log(3);
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(URL)}`)
    .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
    })
    .then(data => {
        console.log(4);
        var dat = data.contents
        if (!dat.startsWith("data:application/x-bzip2;base64,")) {
            return dat;
        }
        const arrayBuffer = base64ToArrayBuffer(dat);
    
        // Convert binary data to Uint8Array
        const bytes = new Uint8Array(arrayBuffer);
        var dataa = bzip2.simple(bzip2.array(bytes))
        console.log(1);
        return dataa

    });
    return response;
    /*(async function getData(URL) {
        console.log(5);
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.allorigins.win/get?url=${encodeURIComponent(URL)}`, true);
            //xhr.setRequestHeader('Access-Control-Allow-Origin', URL);
            xhr.responseType = 'text';
            console.log(1);
            xhr.onload = function () {
                console.log(7);
                if (this.status >= 200 && this.status < 300) {
                    console.log(2);
                    var bytes = new Uint8Array(JSON.parse(xhr.responseText).contents)
                    resolve(bzip2.simple(bzip2.array(bytes)));
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
            console.log(3);
        });
    }
    
    console.log(URL);
    try {
        var data = await getData(URL);
    } catch(e) {
        console.log(e);
    }
    
    console.log(data + " (corsBypass)   ");
    return data;*/
}

//Function to set cookie
function setCookie(name,value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + 999999999);
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//Function to get cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Set Dark Mode Cookie if non-existant
if (!document.cookie) {
    setCookie("enableDarkMode",false)
} else {
    refreshDarkMode()
}

// Function called by buttons that toggle dark mode on/off
function toggleDarkMode() {
    let darkModeStatus = getCookie("enableDarkMode")
    if (darkModeStatus) {
        setCookie("enableDarkMode",false)
    } else {
        setCookie("enableDarkMode",true)
    }
    refreshDarkMode()
}

// Function to enable/disable Dark Mode
function refreshDarkMode() {
    let darkModeStatus = getCookie("enableDarkMode")
    //Check Browser is not IE
    if (navigator.userAgent.indexOf("Trident") < 0) {
        if (darkModeStatus) {
            document.getElementsByTagName('html')[0].classList.add("darkMode")
        } else {
            document.getElementsByTagName('html')[0].classList.remove("darkMode")
        }
    } else {
        alert("Sorry Internet Explorer does not support this feature!")
    }
}