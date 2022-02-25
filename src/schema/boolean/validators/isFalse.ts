import { TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IIsFalseProps {}

/**
 * Check if the `boolean` is `false`.
 */
export const isFalse = (
  props?: TReferenceProps<IIsFalseProps> & IBooleanProps
): TBooleanValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.isFalse(intl.formatErrorMessage({ id: message ?? 'e.y_v.b_is_false' }))
    }

    return schema
  }
}
