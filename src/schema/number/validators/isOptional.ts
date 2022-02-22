import { TReferenceProps } from '../../..'
import { INumberProps, TNumberValidatorResult } from '../_types'

export interface IIsOptionalProps {}

/**
 * Allow a `number` to be `undefined`.
 */
export const isOptional = (
  props?: TReferenceProps<IIsOptionalProps> & Omit<INumberProps, 'message'>
): TNumberValidatorResult => {
  const { active = true } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.optional()
    }

    return schema
  }
}
