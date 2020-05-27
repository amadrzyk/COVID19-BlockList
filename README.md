# Usage
### Request
```
import axios from 'axios'

const response = (await axios.post('/api/check-blocklist', {
    endpoints: [
        "google.com",
        "facebook.com",
        "15mincovid19test.com",
        "19covidcrafunds.com"
    ]
})).data;
```

### Response
```
{
    "safe": [
        "google.com",
        "facebook.com"
    ],
    "unsafe": [
        "15mincovid19test.com",
        "19covidcrafunds.com"
    ]
}
```

# 💰 Sponsors
Huge thank you to [ZEIT](https://zeit.co/) for sponsoring this project and our related COVID-19 efforts, without them 
this wouldn't be possible. ZEIT is one of the easiest ways to deploy code to the cloud – this project leverages the 
[ZEIT Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 
and [Next.js](https://nextjs.org/docs/deployment). Check out the links for more details!
