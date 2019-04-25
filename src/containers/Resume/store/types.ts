import {SkillItem} from '../../../dataTypes/SkillItem'
import {PersonalInformation} from '../../../dataTypes/PersonalInformation'
import {EducationItem} from '../../../dataTypes/EducationItem'
import {ExperienceItem} from '../../../dataTypes/ExperienceItem'
import {ProjectItem} from '../../../dataTypes/ProjectItem'

export interface ResumeState {
    personalInformation: Partial<PersonalInformation>,
    educations: EducationItem[],
    skills: SkillItem[],
    experiences: ExperienceItem[],
    projects: ProjectItem[],
    isEditable?: boolean
}



export const UPDATE_RESUME_DATA = 'UPDATE_RESUME_DATA'
export const SET_RESUME_DATA = 'SET_RESUME_DATA'
export const DELETE_RESUME_SECTION = 'DELETE_RESUME_SECTION'
export const ADD_RESUME_SECTION = 'ADD_RESUME_SECTION'
export const CHANGE_EDITABLE_STATUS = 'CHANGE_EDITABLE_STATUS'

interface UpdateResumeData {
    type: typeof UPDATE_RESUME_DATA,
    newResume: ResumeState
}

interface SetResumeData <T extends ResumeState = ResumeState, K extends keyof T = keyof T>{
    type: typeof SET_RESUME_DATA,
    section: K,
    newData: T[K]
}

interface DeleteResumeSection {
    type: typeof DELETE_RESUME_SECTION,
    section: keyof ResumeState
}

interface AddResumeSection {
    type: typeof ADD_RESUME_SECTION,
    section: keyof ResumeState
}

interface ChangeEditableStatus {
    type: typeof CHANGE_EDITABLE_STATUS,
    status: boolean

}
export type ResumeActionTypes =
    UpdateResumeData |
    SetResumeData |
    DeleteResumeSection |
    AddResumeSection |
    ChangeEditableStatus
