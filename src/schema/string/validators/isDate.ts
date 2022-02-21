import _isDate from 'validator/lib/isDate'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isDate>

export interface IIsDateProps {
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
          if (!value) return true

          const { options } = parseReference<IIsDateProps>(this, props)

          const result = _isDate(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_date' },
                  {
                    ...options,
                    delimiters: options?.delimiters?.join(
                      intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
                    ),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
