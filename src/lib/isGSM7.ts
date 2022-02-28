import {GSM_7BIT_ABC} from './chars'

export const isGSM7 = (character: string): boolean => GSM_7BIT_ABC.includes(character)