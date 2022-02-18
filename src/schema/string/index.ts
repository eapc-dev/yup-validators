import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TStringValidatorResult } from './_types'

export const STRING_SCHEMA = (
  intl: IIntlShape,
  ...validators: TStringValidatorResult[]
): yup.StringSchema => {
  let schema = new yup.StringSchema()

  for (const validator of validators) {
    schema = validator(schema, intl)
  }

  return schema
}
