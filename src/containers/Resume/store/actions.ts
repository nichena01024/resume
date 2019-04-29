import {
    ResumeActionTypes,
    ResumeState,
    UPDATE_RESUME_DATA,
    SET_RESUME_DATA,
} from './types'
import {IResume} from '../../../dataTypes/IResume'
import {ActionCreator} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {AxiosInstance} from 'axios'

export function getResumeData(resumeData: ResumeState): ResumeActionTypes{
    return {
        type: UPDATE_RESUME_DATA,
        newResume: resumeData
    }
}

export const updateResumeData: ActionCreator<ThunkAction<
        any,
        ResumeState,
        AxiosInstance,
        ResumeActionTypes
    >> = () => (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('api/resume')
        .then((res) => {
            dispatch(getResumeData(res.data))
        })
}
export const setResumeData: ActionCreator<ThunkAction<
    any,
    ResumeState,
    AxiosInstance,
    ResumeActionTypes
    >> = (section: any, newData: any) => (dispatch, getState, axiosInstance) => {
    axiosInstance.put('api/resume', {
        section,
        data: newData
    })
}
// function setResumeData<T extends ResumeState, K extends keyof ResumeState>(section: keyof ResumeState, newData: ResumeState[K]): ResumeActionTypes {
//     console.log(section, newData)
//     return {
//         type: SET_RESUME_DATA,
//         section,
//         newData
//     }
// }
