import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TNumberValidatorResult } from './_types'

export const schema = (
  intl: IIntlShape,
  ...validators: TNumberValidatorResult[]
): yup.NumberSchema => {
  let value = new yup.NumberSchema()

  for (const validator of validators) {
    value = validator(value, intl)
  }

  value.typeError(intl.formatErrorMessage({ id: 'e.form.n_type_error' }))

  return value
}

export * from './_types'

export * from './validators/isNullable'
export * from './validators/isRequired'
export * from './validators/isOptional'
