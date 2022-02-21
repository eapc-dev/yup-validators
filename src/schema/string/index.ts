import * as yup from 'yup'

import { IIntlShape } from '../../i18n/placeholder'

import { TStringValidatorResult } from './_types'

export const schema = (
  intl: IIntlShape,
  ...validators: TStringValidatorResult[]
): yup.StringSchema => {
  let value = new yup.StringSchema()

  for (const validator of validators) {
    value = validator(value, intl)
  }

  return value
}

export * from './_types'

export * from './validators/containsFullWidthChars'
export * from './validators/containsHalfWidthChars'
export * from './validators/containsMultibyteChars'
export * from './validators/containsSurrogatePairChars'
// export * from './validators/doesMatches'
// export * from './validators/doesNotMatches'
// export * from './validators/doesEquals'
// export * from './validators/doesNotEquals'
export * from './validators/isAlpha'
export * from './validators/isAlphanumeric'
export * from './validators/isAscii'
export * from './validators/isBase32'
export * from './validators/isBase58'
export * from './validators/isBase64'
export * from './validators/isBIC'
export * from './validators/isBoolean'
export * from './validators/isBtcAddress'
export * from './validators/isByteLength'
export * from './validators/isCreditCard'
export * from './validators/isCurrency'
export * from './validators/isDataURI'
export * from './validators/isDate'
export * from './validators/isDecimal'
export * from './validators/isDivisibleBy'
export * from './validators/isEAN'
export * from './validators/isEmail'
export * from './validators/isEmpty'
export * from './validators/isEthereumAddress'
export * from './validators/isFloat'
export * from './validators/isFQDN'
export * from './validators/isHash'
export * from './validators/isHexadecimal'
export * from './validators/isHexColor'
export * from './validators/isHSL'
export * from './validators/isIBAN'
export * from './validators/isIdentityCard'
export * from './validators/isInt'
export * from './validators/isIP'
export * from './validators/isIPRange'
export * from './validators/isISBN'
export * from './validators/isISIN'
export * from './validators/isISO8601'
export * from './validators/isISO31661Alpha2'
export * from './validators/isISO31661Alpha3'
export * from './validators/isISRC'
export * from './validators/isISSN'
export * from './validators/isJSON'
export * from './validators/isJWT'
export * from './validators/isLatLong'
// export * from './validators/isLength'
export * from './validators/isLocale'
export * from './validators/isLowercase'
export * from './validators/isMACAddress'
export * from './validators/isMagnetURI'
export * from './validators/isMD5'
export * from './validators/isMimeType'
export * from './validators/isMobilePhone'
export * from './validators/isMongoId'
export * from './validators/isNumeric'
export * from './validators/isOctal'
export * from './validators/isOptional'
export * from './validators/isPassportNumber'
export * from './validators/isPort'
export * from './validators/isPostalCode'
export * from './validators/isRequired'
export * from './validators/isRFC3339'
export * from './validators/isRgbColor'
export * from './validators/isSemVer'
export * from './validators/isUppercase'
export * from './validators/isSlug'
export * from './validators/isStrongPassword'
export * from './validators/isURL'
export * from './validators/isUUID'
export * from './validators/isVariableWidth'
export * from './validators/isVAT'
export * from './validators/isWhitelisted'
