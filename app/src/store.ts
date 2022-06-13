import { atom, selector, selectorFamily } from 'recoil'
import { Components } from './server';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const categoriesState = atom<Components.Schemas.Category[]>({
  key: "categories",
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const subcategoriesState = atom<Components.Schemas.Subcategory[]>({
  key: "subcategories",
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const tasksState = atom<Components.Schemas.Task[]>({
  key: "tasks",
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const assessmentTypesState = atom<Components.Schemas.AssessmentType[]>({
  key: "assessmentTypes",
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const schoolState = atom<Components.Schemas.School[]>({
  key: 'school',
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const usersState = atom<Components.Schemas.User[]>({
  key: 'users',
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const classesState = atom<Components.Schemas.Classroom[]>({
  key: 'classes',
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const childrenState = atom<Components.Schemas.Child[]>({
  key: 'children',
  effects_UNSTABLE: [persistAtom],
  default: [],
})

export const assessmentsState = atom<Components.Schemas.Assessment[]>({
  key: 'assessments',
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const allClassNotesState = atom<Components.Schemas.ClassroomNote[]>({
  key: 'allClassNotes',
  effects_UNSTABLE: [persistAtom],
  default: [],
});

export const allChildNotesState = atom<Components.Schemas.ChildNote[]>({
  key: 'allChildNotes',
  effects_UNSTABLE: [persistAtom],
  default: [],
});


export const dataReadyState = selector({
  key: 'dataReady',
  get: ({ get }) => [
    get(categoriesState),
    get(subcategoriesState),
    get(tasksState),
    get(assessmentTypesState),
    get(schoolState),
    get(usersState),
  ].every(x => x.length > 0),
});



export const categoryState = selectorFamily({
  key: 'category',
  get: (id: number) => ({ get }) => get(categoriesState).find(x => x.id === id),
});

export const categorySubcategoriesState = selectorFamily({
  key: 'categorySubcategories',
  get: (id: number) => ({ get }) => {
    const cat = get(categoryState(id));
    return get(subcategoriesState).filter(x => cat?.subcategories.includes(x.id!));
  }
});

export const categoryTasksState = selectorFamily({
  key: 'categoryTasks',
  get: (id: number) => ({ get }) => {
    const subs = get(categorySubcategoriesState(id));
    return subs.map(x => ({ ...x, data: get(subcategoryTasksState(x.id!)) }));
  }
});


export const subcategoryState = selectorFamily({
  key: 'subcategory',
  get: (id: number) => ({ get }) => get(subcategoriesState).find(x => x.id === id),
});

export const subcategoryTasksState = selectorFamily({
  key: 'subcategoryTasks',
  get: (id: number) => ({ get }) => get(tasksState).filter(x => x.subcategory === id),
});


export const taskState = selectorFamily({
  key: 'task',
  get: (id: number) => ({ get }) => get(tasksState).find(x => x.id === id),
});


export const assessmentTypeState = selectorFamily({
  key: 'assessmentType',
  get: (id: number) => ({ get }) => get(assessmentTypesState).find(x => x.id === id),
});


export const childState = selectorFamily({
  key: 'child',
  get: (id: number) => ({ get }) => get(childrenState).find(x => x.id === id),
});

export const childAssessmentsState = selectorFamily({
  key: 'childAssessments',
  get: (id: number) => ({ get }) => get(assessmentsState).filter(x => x.child === id)
});

export const childNotesState = selectorFamily({
  key: 'childNotes',
  get: (id: number) => ({ get }) => get(allChildNotesState).filter(x => x.child === id)
});


export const classState = selectorFamily({
  key: 'class',
  get: (id: number) => ({ get }) => get(classesState).find(x => x.id === id),
});

export const classByChildState = selectorFamily({
  key: 'classByChild',
  get: (id: number) => ({ get }) => get(classesState).find(x => x.children.includes(id)),
});

export const classChildrenState = selectorFamily({
  key: 'classChildren',
  get: (id: number) => ({ get }) => {
    const classroom = get(classState(id));
    return get(childrenState).filter(x => classroom?.children.includes(x.id!))
  },
});

export const classAssessmentsState = selectorFamily({
  key: 'classAssessments',
  get: (id: number) => ({ get }) => {
    const classroom = get(classState(id));
    return get(assessmentsState).filter(x => classroom?.children.includes(x.child))
  },
});

export const classNotesState = selectorFamily({
  key: 'classNotes',
  get: (id: number) => ({ get }) => get(allClassNotesState).filter(x => x.classroom === id)
});

