export const convertEnvToBoolean = (value: string) => {
    if (value) {
        value = value.trim();
        if (/^(?:y|yes|true|1|on)$/i.test(value)) {
            return true;
        }
    }
    return false;
};
