export default async (req, res) => {
    return res.json({
        id: process.env.GA_TRACKING_ID
    })
}