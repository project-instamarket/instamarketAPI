import logger from '../logger';


const apiResponse = (res, status, data, responseCode = 200, meta = {}) => {
  const logMessage = `Response Code: ${responseCode}`;
  if ((responseCode !== 200 && responseCode !== 201)) {
    logger.error(logMessage);
  } else {
    logger.info(logMessage);
  }

  if (status === 'success') {
    const response = {
      status,
      data,
      ...meta
    };

    return res.status(responseCode).json(response);
  }
  responseCode = responseCode || 400;
  return res.status(responseCode).json({ status, message: data });
};

export default apiResponse;
