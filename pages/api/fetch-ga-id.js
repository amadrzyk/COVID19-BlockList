// import environment variables in dev
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

export default async (req, res) => {
    return res.json({
        id: process.env.GA_TRACKING_ID
    })
}