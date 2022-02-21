import _isPostalCode from 'validator/lib/isPostalCode'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isPostalCode>

export interface IIsPostalCodeProps {
  locale: TParameters[1]
}

/**
 * Check if the string is a postal code.
 */
export const isPostalCode = (
  props: TReferenceProps<IIsPostalCodeProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { locale } = parseReference<IIsPostalCodeProps>(this, props)

          const result = _isPostalCode(value, locale)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_a_postal_code' },
                  { locale }
                ),
              })
        },
      })
    }

    return schema
  }
}
