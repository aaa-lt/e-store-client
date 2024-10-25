import { useAuthStore } from '@/stores/auth'
import type { ImageSizes } from '@/types/Product'

export const getFullURI = (imgURI: string) => {
  const authStore = useAuthStore()

  const parsedURI = new URL(imgURI)

  if (parsedURI.hostname.includes('blob.core.windows.net')) {
    return `${imgURI}?${authStore.user.sasToken}`
  }

  return imgURI
}

export function getImageUrlByQuality(fullUrl: string, quality: ImageSizes) {
  const authStore = useAuthStore()

  const replacedUrl = fullUrl.replace(/\/(full|middle|low|potato)\//, `/${quality}/`)
  return `${replacedUrl}?${authStore.user.sasToken}`
}
