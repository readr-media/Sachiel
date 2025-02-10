import { type Hex } from 'viem'

export function isHexAddress(
  address: string | null | undefined
): address is Hex {
  if (!address) return false
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
