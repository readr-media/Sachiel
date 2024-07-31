import { Organization } from '../types'

const sourceCustomIdToOrganization: Record<string, Organization> = {
  鏡週刊: 'mirror-media',
  readr: 'readr-media',
}

// TODO: this convertion is for Mesh only, replace it to suit the project
export function getOrganizationFromSourceCustomId(sourceCustomId: string) {
  return sourceCustomIdToOrganization[sourceCustomId]
}
