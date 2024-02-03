
export const SuccessResponse = (message: string, data?: any) => {
    return {
      status: true,
      message,
      data,
    };
  };
  
  export const ErrorResponse = (message: string, errors?: any[]) => {
    return {
      success: false,
      message,
      errors,
    };
  };
  