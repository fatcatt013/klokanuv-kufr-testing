import { Assessment, Category, Child, Class, Subcategory, Task } from "./types";
import { fetcher } from "./utils";
import { atom, AtomEffect, DefaultValue, selectorFamily } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistAtom: AtomEffect<any> = ({ node, setSelf, onSet }) => {
  setSelf(
    AsyncStorage.getItem(node.key).then((savedValue) =>
      savedValue != null ? JSON.parse(savedValue) : new DefaultValue(),
    ),
  )

  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      AsyncStorage.removeItem(node.key)
    } else {
      AsyncStorage.setItem(node.key, JSON.stringify(newValue))
    }
  })
};

export const authState = atom<{ signedIn: boolean }>({
  key: 'auth',
  effects_UNSTABLE: [persistAtom],
  default: { signedIn: false },
});

export const groupsState = atom<Class[]>({
  key: 'groups',
  effects_UNSTABLE: [persistAtom],
  default: [
    { id: 1, name: "Žabičky" },
    { id: 2, name: "Rybičky" },
  ],
});

export const childrenState = atom<Child[]>({
  key: 'children',
  effects_UNSTABLE: [persistAtom],
  default: [
    { id: 1, classId: 1, name: 'Jan', yearOfBirth: 2018 },
    { id: 2, classId: 1, name: 'Franta', yearOfBirth: 2018 },
    { id: 3, classId: 1, name: 'Monika', yearOfBirth: 2018 },
    { id: 4, classId: 1, name: 'Marie', yearOfBirth: 2018 },
    { id: 5, classId: 1, name: 'Honza', yearOfBirth: 2018 },
    { id: 6, classId: 2, name: 'Janka', yearOfBirth: 2018 },
    { id: 7, classId: 2, name: 'Petr', yearOfBirth: 2018 },
  ],
})

export const childState = selectorFamily({
  key: 'child',
  get: (childId) => ({ get }) => get(childrenState).find(x => x.id === childId),
});

export const groupState = selectorFamily({
  key: 'group',
  get: (classId) => ({ get }) => get(groupsState).find(x => x.id === classId),
});

export const childrenByChildState = selectorFamily({
  key: 'childrenByChild',
  get: (childId) => ({ get }) => {
    const child = get(childrenState).find(x => x.id === childId);
    return get(childrenState).filter(x => x.classId === child?.classId)
  },
});

export const childrenByGroupState = selectorFamily({
  key: 'groupChildren',
  get: (classId) => ({ get }) => get(childrenState).filter(x => x.classId === classId),
});

export const categoriesState = atom<Category[]>({
  key: "categories",
  effects_UNSTABLE: [persistAtom],
  default: (async () => {
    const response = await fetcher.get<Category[]>('/categories/')
    return response.data;
  })(),
});

export const categoryState = selectorFamily({
  key: 'category',
  get: (catId) => ({ get }) => get(categoriesState).find(x => x.id === catId),
});

export const subcategoryState = selectorFamily({
  key: 'subcategory',
  get: (subcatId) => ({ get }) => {
    let result: Subcategory | undefined;
    get(categoriesState).forEach(cat => {
      result = result || cat.subcategories.find(x => x.id === subcatId);
    })
    return result;
  },
});

export const taskState = selectorFamily({
  key: 'task',
  get: (taskId) => ({ get }) => {
    let result: Task | undefined;
    get(categoriesState).forEach(cat => {
      cat.subcategories.forEach(subcat => {
        result = result || subcat.tasks.find(x => x.id === taskId);
      })
    })
    return result;
  },
});

export const assessmentsState = atom<Assessment[]>({
  key: 'assessments',
  effects_UNSTABLE: [persistAtom],
  default: [
    { id: 1, childId: 1, task: 3, option: 1, date_of_assessment: "2022-05-03", note: '' },
    { id: 2, childId: 2, task: 3, option: 2, date_of_assessment: "2022-05-02", note: '' },
    { id: 3, childId: 1, task: 8, option: 3, date_of_assessment: "2022-05-01", note: '' },
  ],
});

export const childAssessmentState = selectorFamily({
  key: 'childAssessment',
  get: (childId) => ({ get }) => get(assessmentsState).filter(x => x.childId === childId)
});

export const classAssessmentState = selectorFamily({
  key: 'classAssessment',
  get: (classId) => ({ get }) => {
    const childIds = get(childrenState).filter(x => x.classId === classId).map(x => x.id);
    return get(assessmentsState).filter(x => childIds.includes(x.childId))
  },
});
