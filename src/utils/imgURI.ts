import type { ImageSizes } from '@/types/Product'

export function getImageUrlByQuality(fullUrl: string, quality: ImageSizes) {
  const replacedUrl = fullUrl.replace(/\/(full|middle|low|potato)\//, `/${quality}/`)

  return replacedUrl
}
