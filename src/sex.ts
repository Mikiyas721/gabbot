export enum Sex {
    MALE,
    FEMALE,
    UNSPECIFIED

}

export default function mapSex(sexValue: number) {
    if (sexValue == 0) return Sex.MALE;
    else if (sexValue == 1) return Sex.FEMALE;
    else if (sexValue == 2) return Sex.UNSPECIFIED;
}