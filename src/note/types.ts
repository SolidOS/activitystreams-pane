export type Note = {
  content: string;
  published?: Date;
  attributedTo: Attribution;
}

export type Attribution = NoAttribution | LinkAttribution | PersonAttribution

export interface NoAttribution {
  discriminator: 'NoAttribution';
}

export interface LinkAttribution {
  discriminator: 'LinkAttribution';
  uri: string;
}

export function isLinkAttribution (
  attribution: Attribution
): attribution is LinkAttribution {
  return attribution.discriminator === 'LinkAttribution'
}

export interface PersonAttribution {
  discriminator: 'PersonAttribution';
  webId: string;
  name: string;
  imageSrc?: string;
}

export function isPersonAttribution (
  attribution: Attribution
): attribution is PersonAttribution {
  return attribution.discriminator === 'PersonAttribution'
}
