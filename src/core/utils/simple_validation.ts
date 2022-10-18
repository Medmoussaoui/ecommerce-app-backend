
export interface FormOptions {
    value: { [key: string]: string | undefined },
    max: number,
    min: number,
    required?: boolean,
}

export function simpleValidation(form: FormOptions): string | boolean {
    form.required = form.required ?? true;

    const key = Object.keys(form.value)[0];
    const value = form.value[key];

    if (value == undefined && !form.required) return true;
    if (value == undefined && form.required) return "the " + key + " is required";

    if (value!.length > form.max) return key + " should be less then " + form.max;
    if (value!.length < form.min) return key + " should be more then " + form.min;

    return true;
}