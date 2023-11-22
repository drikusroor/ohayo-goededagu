import { promises as fsPromises } from 'fs'
import * as path from 'path'

// Path to the CSV file
const csvFilePath = 'data.csv'

// Helper function to ensure directory exists
const ensureDirExists = async (filePath: string) => {
  const dirname = path.dirname(filePath)
  await fsPromises.mkdir(dirname, { recursive: true })
}

// Function to download an image and save it to a subpath
const downloadImage = async (url: string) => {
  try {
    // strip the oustide quotes
    url = url.slice(1, -1)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${url}`)
    const buffer = await response.arrayBuffer()
    const subPath = url.split('https://res.cloudinary.com/')[1]
    const collectionFolder = 'images'
    const filePath = path.join(process.cwd(), collectionFolder, subPath)

    // skip if file already exists
    try {
      await fsPromises.access(filePath)
      console.log(`⏭️ File already exists, skipping download: ${subPath}`)
      return
    } catch (error) {
      // do nothing
      console.log(`🗃️ File does not exist, starting download: ${subPath}`)
    }

    await ensureDirExists(filePath)
    await fsPromises.writeFile(filePath, Buffer.from(buffer))

    console.log(`✅ Downloaded and saved: ${filePath}`)
  } catch (error) {
    console.error(`❌ Error downloading ${url}:`, error)
  }
}

// Function to read CSV and return a list of URLs
const readCsvAndGetUrls = async (filePath: string): Promise<string[]> => {
  const csvFileContent = await fsPromises.readFile(filePath, 'utf-8')
  return csvFileContent
    .trim()
    .split('\n')
    .map((line) => line.trim())
}

// Download all images from the URLs in the CSV file
const downloadImagesFromCsv = async () => {
  try {
    const urls = await readCsvAndGetUrls(csvFilePath)
    urls.forEach((url) => {
      if (url) downloadImage(url)
    })
  } catch (error) {
    console.error('Error processing CSV file:', error)
  }
}

downloadImagesFromCsv()
