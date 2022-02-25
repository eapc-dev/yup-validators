import _isNumeric from 'validator/lib/isNumeric'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isNumeric>

export interface IIsNumericProps {
  options?: TParameters[1]
}

/**
 * Check if the string contains only numbers.
 */
export const isNumeric = (
  props?: TReferenceProps<IIsNumericProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsNumericProps>(this, props)

          const result = _isNumeric(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_numeric' },
                  { ...options }
                ),
              })
        },
      })
    }

    return schema
  }
}
