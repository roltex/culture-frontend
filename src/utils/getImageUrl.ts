/**
 * Get the full URL for an image from the backend
 * @param path - The image path from the backend (can be relative, absolute, or full S3 URL)
 * @returns The full URL to the image
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '';
  
  // If it's already a full URL (S3, Cloudinary, etc.), return as is
  if (path.startsWith('http')) return path;
  
  // For local development, construct the full URL
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const backendBaseUrl = apiBaseUrl.replace('/api/v1', '');
  
  // If the path already starts with /storage/, use it as is
  // Otherwise, assume it's a relative path that needs /storage/ prefix
  const imagePath = path.startsWith('/storage/') ? path : `/storage/${path}`;
  
  // Combine backend URL with image path
  return `${backendBaseUrl}${imagePath}`;
} 