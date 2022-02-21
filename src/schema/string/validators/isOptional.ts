import { TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsOptionalProps {}

/**
 * Allow a string to be null.
 */
export const isOptional = (
  props?: TReferenceProps<IIsOptionalProps> & Omit<IStringProps, 'message'>
): TStringValidatorResult => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.optional()
    }

    return schema
  }
}
