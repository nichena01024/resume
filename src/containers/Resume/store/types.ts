import {ISkillItem} from '../../../dataTypes/ISkillItem'
import {IPersonalInformation} from '../../../dataTypes/IPersonalInformation'
import {IEducationItem} from '../../../dataTypes/IEducationItem'
import {IExperienceItem} from '../../../dataTypes/IExperienceItem'
import {IProjectItem} from '../../../dataTypes/IProjectItem'
import {IResume} from '../../../dataTypes/IResume'

export interface ResumeState extends IResume{
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
