import _isRFC3339 from 'validator/lib/isRFC3339'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsRFC3339Props {}

/**
 * Check if the string is a valid [RFC 3339](https://tools.ietf.org/html/rfc3339) date.
 */
export const isRFC3339 = (
  props?: TReferenceProps<IIsRFC3339Props> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isRFC3339(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_rfc3339_date',
        }),
      })
    }

    return schema
  }
}
