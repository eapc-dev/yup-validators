import _isISBN from 'validator/lib/isISBN'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isISBN>

export interface IIsISBNProps {
  /**
   * ISBN Version
   */
  version?: TParameters[1]
}

/**
 * Check if the string is an ISBN (version 10 or 13).
 */
export const isISBN = (
  props?: TReferenceProps<IIsISBNProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { version } = parseReference<IIsISBNProps>(this, props)

          const result = _isISBN(value, version)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_an_isbn' },
                  { version }
                ),
              })
        },
      })
    }

    return schema
  }
}
