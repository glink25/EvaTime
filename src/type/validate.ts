export type Valid = true;
export type Invalid = {
  valid: false;
  reason: string;
};
export type ValidateResult = Valid | Invalid;

export const isValid = (result: ValidateResult) => result === true;

type Validator<T extends any[] = any[]> = (...args: T) => ValidateResult;

export const chain = <T extends any[]>(
  ...validators: Validator[]
): Validator<T> => {
  return (...args: T) => {
    for (let i = 0; i < validators.length; i += 1) {
      const result = validators[i](...(args as any));
      if (!isValid(result)) {
        return result;
      }
    }
    return true;
  };
};
