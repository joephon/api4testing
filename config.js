module.exports = {
    port: process.env.PORT || 30000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/api4testing',
    appId: process.env.APP_ID || '',
    appSecret: process.env.APP_SECRET || '',
}