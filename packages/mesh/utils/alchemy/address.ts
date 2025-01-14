export function isHexAddress(
  address: string | null | undefined
): address is `0x${string}` {
  if (!address) return false
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
