import { TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsNegativeProps {}

/**
 * Check if the `number` is negative.
 */
export const isNegative = (
  props?: TReferenceProps<IIsNegativeProps> & INumberProps
): TNumberValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.negative(
        intl.formatErrorMessage({ id: message ?? 'e.y_v.n_must_be_negative' })
      )
    }

    return schema
  }
}
