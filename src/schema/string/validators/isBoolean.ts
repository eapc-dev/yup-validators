import _isBoolean from 'validator/lib/isBoolean'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isBoolean>

export interface IIsBooleanProps {
  options?: TParameters[1]
}

/**
 * Check if a string is a boolean.
 */
export const isBoolean = (
  props?: TReferenceProps<IIsBooleanProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsBooleanProps>(this, props)

          const result = _isBoolean(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_boolean' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
