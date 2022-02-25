import { TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IIsTrueProps {}

/**
 * Check if the `boolean` is `true`.
 */
export const isTrue = (
  props?: TReferenceProps<IIsTrueProps> & IBooleanProps
): TBooleanValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.isTrue(intl.formatErrorMessage({ id: message ?? 'e.y_v.b_is_true' }))
    }

    return schema
  }
}
