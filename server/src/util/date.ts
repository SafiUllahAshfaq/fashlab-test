export const dateDiffInDays = (from: Date, to: Date) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
    const utc2 = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());

    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};