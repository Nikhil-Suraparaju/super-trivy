// Application configuration
// WARNING: This file contains demo credentials - NOT for production use

const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwtSecret: 'super-secret-jwt-key-healthcare-2023',
    jwtExpiry: '24h'
  },
  database: {
    uri: process.env.MONGO_URI || 'mongodb://admin:P@ssw0rd123!@localhost:27017/healthcaredb',
    name: 'healthcaredb'
  },
  aws: {
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    region: 'us-east-1',
    s3Bucket: 'healthcare-patient-records-prod'
  },
  integrations: {
    twilioApiKey: 'DEMO_TWILIO_KEY',
    sendgridApiKey: 'SG.XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    stripeSecretKey: 'fake_stripe_secret'
  },
  encryption: {
    key: 'aes-256-key-healthcare-portal-12',
    iv: '1234567890123456'
  }
};

module.exports = config;
