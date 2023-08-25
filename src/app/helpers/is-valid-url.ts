const isValidUrl = (url:string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default isValidUrl;