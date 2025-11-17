import { v2 as cloudinary, type UploadApiResponse, type UploadApiErrorResponse } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

let configured = false
export function ensureConfigured() {
  if (configured) return true
  if (!cloudName || !apiKey || !apiSecret) return false
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })
  configured = true
  return true
}

export async function uploadImageFromFile(file: File, folder?: string): Promise<string> {
  if (!ensureConfigured()) throw new Error('Cloudinary env not configured')
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return new Promise((resolve, reject) => {
    const opts: Record<string, any> = {}
    if (folder) opts.folder = folder
    const stream = cloudinary.uploader.upload_stream(opts, (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
      if (err) return reject(err)
      if (!result?.secure_url) return reject(new Error('No secure_url'))
      resolve(result.secure_url)
    })
    stream.end(buffer)
  })
}
