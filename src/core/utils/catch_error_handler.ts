export interface OptionsHandlingPossibilityError {
    callback: Function,
    errorMessage: string,
    successMessage?: string,
    trys?: number,
}

export interface HandlingExit {
    exitCode?: number,
    success?: boolean,
    successMessage?: string,
    customErrorMessage?: string,
    deepErrorMessage?: string,
    data?: any
    
}

export function handlingPossibilityError(options: OptionsHandlingPossibilityError): HandlingExit {
    let handlignExit: HandlingExit = {}
    try {

        const data = options.callback();
        handlignExit.success = true;
        handlignExit.successMessage = options.successMessage;
        handlignExit.data = data;

    } catch (err) {
        handlignExit.success = false;
        handlignExit.customErrorMessage = options.errorMessage;
        handlignExit.deepErrorMessage = (err as Error).message;

        if (options.trys != undefined && (options.trys - 1) >= 0) {
            console.log('Failder counter = ' + options.trys);
            options.trys--;
            return handlingPossibilityError(options);
        }
    }
    return handlignExit;
}

export async function handlingPossibilityErrorAsync(options: OptionsHandlingPossibilityError): Promise<HandlingExit> {

    let handlignExit: HandlingExit = {}
    try {

        const data = await options.callback();
        handlignExit.success = true;
        handlignExit.successMessage = options.successMessage;
        handlignExit.data = data;

    } catch (err) {
        handlignExit.success = false;
        handlignExit.customErrorMessage = options.errorMessage;
        handlignExit.deepErrorMessage = (err as Error).message;

        if (options.trys != undefined && (options.trys - 1) >= 0) {
            console.log('Failder counter = ' + options.trys);
            options.trys--;
            return handlingPossibilityErrorAsync(options);
        }
    }
    return handlignExit;
}
