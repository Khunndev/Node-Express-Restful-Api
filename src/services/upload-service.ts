import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";

const writeFileAsync = promisify(fs.writeFile);

export async function saveImageToDisk(baseImage: string) {
  // Find the real path of the project
  const projectPath = path.resolve("./");
  // Folder and path for uploading
  const uploadPath = `${projectPath}/srchh/public/images/`;

  // Find the file extension
  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );

  // Generate a random filename with the extension
  let filename = "";
  if (ext === "svg+xml") {
    filename = `${uuidv4()}.svg`;
  } else {
    filename = `${uuidv4()}.${ext}`;
  }

  // Extract base64 data
  const image = decodeBase64Image(baseImage);

  // Write the file to the path
  await writeFileAsync(uploadPath + filename, image.data, "base64");
  // Return the new filename
  return filename;
}

function decodeBase64Image(base64Str: string): { type: string; data: string } {
  const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const image: { type?: string; data?: string } = {};

  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  image.type = matches[1];
  image.data = matches[2];
  return image as { type: string; data: string };
}
