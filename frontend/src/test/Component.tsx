// Trap 1: Bad casing (snake_case in TS)
export const get_user_data = () => { return { name: "Gemini" } };

// Trap 2: Zombie Code (Exported but will not be used anywhere)
export function ghostFunction() {
    console.log("I am never called.");
}

// Trap 3: Semantic naming error
const status = true; // Should be 'isActive' or 'isOnline'