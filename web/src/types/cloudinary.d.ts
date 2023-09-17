export interface OpenMediaLibraryOptions {
  cloud_name: string
  api_key: string
  username: string
}

export interface OpenMediaLibraryCallback {
  insertHandler: (data: { assets: { url: string }[] }) => void
}

export type MediaLibraryResponse = unknown

export type OpenMediaLibrary = (
  options: OpenMediaLibraryOptions,
  callback: OpenMediaLibraryCallback,
  targetElement: HTMLElement
) => Promise<MediaLibraryResponse>

export interface CreateUploadWidgetOptions {
  cloudName: string
  uploadPreset: string
  multiple: boolean
  folder: string
}

export type CreateUploadWidgetCallback = (
  error: Error | null,
  result: { event: string; info: { url: string } }
) => void

export type CreateUploadWidgetResponse = {
  open: () => void
  close: () => void
  destroy: () => void
}

export interface ICloudinary {
  openMediaLibrary: OpenMediaLibrary
  createUploadWidget: (
    options: CreateUploadWidgetOptions,
    callback: CreateUploadWidgetCallback
  ) => CreateUploadWidgetResponse
}
