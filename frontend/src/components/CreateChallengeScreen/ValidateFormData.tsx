interface FormData {
  creatorName: string;
  challengeName: string;
  description: string;
  challengeWords: Array<string>;
}

interface validationReturn {
  data: FormData;
  flag: boolean;
}

export const validateFormData = (
  errorMessages: FormData,
  formData: FormData,
  wordSet: Set<string>
): FormData => {
  let updatedErrorData: FormData = errorMessages;
  let flag: boolean = true;

  // validate creator name

  // validate challenge name

  // validate description

  // validate challengeWords

  return updatedErrorData;
};
