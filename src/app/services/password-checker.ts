export enum Strength {
    none,
    weak,
    medium,
    strong,
};

const rules: { [key: string]: { exp: RegExp, value: number } } = {
    strong: {
        exp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        value: 3,
    },
    medium: {
        exp: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        value: 2,
    },
    weak: {
        exp: /(?=.{8,})/,
        value: 1,
    },
    none: {
        exp: /^/,
        value: 0
    }
};

/**
 * Get the strenght of a password by finding the first rule that passes.
 * @param password 
 */
const getStrength = (password: string) => {
    return rules[(Object.keys(rules).find(key => rules[key].exp.test(password))) || 'none'];
}

/**
 * Check if a password is atleast a certain rule.
 * @param password 
 * @param strenght 
 */
export const checkPasswordStrength = (password: string, strenght: Strength = Strength.strong) => {
    return getStrength(password).value >= strenght;
}