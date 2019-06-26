export const normalizeMediaObject = (mediaData, user_id) => mediaData
  .map(data => ({
    hastags: data.tags,
    text: data.caption ? data.caption.text : '',
    product_image: data.images.standard_resolution.url,
    image_id: data.id,
    user_id,
  }));

// export const
