import _trim from 'validator/lib/trim'

import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _trim>

export interface ITrimProps {
  /**
   * Characters to be used for the trim.
   * @default whitespace
   */
  chars?: TParameters[1]
}

/**
 * Trim characters from both sides of the input.
 */
export const trim = (
  props?: ITrimProps & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { chars, active = true } = props ?? {}

  return (schema) => {
    if (active) {
      schema = schema.transform((v: unknown) => (typeof v === 'string' ? _trim(v, chars) : v))
    }

    return schema
  }
}
