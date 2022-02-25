import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsRequiredProps {}

/**
 * Check if the `string` is defined. Will also reject `''`.
 */
export const isRequired = (
  props?: TReferenceProps<IIsRequiredProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.required(intl.formatErrorMessage({ id: message ?? 'e.y_v.is_required' }))
    }

    return schema
  }
}
