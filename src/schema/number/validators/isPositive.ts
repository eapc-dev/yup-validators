import { TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsPositiveProps {}

/**
 * Check if the `number` is positive.
 */
export const isPositive = (
  props?: TReferenceProps<IIsPositiveProps> & INumberProps
): TNumberValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.positive(
        intl.formatErrorMessage({ id: message ?? 'e.y_v.n_must_be_positive' })
      )
    }

    return schema
  }
}
