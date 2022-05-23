import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Button, Card, Dialog, Portal, Text } from 'react-native-paper';
import { Background } from '../components/Background';
import { CategoryHeader } from '../components/CategoryHeader';
import { CategoryPicker } from '../components/CategoryPicker';
import { ChildPicker } from '../components/ChildPicker';
import { ClassroomPicker } from '../components/ClassPicker';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { CustomDialog } from '../components/CustomDialog';
import { SubcategoryHeader } from '../components/SubcategoryHeader';
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
  const [tempChildIds, setTempChildIds] = React.useState<number[]>([]);
  const [tempTaskIds, setTempTaskIds] = React.useState<number[]>([]);
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
        setTempChildIds(route.params.children);
        setClassId(classes?.find(x => x.children.find(y => route.params.children.includes(y)))?.id || -1);
      } else if (route.params.tasks.length > 0) {
        setTempTaskIds(route.params.tasks);
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
      <CustomDialog visible={categoryOpen} onDismiss={() => setCategoryOpen(false)}>
        <CategoryPicker onSelect={(id, subcat) => {
          setCategoryOpen(false);
          setCategoryId(id);
          if (subcat) {
            setSubcategoryId(subcat);
            setTaskOpen(true);
          } else {
            setSubcategoryOpen(true);
          }
        }} />
      </CustomDialog>

      <CustomDialog visible={subcategoryOpen} onDismiss={() => setSubcategoryOpen(false)}>
        <Dialog.Title><CategoryHeader id={categoryId} /></Dialog.Title>
        <SubcategoryPicker category={categoryId} onSelect={(id) => {
          setSubcategoryOpen(false);
          setSubcategoryId(id);
          setTaskOpen(true);
        }} />
      </CustomDialog>

      <CustomDialog visible={taskOpen} onDismiss={() => setTaskOpen(false)} style={{ maxHeight: 0.8 * Dimensions.get('window').height }}>
        <Dialog.Title><SubcategoryHeader id={subcategoryId} /></Dialog.Title>
        <Dialog.ScrollArea>
          <TaskPicker
            subcategory={subcategoryId}
            selected={tempTaskIds}
            onSelect={(id) => setTempTaskIds(id)}
          />
          <Button onPress={() => { setTaskOpen(false); setTaskIds(tempTaskIds) }}>
            Ok
          </Button>
        </Dialog.ScrollArea>
      </CustomDialog>

      <CustomDialog visible={classOpen} onDismiss={() => setClassOpen(false)}>
        <ClassroomPicker onSelect={(id) => {
          setClassOpen(false);
          setClassId(id);
          if (id !== classId) {
            setChildIds([]);
          }
          setChildOpen(true);
        }} />
      </CustomDialog>

      <CustomDialog visible={childOpen} onDismiss={() => setChildOpen(false)}>
        <ChildPicker
          classroom={classId}
          selected={tempChildIds}
          onSelect={(id) => setTempChildIds(id)}
        />
        <Button onPress={() => { setChildOpen(false); setChildIds(tempChildIds) }}>
          Ok
        </Button>
      </CustomDialog>

    </Portal>
  </Background >
})
