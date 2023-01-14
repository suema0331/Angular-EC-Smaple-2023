import { Injectable } from '@angular/core';
import { LogService } from 'src/shared/services/log.service';


interface StandardValidation {
  message: string;
  isError: boolean;
}

interface ValidationForPassword {
  messageEmpty: string;
  messageLength: string;
  messageValid: string;
  messageExclusion: string;
  messageMail: string;
  isError: boolean;
}


interface StandardCheckedValidation {
  message: string;
  isChecked: boolean;
  isError: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  // Rule:
  ratz = /[a-z]/;
  rAtZ = /[A-Z]/;
  r0t9 = /[0-9]/;
  rSymbols = /[!@#%^&*/_?$¥`˜()+={}\[\]\\|;"'<>,.-]/;
  rSymbolsExclusion = /[^a-zA-Z0-9!@#%^&*/_?$¥`˜()+={}\[\]\\|;"'<>,.-]/;
  // rFullWidthKana = /^[ァ-ヶー　]+$/;

  constructor(private logService: LogService) { }

    // validation mail
  validateMailError(email: string): StandardValidation {
    if (!email || email.length === 0) {
      return {
        message: 'Please enter your email address.',
        isError: true
      };
    } else if (email.indexOf('@') < 0) {
      return {
        message: 'Incorrect email address.',
        isError: true
      };
    } else if (email.length > 50) {
      return {
        message: 'Please enter up to 50 characters.',
        isError: true
      };
    } else {
      return {
        message: '',
        isError: false,
      };
    }
  }

    // validation password
  validatePasswordError(password: string, mail: string): ValidationForPassword {

    const validationForPassword: ValidationForPassword = {
      messageEmpty: '',
      messageValid: '',
      messageLength: '',
      messageExclusion: '',
      messageMail: '',
      isError: false,
    };

    if (!password || password.length === 0) {
      validationForPassword.messageEmpty = 'Please enter a password.';
      validationForPassword.isError = true;
      return validationForPassword;
    }

    // length check
    if (password.length < 10) {
      validationForPassword.messageLength = 'Please enter more than 10 characters.';
      validationForPassword.isError = true;
    }
    if (password.length > 20) {
      validationForPassword.messageLength = 'Please enter up to 20 characters.';
      validationForPassword.isError = true;
    }
    // password rule check
    const isValidPasswordError = this.isValidPassword(password);
    if (isValidPasswordError.length > 0) {
      const errorMsg = this.createPasswordValidErrorMessage(isValidPasswordError);
      validationForPassword.messageValid = errorMsg;
      validationForPassword.isError = true;
    }
    const isExclusionPasswordError = this.isExclusionPassword(password);
    if (isExclusionPasswordError){
      validationForPassword.messageExclusion = isExclusionPasswordError;
      validationForPassword.isError = true;
    }
    // Check if it contains the same or part of your email address
    if (this.isValidPasswordAndMail(password, mail).isError) {
      validationForPassword.messageMail = this.isValidPasswordAndMail(password, mail).message;
      validationForPassword.isError = true;
    }

    return validationForPassword;
  }

  // validation mail for login
  validateMailErrorOnLogin(email: string): StandardValidation {
    if (!email || email.length === 0) {
      return {
        message: 'Please enter a email address.',
        isError: true
      };
    } else if (email.length > 50) {
      return {
        message: 'Please enter up to 50 characters.',
        isError: true
      };
    } else {
      return {
        message: '',
        isError: false,
      };
    }
  }

  // validation password for login
  validatePasswordErrorOnLogin(password: string): StandardValidation {
    if (!password || password.length === 0) {
      return {
        message: 'Please enter a password.',
        isError: true,
      };
    }
      // length check
    else if (password.length > 20) {
        return {
          message: 'Please enter up to 20 characters.',
          isError: true,
        };
    } else {
      return {
        message: '',
        isError: false,
      };
    }
  }

    // validation confirm password
  validateConfirmPassword(password: string, confirmPassword: string): StandardValidation {
    if ( !confirmPassword || confirmPassword.length === 0) {
      return {
        message: 'Please enter a password.',
        isError: true,
      };
    }
    // password match check
    else if (password !== confirmPassword){
      return {
        message: 'Password does not match.',
        isError: true,
      };
    } else {
      return {
        message: '',
        isError: false,
      };
    }
  }

    // password rule
  isValidPassword(str: string): string[] {
    const errorMsgs = [];
    if (!this.rAtZ.test(str)) {
      errorMsgs.push('Upper case');
    }
    if (!this.ratz.test(str)) {
      errorMsgs.push('Lower case');
    }
    if (!this.r0t9.test(str)){
      errorMsgs.push('Number');
    }
    if (!this.rSymbols.test(str)){
      errorMsgs.push('Symbol in the list');
    }
    return errorMsgs;
  }

  // password rule 2
  isExclusionPassword(str: string): string {
    if (this.rSymbolsExclusion.test(str)){
      return 'Unavailable characters are included, Please delete them.';
    }
    return '';
  }

  // password Error Message
  createPasswordValidErrorMessage(errorMsgs: string[]): string {
    let tmpMsg = '';
    errorMsgs.forEach( e => {
      tmpMsg += e + '/';
    });
    tmpMsg = tmpMsg.slice(0, -1) ;
    return 'Please include: ' + tmpMsg;
  }

  // check password and mail
  isValidPasswordAndMail(password: string, mail: string): StandardValidation {
    const mailString = mail.match(/(.+)@(.+)\./);
    this.logService.logDebug(`${mailString}`);
    if (password === mail){
      this.logService.logDebug(`${password} ${mail}`);
      return {
        message: 'Please set a different one than your e-mail address.',
        isError: true,
      };
    } else if ( mailString && mailString.length >= 3 ) {
      const matched = mailString.filter((m) => {
        return (password.indexOf(m) !== -1) ;
      });
      this.logService.logDebug(`matched ${matched}`);
      if (matched && matched.length > 0) {
        return {
          message: 'Cannot contain part of an email address.',
          isError: true,
        };
      }
    }
    return {
      message: '',
      isError: false,
    };
  }

  // validation checkAgreement
  validateAgreementError(event: any): StandardCheckedValidation {
    if (!event.target.checked) {
      return {
        message: '*Your consent is required. Please check the box.',
        isChecked: event.target.checked,
        isError: true,
      };
    } else {
      return {
        message: '',
        isChecked: event.target.checked,
        isError: false,
      };
    }
  }


}
