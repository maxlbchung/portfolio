import { deflateSync, inflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const spriteSheet = readFileSync(
  new URL("../src/assets/pixel-art/hands-up.png", import.meta.url),
);

const paeth = (left, up, upperLeft) => {
  const estimate = left + up - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const upDistance = Math.abs(estimate - up);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= upDistance && leftDistance <= upperLeftDistance) return left;
  return upDistance <= upperLeftDistance ? up : upperLeft;
};

const decodeRgbaPng = (png) => {
  if (png.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error("The hands-up sprite sheet is not a PNG.");
  }

  let pngWidth;
  let pngHeight;
  const imageData = [];
  for (let offset = 8; offset < png.length; ) {
    const length = png.readUInt32BE(offset);
    const type = png.subarray(offset + 4, offset + 8).toString("ascii");
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      pngWidth = data.readUInt32BE(0);
      pngHeight = data.readUInt32BE(4);
      if (data[8] !== 8 || data[9] !== 6 || data[12] !== 0) {
        throw new Error("The sprite sheet must be a non-interlaced 8-bit RGBA PNG.");
      }
    } else if (type === "IDAT") {
      imageData.push(data);
    }
    offset += length + 12;
  }

  if (!pngWidth || !pngHeight || !imageData.length) {
    throw new Error("The sprite sheet PNG is incomplete.");
  }

  const bytesPerPixel = 4;
  const rowLength = pngWidth * bytesPerPixel;
  const filtered = inflateSync(Buffer.concat(imageData));
  const pixels = Buffer.alloc(rowLength * pngHeight);
  let sourceOffset = 0;

  for (let y = 0; y < pngHeight; y++) {
    const filter = filtered[sourceOffset++];
    const rowOffset = y * rowLength;
    for (let x = 0; x < rowLength; x++) {
      const raw = filtered[sourceOffset++];
      const left = x >= bytesPerPixel ? pixels[rowOffset + x - bytesPerPixel] : 0;
      const up = y > 0 ? pixels[rowOffset - rowLength + x] : 0;
      const upperLeft = y > 0 && x >= bytesPerPixel
        ? pixels[rowOffset - rowLength + x - bytesPerPixel]
        : 0;
      const predictor = [0, left, up, Math.floor((left + up) / 2), paeth(left, up, upperLeft)][filter];
      if (predictor === undefined) throw new Error(`Unsupported PNG filter: ${filter}`);
      pixels[rowOffset + x] = (raw + predictor) & 0xff;
    }
  }

  return { width: pngWidth, height: pngHeight, pixels };
};

const decoded = decodeRgbaPng(spriteSheet);
const width = decoded.height;
const height = decoded.height;
if (decoded.width < width || decoded.width % width !== 0) {
  throw new Error("The hands-up sprite sheet must contain square frames in one row.");
}

const sourcePixels = Array.from({ length: width * height }, (_, index) => {
  const x = index % width;
  const y = Math.floor(index / width);
  const source = (y * decoded.width + x) * 4;
  return {
    x,
    y,
    red: decoded.pixels[source],
    green: decoded.pixels[source + 1],
    blue: decoded.pixels[source + 2],
    alpha: decoded.pixels[source + 3],
  };
}).filter(({ alpha }) => alpha > 0);

const colorGroups = new Map();
for (const pixel of sourcePixels) {
  const key = [pixel.red, pixel.green, pixel.blue, pixel.alpha].join(",");
  const path = colorGroups.get(key) ?? [];
  path.push(`M${pixel.x} ${pixel.y}h1v1H${pixel.x}z`);
  colorGroups.set(key, path);
}

const spritePaths = [...colorGroups].map(([color, paths]) => {
  const [red, green, blue, alpha] = color.split(",").map(Number);
  const hex = `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  const opacity = alpha === 255 ? "" : ` fill-opacity="${(alpha / 255).toFixed(3)}"`;
  return `  <path d="${paths.join("")}" fill="${hex}"${opacity}/>`;
}).join("\n");

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">
  <!-- Generated from the original hands-up sprite sheet kept in src/assets/pixel-art. -->
  <path d="M0 0h${width}v${height}H0z" fill="#000"/>
${spritePaths}
</svg>
`;

writeFileSync(`${projectRoot}public/images/favicon.svg`, favicon);

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit++) {
    crc = (crc & 1) === 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  return crc >>> 0;
});

const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

const pngChunk = (type, data) => {
  const typeBuffer = Buffer.from(type);
  const chunk = Buffer.alloc(data.length + 12);
  chunk.writeUInt32BE(data.length, 0);
  typeBuffer.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), data.length + 8);
  return chunk;
};

const previewWidth = 1024;
const previewHeight = 1024;
const scale = 32;
const offsetX = Math.floor((previewWidth - width * scale) / 2);
const offsetY = Math.floor((previewHeight - height * scale) / 2);
const stride = previewWidth * 4 + 1;
const bitmap = Buffer.alloc(stride * previewHeight);

for (let y = 0; y < previewHeight; y++) {
  const row = y * stride;
  bitmap[row] = 0;
  for (let x = 0; x < previewWidth; x++) {
    bitmap[row + 1 + x * 4 + 3] = 255;
  }
}

for (const { x: pixelX, y: pixelY, red, green, blue, alpha } of sourcePixels) {
  for (let y = offsetY + pixelY * scale; y < offsetY + (pixelY + 1) * scale; y++) {
    for (let x = offsetX + pixelX * scale; x < offsetX + (pixelX + 1) * scale; x++) {
      const pixel = y * stride + 1 + x * 4;
      bitmap[pixel] = Math.round((red * alpha) / 255);
      bitmap[pixel + 1] = Math.round((green * alpha) / 255);
      bitmap[pixel + 2] = Math.round((blue * alpha) / 255);
    }
  }
}

const header = Buffer.alloc(13);
header.writeUInt32BE(previewWidth, 0);
header.writeUInt32BE(previewHeight, 4);
header[8] = 8;
header[9] = 6;

const png = Buffer.concat([
  Buffer.from("89504e470d0a1a0a", "hex"),
  pngChunk("IHDR", header),
  pngChunk("IDAT", deflateSync(bitmap, { level: 9 })),
  pngChunk("IEND", Buffer.alloc(0)),
]);

writeFileSync(`${projectRoot}public/images/site-preview.png`, png);
