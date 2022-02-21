import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsRequiredProps {}

/**
 * Check if the string is not empty.
 */
export const isRequired = (
  props?: TReferenceProps<IStringProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.required(intl.formatErrorMessage({ id: message ?? 'e.field.is_required' }))
    }

    return schema
  }
}
