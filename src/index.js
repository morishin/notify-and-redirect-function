const Axios = require('axios');

const env = (key) => {
  const val = process.env[key];
  if (val === undefined) {
    throw new Error(`ENV: ${key} is required.`);
  }
  return val;
}

const REDIRECT_URL = env('REDIRECT_URL');
const SLACK_WEBHOOK_URL = env('SLACK_WEBHOOK_URL');
const NOTIFICATION_TEXT = env('NOTIFICATION_TEXT');

exports.handler = async () => {
  await Axios.post(
    SLACK_WEBHOOK_URL,
    { text: NOTIFICATION_TEXT }
  )
  return {
    statusCode: 302,
    headers: {
      Location: REDIRECT_URL,
      'Cache-Control': 'no-cache',
    },
  };
};
