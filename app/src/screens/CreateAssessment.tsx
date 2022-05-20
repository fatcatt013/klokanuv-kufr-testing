import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Card, Portal, Text } from 'react-native-paper';
import { Background } from '../components/Background';
import { CategoryGrid } from '../components/CategoryGrid';
import { ChildPicker } from '../components/ChildPicker';
import { ClassroomPicker } from '../components/ClassPicker';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { SubcategoryPicker } from '../components/SubcategoryPicker';
import { TaskPicker } from '../components/TaskPicker';
import { TextInput } from '../components/TextInput';
import { RootStackParamList } from '../lib/navigation';
import { useAssessmentOps } from '../use-assessment-data';
import { useCoreData } from '../use-core-data';
import { useSchoolData } from '../use-school-data';

type Props = StackScreenProps<RootStackParamList, 'CreateAssessment'>;

export const CreateAssessmentScreen = React.memo(function CreateAssessmentScreen({ route, navigation }: Props) {
  const isFocused = useIsFocused();
  const ops = useAssessmentOps()

  const { data: coreData } = useCoreData();
  const { categories, subcategories, tasks, assessmentTypes } = coreData!!;
  const { data: schoolData } = useSchoolData();
  const { classes, children } = schoolData!!;

  const [classOpen, setClassOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [subcategoryOpen, setSubcategoryOpen] = React.useState(false);
  const [taskOpen, setTaskOpen] = React.useState(false);
  const [classId, setClassId] = React.useState(-1);
  const [categoryId, setCategoryId] = React.useState(-1);
  const [subcategoryId, setSubcategoryId] = React.useState(-1);
  const [childIds, setChildIds] = React.useState<number[]>([]);
  const [taskIds, setTaskIds] = React.useState<number[]>([]);
  const [optionId, setOptionId] = React.useState(-1);

  const category = categories.find(x => x.id === categoryId);
  const subcategory = subcategories.find(x => x.id === subcategoryId);
  const childList = children?.filter(x => childIds.includes(x.id!));
  const taskList = tasks.filter(x => taskIds.includes(x.id));
  const classroom = classes?.find(x => x.id === classId);
  const assessmentType = taskList.length > 0 ? assessmentTypes.find(x => x.id === taskList[0].assessment_type) : undefined;

  const childrenLabel = childList?.map(x => x.first_name).join(", ");
  const tasksLabel = taskList.map(x => x.task_description).join(", ");

  React.useEffect(() => {
    if (isFocused) {
      if (route.params.children.length > 0) {
        setChildIds(route.params.children);
        setClassId(classes?.find(x => x.children.find(y => route.params.children.includes(y)))?.id || -1);
      } else if (route.params.tasks.length > 0) {
        setTaskIds(route.params.tasks);
        const subcategory = tasks.find(x => route.params.tasks.includes(x.id!!))?.subcategory || -1
        setSubcategoryId(subcategory)
        setCategoryId(categories?.find(x => x.subcategories.includes(subcategory))?.id || -1)
        // set cat, subcat
      }
    }
  }, [isFocused]);

  return <Background>

    <TouchableOpacity onPress={() => setCategoryOpen(true)}>
      <TextInput label="Kategorie" value={category?.label || ''} autoComplete="none" editable={false} pointerEvents="none" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setSubcategoryOpen(true)}>
      <TextInput label="Podkategorie" value={subcategory?.label || ''} autoComplete="none" editable={false} pointerEvents="none" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setTaskOpen(true)}>
      <TextInput label="Úkoly" value={tasksLabel || ''} autoComplete="none" editable={false} pointerEvents="none" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setClassOpen(true)}>
      <TextInput label="Třída" value={classroom?.label || ''} autoComplete="none" editable={false} pointerEvents="none" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setChildOpen(true)}>
      <TextInput label="Děti" value={childrenLabel || ''} autoComplete="none" editable={false} pointerEvents="none" />
    </TouchableOpacity>

    {assessmentType?.options?.map((item) => (
      <Card key={item.id} style={{ margin: 4 }} onPress={() => setOptionId(item.id!)}>
        <View style={{ padding: 8, flexDirection: 'row' }}>
          <CustomCheckbox checked={optionId === item.id!} />
          <Text style={{ marginLeft: 10 }}>{item.label}</Text>
        </View>
      </Card>
    ))}

    <Button
      mode="contained"
      disabled={optionId < 1 || !childIds.length || !taskIds.length}
      icon="plus"
      onPress={async () => {
        await Promise.all([taskIds.map(task => childIds.map(child =>
          ops.addAssessment({
            task: task.toString(), child, option: optionId,
            date_of_assessment: '2022-05-19',
          })
        ))])
        navigation.pop();
      }}
    >Uložit</Button>

    <Portal>
      <CategoryGrid
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        onSelect={(id) => { setCategoryId(id); setSubcategoryOpen(true) }}
      />
      <SubcategoryPicker
        open={subcategoryOpen}
        category={categoryId}
        onClose={() => setSubcategoryOpen(false)}
        onSelect={(id) => { setSubcategoryId(id); setTaskOpen(true) }}
      />
      <TaskPicker
        open={taskOpen}
        subcategory={subcategoryId}
        selected={taskIds}
        onClose={() => setTaskOpen(false)}
        onSelect={(id) => setTaskIds(id)}
      />
      <ClassroomPicker
        open={classOpen}
        onClose={() => setClassOpen(false)}
        onSelect={(id) => { setClassId(id); setChildOpen(true) }}
      />
      <ChildPicker
        open={childOpen}
        classroom={classId}
        selected={childIds}
        onClose={() => setChildOpen(false)}
        onSelect={(id) => setChildIds(id)}
      />
    </Portal>
  </Background >
})
