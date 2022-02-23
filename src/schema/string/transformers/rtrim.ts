import _rtrim from 'validator/lib/rtrim'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _rtrim>

export interface IRtrimProps {
  /**
   * Characters to be used for the trim.
   * @default whitespace
   */
  chars?: TParameters[1]
}

/**
 * Trim characters from the right-side of the input.
 */
export const rtrim = (
  props?: IRtrimProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { chars, active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _rtrim(v, chars) : v))
    }

    return schema
  }
}
