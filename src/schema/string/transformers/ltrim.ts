import _ltrim from 'validator/lib/ltrim'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _ltrim>

export interface ILtrimProps {
  /**
   * Characters to be used for the trim.
   * @default whitespace
   */
  chars?: TParameters[1]
}

/**
 * Trim characters from the left-side of the input.
 */
export const ltrim = (
  props?: ILtrimProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { chars, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _ltrim(v, chars) : v))
    }

    return schema
  }
}
