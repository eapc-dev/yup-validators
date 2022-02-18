import { IStringProps, TStringValidatorResult } from '../_types'

export interface IIsStringRequiredProps extends IStringProps {}

export const isStringRequired = (props?: IStringProps): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.required(intl.formatErrorMessage({ id: message ?? 'e.field.is_required' }))
    }

    return schema
  }
}
