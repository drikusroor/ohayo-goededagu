interface CloudinaryImageTransformOptions {
  qAuto: 'low' | 'good' | 'eco'
  width: number
}

// compressed url is done by splitting the url at upload/ and adding /upload/q_auto:low/c_scale,w_1024/ in between
// see also: https://cloudinary.com/documentation/image_transformations#automatic_format_selection
export const getCompressedImageUrl = (
  url: string,
  options: CloudinaryImageTransformOptions = { qAuto: 'eco', width: 1024 }
) => {
  const [baseUrl, imageId] = url.split('upload/')

  return `${baseUrl}upload/q_auto:${options.qAuto}/c_scale,w_${options.width}/${imageId}`
}
