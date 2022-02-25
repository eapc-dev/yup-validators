import _isAscii from 'validator/lib/isAscii'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsAsciiProps {}

/**
 * Check if the string contains ASCII chars only.
 */
export const isAscii = (
  props?: TReferenceProps<IIsAsciiProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isAscii(value)
        },
        message: intl.formatErrorMessage({ id: message ?? 'e.y_v.s_must_be_ascii' }),
      })
    }

    return schema
  }
}
