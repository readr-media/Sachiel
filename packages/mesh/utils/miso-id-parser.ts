/**
 * Miso Product ID Parsing Utility
 *
 * Provides unified and safe ID extraction logic to avoid hardcoding prefixes in multiple places.
 */

// Miso product ID prefix constants
export const MISO_PRODUCT_PREFIXES = {
  STORY: 'mesh_story_',
  COLLECTION: 'mesh_profile_collection_',
  MEMBER: 'mesh_profile_member_',
  PUBLISHER: 'mesh_publisher_',
  PUBLISHER_PROFILE: 'mesh_profile_publisher_',
} as const

// Product type definition
export type MisoProductType = keyof typeof MISO_PRODUCT_PREFIXES

/**
 * Extracts the actual ID from a Miso product ID
 * @param productId - Miso product ID (e.g., "mesh_story_12345")
 * @param productType - Product type
 * @returns The extracted ID, or null if the format is incorrect
 */
export function extractIdFromProductId(
  productId: string,
  productType: MisoProductType
): string | null {
  if (!productId || typeof productId !== 'string') {
    return null
  }

  const prefix = MISO_PRODUCT_PREFIXES[productType]

  if (!productId.startsWith(prefix)) {
    console.warn(
      `Product ID "${productId}" does not start with expected prefix "${prefix}"`
    )
    return null
  }

  const extractedId = productId.slice(prefix.length)

  if (!extractedId) {
    console.warn(`No ID found after prefix in product ID "${productId}"`)
    return null
  }

  return extractedId
}

/**
 * Batch extract IDs
 * @param productIds - Array of product IDs
 * @param productType - Product type
 * @returns Array of successfully extracted IDs (filters out invalid IDs)
 */
export function extractIdsFromProductIds(
  productIds: string[],
  productType: MisoProductType
): string[] {
  return productIds
    .map((id) => extractIdFromProductId(id, productType))
    .filter((id): id is string => id !== null)
}

/**
 * Checks if a product ID matches the format for the specified type
 * @param productId - Product ID
 * @param productType - Product type
 * @returns Whether the format is valid
 */
export function isValidProductId(
  productId: string,
  productType: MisoProductType
): boolean {
  return extractIdFromProductId(productId, productType) !== null
}

/**
 * Filters an array of products by the specified type
 * @param products - Array of objects containing product_id
 * @param productType - Product type to filter by
 * @returns Filtered array of products
 */
export function filterProductsByType<T extends { product_id: string }>(
  products: T[],
  productType: MisoProductType
): T[] {
  const prefix = MISO_PRODUCT_PREFIXES[productType]
  return products.filter((product) => product.product_id.startsWith(prefix))
}

/**
 * Product ID validation error type
 */
export class ProductIdValidationError extends Error {
  constructor(productId: string, expectedType: MisoProductType) {
    super(
      `Invalid product ID: "${productId}" does not match expected type "${expectedType}"`
    )
    this.name = 'ProductIdValidationError'
  }
}
