import React, {useState, useContext, FC} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {StackNavigationProp} from '@react-navigation/stack';

interface Todo {
  id: string;
  text: string;
  status: 'pending' | 'inProgress' | 'completed';
}

type Props = {
  navigation: StackNavigationProp<Record<string, object | undefined>, any>;
};

const HomeScreen: FC<Props> = ({navigation}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const {logout} = useContext(AuthContext);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        {id: Date.now().toString(), text: newTodo.trim(), status: 'pending'},
      ]);
      setNewTodo('');
    }
  };

  const updateTodoStatus = (
    id: string,
    status: 'pending' | 'inProgress' | 'completed',
  ) => {
    setTodos(todos.map(todo => (todo.id === id ? {...todo, status} : todo)));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const renderTodo = ({item}: {item: Todo}) => (
    <View style={[styles.todoItem, styles[item.status]]}>
      <Text style={styles.todoText}>{item.text}</Text>
      <View style={styles.todoActions}>
        <TouchableOpacity
          onPress={() => updateTodoStatus(item.id, 'pending')}
          style={[styles.statusButton, styles.pendingButton]}>
          <Text style={styles.statusButtonText}>Pendiente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateTodoStatus(item.id, 'inProgress')}
          style={[styles.statusButton, styles.inProgressButton]}>
          <Text style={styles.statusButtonText}>En Curso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateTodoStatus(item.id, 'completed')}
          style={[styles.statusButton, styles.completedButton]}>
          <Text style={styles.statusButtonText}>Completado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeTodo(item.id)}
          style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Agregar nueva tarea"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  pendingButton: {
    backgroundColor: '#FFA000',
  },
  inProgressButton: {
    backgroundColor: '#2196F3',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  logoutButton: {
    backgroundColor: '#757575',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pending: {
    borderLeftColor: '#FFA000',
    borderLeftWidth: 5,
  },
  inProgress: {
    borderLeftColor: '#2196F3',
    borderLeftWidth: 5,
  },
  completed: {
    borderLeftColor: '#4CAF50',
    borderLeftWidth: 5,
  },
});

export default HomeScreen;
