import _isInt from 'validator/lib/isInt'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isInt>

export interface IIsIntProps {
  options?: TParameters[1]
}

/**
 * Check if the string is an integer.
 */
export const isInt = (
  props?: TReferenceProps<IIsIntProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsIntProps>(this, props)

          const result = _isInt(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_an_int' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
