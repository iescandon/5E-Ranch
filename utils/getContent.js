// src/utils.js
import { createClient } from 'contentful';

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

const getContent = async (type) => {
  const client = createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
  });

  const response = await client.getEntries({
    content_type: type,
  });
  
  return response.items;
};

export default getContent;