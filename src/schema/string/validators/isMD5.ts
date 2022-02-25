import _isMD5 from 'validator/lib/isMD5'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsMD5Props {}

/**
 * Check if the string is a MD5 hash.
 */
export const isMD5 = (
  props?: TReferenceProps<IIsMD5Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isMD5(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_md5_hash',
        }),
      })
    }

    return schema
  }
}
