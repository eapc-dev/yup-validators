import _isStrongPassword from 'validator/lib/isStrongPassword'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isStrongPassword>

export interface IIsStrongPasswordProps {
  options?: TParameters[1]
}

/**
 * Check if string is considered a strong password.
 */
export const isStrongPassword = (
  props?: TReferenceProps<IIsStrongPasswordProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsStrongPasswordProps>(this, props)

          const result = _isStrongPassword(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_strong_password' },
                  {
                    ...options,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
