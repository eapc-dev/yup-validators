import _isBase32 from 'validator/lib/isBase32'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsBase32Props {}

/**
 * Check if a string is base32 encoded.
 */
export const isBase32 = (
  props?: TReferenceProps<IIsBase32Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isBase32(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.y_v.s_must_be_base32' }),
      })
    }

    return schema
  }
}
