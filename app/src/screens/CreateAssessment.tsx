import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import format from 'date-fns/format';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Button, Card, Dialog, Portal, Text } from 'react-native-paper';
import { Background } from '../components/Background';
import { CategoryPicker } from '../components/CategoryPicker';
import { ChildPicker } from '../components/child/ChildPicker';
import { ClassroomPicker } from '../components/class/ClassPicker';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { CustomDialog } from '../components/CustomDialog';
import { TaskPicker } from '../components/TaskPicker';
import { TextInput } from '../components/TextInput';
import { RootStackParamList } from '../lib/navigation';
import { useAssessmentOps } from '../actions';
import { useRecoilValue } from 'recoil';
import { assessmentTypeState, categoriesState, categoryTasksState, childrenState, classChildrenState, classesState, subcategoriesState, tasksState } from '../store';

type Props = StackScreenProps<RootStackParamList, 'CreateAssessment'>;

export const CreateAssessmentScreen = React.memo(function CreateAssessmentScreen({ route, navigation }: Props) {
  const isFocused = useIsFocused();
  const ops = useAssessmentOps()

  const [classOpen, setClassOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [taskOpen, setTaskOpen] = React.useState(false);
  const [classId, setClassId] = React.useState(-1);
  const [categoryId, setCategoryId] = React.useState(-1);
  const [childIds, setChildIds] = React.useState<number[]>([]);
  const [tempChildIds, setTempChildIds] = React.useState<number[]>([]);
  const [tempTaskIds, setTempTaskIds] = React.useState<number[]>([]);
  const [taskIds, setTaskIds] = React.useState<number[]>([]);
  const [optionId, setOptionId] = React.useState(-1);
  const [note, setNote] = React.useState('');

  const categories = useRecoilValue(categoriesState);
  const tasks = useRecoilValue(tasksState);
  const subcategories = useRecoilValue(subcategoriesState);
  const classes = useRecoilValue(classesState);
  const children = useRecoilValue(classChildrenState(classId));

  const category = categories.find(x => x.id! === categoryId);
  const classroom = classes.find(x => x.id! === classId);
  const childList = children?.filter(x => childIds.includes(x.id!));
  const taskList = tasks.filter(x => taskIds.includes(x.id));
  const assessmentType = useRecoilValue(assessmentTypeState(taskList?.[0]?.assessment_type || -1))

  const childrenLabel = childList?.map(x => x.shortName).join('\n');
  const tasksLabel = taskList.map(x => x.task_description).join('\n');

  React.useEffect(() => {
    if (isFocused) {
      const { classId, childIds, categoryId, taskIds } = route.params;
      if (classId) {
        setClassId(classId);
      }
      if (categoryId) {
        setCategoryId(categoryId);
      }
      if (childIds && childIds.length > 0) {
        setChildIds(childIds);
        setTempChildIds(childIds);
        setClassId(classes?.find(x => x.children.find(y => childIds.includes(y)))?.id || -1);
      }
      if (taskIds && taskIds.length > 0) {
        setTempTaskIds(taskIds);
        setTaskIds(taskIds);
        const task = tasks.find(x => x.id! === taskIds[0]);
        const subcategory = subcategories.find(x => x.id! === task?.subcategory);
        setCategoryId(categories?.find(x => x.subcategories.includes(subcategory?.id!))?.id || -1)
      }
    }
  }, [isFocused]);

  return <Background>
    <TouchableOpacity onPress={() => setCategoryOpen(true)}>
      <TextInput dense
        label="Kategorie" value={category?.label || ''}
        autoComplete="none" editable={false} pointerEvents="none"
      />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => categoryId > 0 && setTaskOpen(true)}>
      <TextInput dense
        label="Úkoly" value={tasksLabel || ''}
        multiline numberOfLines={taskList.length || undefined}
        autoComplete="none" editable={false} pointerEvents="none"
      />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setClassOpen(true)}>
      <TextInput dense
        label="Třída" value={classroom?.label || ''}
        autoComplete="none" editable={false} pointerEvents="none"
      />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => classId > 0 && setChildOpen(true)}>
      <TextInput dense
        label="Děti" value={childrenLabel || ''}
        multiline numberOfLines={childList.length || undefined}
        autoComplete="none" editable={false} pointerEvents="none"
      />
    </TouchableOpacity>

    {assessmentType?.options?.map((item) => (
      <Card key={item.id} style={{ margin: 4 }} onPress={() => setOptionId(item.id!)}>
        <View style={{ padding: 8, flexDirection: 'row' }}>
          <CustomCheckbox checked={optionId === item.id!} />
          <Text style={{ marginLeft: 10 }}>{item.label}</Text>
        </View>
      </Card>
    ))}

    {assessmentType?.options && (
      <TextInput
        value={note} onChangeText={setNote}
        label="Poznámka" autoComplete="none" multiline numberOfLines={2}
      />
    )}

    {assessmentType?.options ? (
      <Button
        mode="contained"
        labelStyle={{ color: optionId > 0 ? "white" : undefined }}
        style={{ marginTop: 5 }}
        disabled={optionId < 1}
        icon="plus"
        onPress={async () => {
          await Promise.all([taskIds.map(task => childIds.map(child =>
            ops.addAssessment({
              task: task.toString(),
              child,
              option: optionId,
              date_of_assessment: format(new Date(), 'yyyy-MM-dd'),
              note: note || ' ',
            })
          ))])
          navigation.pop();
        }}
      >Uložit</Button>
    ) : null}

    <Portal>
      <CustomDialog visible={categoryOpen} onDismiss={() => setCategoryOpen(false)}>
        <CategoryPicker onSelect={(id) => {
          setCategoryOpen(false);
          setCategoryId(id);
          setTaskOpen(true);
        }} />
      </CustomDialog>

      <CustomDialog visible={taskOpen} onDismiss={() => setTaskOpen(false)} style={{ maxHeight: 0.8 * Dimensions.get('window').height }}>
        <Dialog.Title style={{ fontSize: 15, margin: 5 }}>{category?.label}</Dialog.Title>
        <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
          <TaskPicker data={tasks} selected={tempTaskIds} onSelect={setTempTaskIds} />
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
        <ChildPicker classroom={classId} selected={tempChildIds} onSelect={setTempChildIds} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button onPress={() => {
            if (tempChildIds.length < children.length) {
              setTempChildIds(children.map(x => x.id!));
            } else {
              setTempChildIds([]);
            }
          }}>
            Vybrat všechny
          </Button>
          <Button onPress={() => { setChildOpen(false); setChildIds(tempChildIds) }}>
            Ok
          </Button>
        </View>
      </CustomDialog>

    </Portal>
  </Background >
})
