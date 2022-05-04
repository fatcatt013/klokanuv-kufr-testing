import { Assessment, Category, Child, Class } from "./types";
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

export const assessmentsState = atom<Assessment[]>({
  key: '',
  effects_UNSTABLE: [persistAtom],
  default: [
    { id: 1, task: 3, option: 1, date_of_assessment: "2022-05-03", note: '', assessed_by: '' },
    { id: 2, task: 3, option: 2, date_of_assessment: "2022-05-02", note: '', assessed_by: '' },
    { id: 3, task: 8, option: 3, date_of_assessment: "2022-05-01", note: '', assessed_by: '' },
  ],
});
