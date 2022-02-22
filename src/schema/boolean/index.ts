import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TBooleanValidatorResult } from './_types'

export const schema = (
  intl: IIntlShape,
  ...validators: TBooleanValidatorResult[]
): yup.BooleanSchema => {
  let value = new yup.BooleanSchema()

  for (const validator of validators) {
    value = validator(value, intl)
  }

  value.typeError(intl.formatErrorMessage({ id: 'e.form.b_type_error' }))

  return value
}

export * from './_types'

export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'
