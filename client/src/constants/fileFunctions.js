export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function fileFormatExtractor(file_mimeType) {
  const fileFormatString = file_mimeType;
  const parts = fileFormatString.split("/");
  const fileFormat = parts[1];
  return fileFormat;
}

export function fileNameExtractor(fileUrl) {
  const fileName = fileUrl.split("/").pop();
  return fileName;
}

export function findFileExtension(fileName) {
  const fileExtension = fileName.split("/")[0];
  return fileExtension;
}
