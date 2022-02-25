import { TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IIsRequiredProps {}

/**
 * Check if the `boolean` is defined.
 */
export const isRequired = (
  props?: TReferenceProps<IIsRequiredProps> & IBooleanProps
): TBooleanValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.required(intl.formatErrorMessage({ id: message ?? 'e.y_v.is_required' }))
    }

    return schema
  }
}
