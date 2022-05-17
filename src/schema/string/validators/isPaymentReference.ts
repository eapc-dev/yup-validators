import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsPaymentReferenceProps {
  /**
   * Will only apply is the string starts with match `+++XXX/XXXX/XXXXX+++`
   */
  optional?: boolean
}

const REGEX = /^\+{3}\d{3}\/\d{4}\/\d{5}\+{3}$/

/**
 * Check if the string is a valid payment reference.
 */
export const isPaymentReference = (
  props?: TReferenceProps<IIsPaymentReferenceProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'string') return true

          const { optional = false } = parseReference<IIsPaymentReferenceProps>(this, props)

          let result = true

          const formatValid = REGEX.test(value)

          if (formatValid) {
            const strippedValue = value.replace(/\+/g, '').replace(/\//g, '')
            const rest = Number(strippedValue.slice(0, 10)) % 97
            const remaining = Number(strippedValue.slice(10, 12))

            result = rest === 0 ? remaining === 97 : rest === remaining
          } else {
            result = optional
          }

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.y_v.s_must_be_a_valid_payment_reference' },
                  { optional }
                ),
              })
        },
      })
    }

    return schema
  }
}
