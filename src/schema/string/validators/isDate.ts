import _isDate from 'validator/lib/isDate'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isDate>

export interface IIsDateProps {
  /**
   * Options is an object which can contain the keys `format`, `strictMode` and/or `delimiters`

     `format` is a string and defaults to `YYYY/MM/DD`.

     `strictMode` is a boolean and defaults to `false`. If `strictMode` is set to `true`, the validator will reject inputs different from format.

     `delimiters` is an array of allowed date delimiters and defaults to `['/', '-']`.
   */
  options?: TParameters[1]
}

/**
 * Check if the string is a valid date.
 */
export const isDate = (
  props?: TReferenceProps<IIsDateProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { options } = parseReference<IIsDateProps>(this, props)

          const result = _isDate(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_date' },
                  {
                    ...options,
                    delimiters: options?.delimiters
                      ? intl.formatList(options.delimiters)
                      : undefined,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
