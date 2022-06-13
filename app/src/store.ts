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

export const assessmentTypesState = atom<(Components.Schemas.AssessmentType & {
  optionsScore: { [id: number]: number };
})[]>({
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

export type ChildType = Components.Schemas.Child & {
  ageString: string;
  ageNumber: number;
  shortName: string;
};
export const childrenState = atom<ChildType[]>({
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

export type CategorySections = (Components.Schemas.Subcategory & { data: Components.Schemas.Task[] })[];
export const categoryTasksState = selectorFamily<CategorySections, number>({
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


export const childAssessmentsByTaskState = selectorFamily({
  key: 'childAssessmentsByTask',
  get: (id: number) => ({ get }) => {
    const ret: { [key: string]: Components.Schemas.Assessment[]; } = {};
    get(childAssessmentsState(id)).forEach(item => {
      if (ret[item.task] === undefined) {
        ret[item.task] = [];
      }
      ret[item.task].push(item);
    });
    return ret;
  },
});

export const categoryTreeState = selector({
  key: 'categoryTree',
  get: ({ get }) => {
    const tasks = get(tasksState);
    const categories = get(categoriesState);

    const subcategoryMap = Object.fromEntries(get(subcategoriesState).map((subcategory) => {
      const theseTasks = tasks.filter(x => x.subcategory === subcategory.id);
      const taskMap = Object.fromEntries(theseTasks.map((task) => ([task.id!, task])));
      return [subcategory.id!, { ...subcategory, tasks: taskMap }];
    }));

    return Object.fromEntries(categories.map((category) => {
      const subcategories = Object.fromEntries(category.subcategories.map((subcategoryId) => {
        return [subcategoryId, subcategoryMap[subcategoryId]];
      }));
      return [category.id!, { ...category, subcategories }];
    }));
  },
});

export const ageRelevantSubcategoryTasksState = selectorFamily({
  key: 'ageRelevantSubcategoryTasks',
  get: ({ subcategoryId, childId }: { subcategoryId: number; childId: number; }) => ({ get }) => {
    const child = get(childState(childId));
    const assessments = get(childAssessmentsByTaskState(childId));

    const forYounger: (Components.Schemas.Task & { assessments: Components.Schemas.Assessment[] })[] = [];
    const appropriate: (Components.Schemas.Task & { assessments: Components.Schemas.Assessment[] })[] = [];
    const forOlder: (Components.Schemas.Task & { assessments: Components.Schemas.Assessment[] })[] = [];

    get(subcategoryTasksState(subcategoryId)).forEach((task) => {
      const ageFrom = parseFloat(task.expected_age_from || '0');
      let ageTo = parseFloat(task.expected_age_to || '8');

      if (ageFrom % 1 !== 0 || ageTo % 1 !== 0) { // 3-3.5, 2.5-3.5
        if (ageTo === 8) { // 3.5 == 3.5-4
          ageTo = Math.ceil(ageFrom);
        }
      } else {
        if (ageTo === 8) {  // 3 == 3-3.99
          ageTo = ageFrom;
        }
        ageTo += 1; // 3-4 = 3-4.99
      }

      if ((child?.ageNumber || 0) < ageFrom) {
        forYounger.push(({ ...task, assessments: assessments[task.id!.toString()] || [] }));
      } else if ((child?.ageNumber || 0) < ageTo) {
        appropriate.push(({ ...task, assessments: assessments[task.id!.toString()] || [] }));
      } else {
        forOlder.push(({ ...task, assessments: assessments[task.id!.toString()] || [] }));
      }
    });

    return { forYounger, appropriate, forOlder };
  },
});

export const childSubcategoryStatsState = selectorFamily({
  key: 'childSubcategoryStats',
  get: ({ childId, subcategoryId }: { childId: number; subcategoryId: number }) => ({ get }) => {
    const sections = get(ageRelevantSubcategoryTasksState({ childId, subcategoryId }));
    const exampleTask = sections.forYounger[0] || sections.appropriate[0] || sections.forOlder[0];
    const assessmentType = get(assessmentTypeState(exampleTask.assessment_type))!;

    const scoreDivisor = assessmentType.options?.length || 1;

    const statsAppropriate = { score: 0, filledOut: 0 };
    sections.appropriate.forEach(task => {
      if (task.assessments.length > 0) {
        const best = Math.max(...task.assessments.map(x => x.option));
        statsAppropriate.score += assessmentType.optionsScore[best] || 0;
        statsAppropriate.filledOut += 1;
      }
    });

    const statsOlder = { score: 0, filledOut: 0 };
    sections.forOlder.forEach(task => {
      if (task.assessments.length > 0) {
        const best = Math.max(...task.assessments.map(x => x.option));
        statsOlder.score += assessmentType.optionsScore[best] || 0;
        statsOlder.filledOut += 1;
      }
    });
    const scoreAppropriate = statsAppropriate.filledOut
      ? statsAppropriate.score / scoreDivisor / statsAppropriate.filledOut
      : 0.5;
    const scoreOlder = statsOlder.score / scoreDivisor / (statsOlder.filledOut || 1);
    const fillRate = statsAppropriate.filledOut / (sections.appropriate.length || 1);

    return { childId, subcategoryId, fillRate, score: scoreAppropriate + scoreOlder };
  },
});

export const childCategoryStatsState = selectorFamily({
  key: 'childCategoryStats',
  get: ({ childId, categoryId }: { childId: number; categoryId: number; }) => ({ get }) => {
    const subcategoryStats = get(categorySubcategoriesState(categoryId)).map(
      subcategory => get(childSubcategoryStatsState({ subcategoryId: subcategory.id!, childId }))
    );
    const averageFillRate = subcategoryStats.reduce((n, sub) => n + sub.fillRate, 0) / subcategoryStats.length;
    const averageScore = subcategoryStats.reduce((n, sub) => n + sub.score, 0) / subcategoryStats.length;
    return { childId, categoryId, subcategoryStats, averageFillRate, averageScore };
  },
});

export const childTotalStatsState = selectorFamily({
  key: 'childTotalStats',
  get: (childId: number) => ({ get }) => {
    const categoryStats = get(categoriesState).map(
      category => get(childCategoryStatsState({ categoryId: category.id!, childId }))
    );
    const averageFillRate = categoryStats.reduce((n, sub) => n + sub.averageFillRate, 0) / categoryStats.length;
    const averageScore = categoryStats.reduce((n, sub) => n + sub.averageScore, 0) / categoryStats.length;
    return { categoryStats, averageFillRate, averageScore };
  },
})

export const classStatsState = selectorFamily({
  key: 'classStats',
  get: (classId: number) => ({ get }) => {
    const categories = get(categoriesState);
    const children = get(classChildrenState(classId));

    return {
      averageAge: children.reduce((n, child) => n + child.ageNumber, 0) / children.length,
      categoryStats: categories.map(category => {
        const laggingChildren: ChildType[] = [];
        const notFilledOutChildren: ChildType[] = [];
        let totalFillRate = 0;
        let totalScore = 0;

        children.forEach(child => {
          const stats = get(childCategoryStatsState({ categoryId: category.id!, childId: child.id! }));
          totalFillRate += stats.averageFillRate;
          totalScore += stats.averageScore;
          if (stats.averageScore < 0.2) {
            laggingChildren.push(child);
          }
          if (stats.averageFillRate < 0.5) {
            notFilledOutChildren.push(child);
          }
        });

        const averageFillRate = totalFillRate / children.length;
        const averageScore = totalScore / children.length;
        return { categoryId: category.id!, averageFillRate, averageScore, laggingChildren, notFilledOutChildren };
      }),
    };
  },
});
