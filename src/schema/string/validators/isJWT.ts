import _isJWT from 'validator/lib/isJWT'

import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsJWTProps {}

/**
 * Check if the string is valid JWT token.
 */
export const isJWT = (
  props?: TReferenceProps<IIsJWTProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          return _isJWT(value)
        },
        message: intl.formatErrorMessage({
          id: message ?? 'e.y_v.s_must_be_a_jwt',
        }),
      })
    }

    return schema
  }
}
