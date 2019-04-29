export interface IResumeSectionProps<T> {
    data: T,
    submitChange: (newRecord: T) => void
    isEditable?: boolean
}
